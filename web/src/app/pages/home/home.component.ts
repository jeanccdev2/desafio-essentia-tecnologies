import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { finalize } from 'rxjs';

import { Task, TaskPayload, TaskStatus } from '../../../core/task/task.model';
import { TaskService } from '../../../core/task/task.service';
import { AuthStore } from '../../../core/auth/auth.store';
import { TaskModalComponent } from '../../components/task-modal/task-modal.component';
import { TaskCardComponent } from '../../components/task-card/task-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, TaskModalComponent, TaskCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  private readonly taskService = inject(TaskService);
  private readonly authStore = inject(AuthStore);

  tasks = signal<Task[]>([]);
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

  fetchTasks(): void {
    this.loading = true;
    this.error = null;

    this.taskService
      .getAll()
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (response) => {
          console.log('Response:', response.data);
          this.tasks.set(response.data ?? []);
        },
        error: (err) => {
          console.error('Erro ao carregar tasks', err);
          this.error = 'Não foi possível carregar os cards agora. Tente novamente em instantes.';
        },
      });
  }

  get total(): number {
    return this.tasks.length;
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

  private countByStatus(status: TaskStatus): number {
    return this.tasks().filter((task) => task.status === status).length;
  }

  trackById(_: number, task: Task) {
    return task.id;
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
