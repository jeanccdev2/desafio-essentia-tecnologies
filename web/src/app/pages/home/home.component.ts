import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { finalize } from 'rxjs';

import { Task, TaskPayload, TaskStatus } from '../../../core/task/task.model';
import { TaskService } from '../../../core/task/task.service';
import { AuthStore } from '../../../core/auth/auth.store';
import { TaskModalComponent } from '../../components/task-modal/task-modal.component';
import { TaskCardComponent } from '../../components/task-card/task-card.component';
import { PaginationComponent } from '../../components/pagination/pagination.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, TaskModalComponent, TaskCardComponent, PaginationComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  private readonly taskService = inject(TaskService);
  private readonly authStore = inject(AuthStore);

  tasks = signal<Task[]>([]);
  selectedStatus = signal<TaskStatus | null>(null);
  searchText = signal('');
  currentPage = signal(1);
  readonly pageSize = 6;
  totalItems = signal(0);
  totalPages = signal(1);
  loading = false;
  creating = false;
  error: string | null = null;
  isModalOpen = signal(false);
  isEditing = false;
  editingTaskId: string | null = null;
  form: TaskPayload = { title: '', description: '', status: 'pending' };
  readonly statuses: TaskStatus[] = ['pending', 'in_progress', 'completed'];

  readonly statusCopy: Record<TaskStatus, { label: string; badge: string; dot: string }> = {
    pending: { label: 'Pendente', badge: 'bg-amber-100 text-amber-800', dot: 'bg-amber-500' },
    in_progress: { label: 'Em andamento', badge: 'bg-blue-100 text-blue-800', dot: 'bg-blue-500' },
    completed: {
      label: 'Concluída',
      badge: 'bg-emerald-100 text-emerald-800',
      dot: 'bg-emerald-500',
    },
  };

  ngOnInit(): void {
    this.fetchTasks();
  }

  goToPage(page: number) {
    const target = Math.min(Math.max(page, 1), this.totalPages());
    if (target === this.currentPage()) return;

    this.currentPage.set(target);
    this.fetchTasks();
  }

  fetchTasks(status: TaskStatus | null = this.selectedStatus(), searchText = this.searchText()): void {
    this.loading = true;
    this.error = null;

    const params = {
      page: this.currentPage(),
      limit: this.pageSize,
      ...(status ? { status } : {}),
      ...(searchText.trim() ? { searchText: searchText.trim() } : {}),
    };

    this.taskService
      .getAll(params)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (response) => {
          this.tasks.set(response.data ?? []);
          this.totalItems.set(response.totalItems ?? 0);
          this.totalPages.set(response.totalPages ?? 1);
        },
        error: (err) => {
          console.error('Erro ao carregar tasks', err);
          this.error = 'Não foi possível carregar os cards agora. Tente novamente em instantes.';
        },
      });
  }

  get total(): number {
    return this.tasks().length;
  }

  get pending(): number {
    return this.countByStatus('pending');
  }

  get inProgress(): number {
    return this.countByStatus('in_progress');
  }

  get completed(): number {
    return this.countByStatus('completed');
  }

  selectStatus(status: TaskStatus): void {
    const nextStatus = this.selectedStatus() === status ? null : status;
    this.selectedStatus.set(nextStatus);
    this.currentPage.set(1);
    this.fetchTasks(nextStatus);
  }

  clearFilter(): void {
    this.selectedStatus.set(null);
    this.currentPage.set(1);
    this.fetchTasks();
  }

  onSearch(text: string): void {
    this.searchText.set(text);
    this.currentPage.set(1);
    this.fetchTasks();
  }

  clearSearch(): void {
    if (!this.searchText()) return;
    this.searchText.set('');
    this.currentPage.set(1);
    this.fetchTasks();
  }

  badgeClasses(status?: TaskStatus) {
    const current = this.selectedStatus();
    const isActive = status ? current === status : !current;

    return {
      badge: true,
      'cursor-pointer': true,
      'badge-soft-amber': status === 'pending',
      'badge-soft-blue': status === 'in_progress',
      'badge-soft-emerald': status === 'completed',
      'ring-2': isActive,
      'ring-slate-300': !status && isActive,
      'ring-amber-300': status === 'pending' && isActive,
      'ring-blue-300': status === 'in_progress' && isActive,
      'ring-emerald-300': status === 'completed' && isActive,
      'shadow-md': isActive,
      'badge-active': isActive,
    };
  }

  private countByStatus(status: TaskStatus): number {
    return this.tasks().filter((task) => task.status === status).length;
  }

  trackById(_: number, task: Task) {
    return task.id;
  }

  confirmAndDelete(task: Task): void {
    const confirmed = confirm('Tem certeza que deseja excluir esta tarefa?');
    if (!confirmed) {
      return;
    }

    this.taskService.delete(task.id).subscribe({
      next: () => {
        this.tasks.set(this.tasks().filter((t) => t.id !== task.id));
      },
      error: (err) => {
        console.error('Erro ao excluir task', err);
      },
    });
  }

  openCreateModal(): void {
    this.isEditing = false;
    this.editingTaskId = null;
    this.form = { title: '', description: '', status: 'pending' };
    this.isModalOpen.set(true);
  }

  openEditModal(task: Task): void {
    this.isEditing = true;
    this.editingTaskId = task.id;
    this.form = {
      title: task.title,
      description: task.description ?? '',
      status: task.status,
    };
    this.isModalOpen.set(true);
  }

  closeModal(): void {
    this.isModalOpen.set(false);
    this.isEditing = false;
    this.editingTaskId = null;
    this.form = { title: '', description: '', status: 'pending' };
  }

  submitTask(): void {
    if (!this.form.title.trim()) {
      return;
    }

    this.creating = true;

    if (this.isEditing && this.editingTaskId) {
      this.taskService
        .update(this.editingTaskId, this.form)
        .pipe(finalize(() => (this.creating = false)))
        .subscribe({
          next: (response) => {
            const updated = response.data;
            if (updated) {
              this.tasks.set(this.tasks().map((task) => (task.id === updated.id ? updated : task)));
            }
            this.closeModal();
          },
          error: (err) => {
            console.error('Erro ao atualizar task', err);
          },
        });
    } else {
      this.taskService
        .create(this.form)
        .pipe(finalize(() => (this.creating = false)))
        .subscribe({
          next: (response) => {
            const newTask = response.data;
            if (newTask) {
              this.tasks.set([newTask, ...this.tasks()]);
            }
            this.closeModal();
          },
          error: (err) => {
            console.error('Erro ao criar task', err);
          },
        });
    }
  }

  async logout(): Promise<void> {
    this.tasks.set([]);
    this.form = { title: '', description: '', status: 'pending' };
    await this.authStore.logout();
  }
}
