import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { finalize } from 'rxjs';

import { Task, TaskStatus } from '../../../core/task/task.model';
import { TaskService } from '../../../core/task/task.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  private readonly taskService = inject(TaskService);

  tasks = signal<Task[]>([]);
  loading = false;
  error: string | null = null;

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
}
