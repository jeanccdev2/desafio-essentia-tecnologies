import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

import { Task, TaskStatus } from '../../../core/task/task.model';
import { TaskService } from '../../../core/task/task.service';

@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './task-detail.component.html',
  styleUrl: './task-detail.component.css',
})
export class TaskDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly taskService = inject(TaskService);

  task = signal<Task | null>(null);
  loading = false;
  error: string | null = null;

  readonly statusCopy: Record<TaskStatus, { label: string; badge: string; dot: string }> = {
    pending: { label: 'Pendente', badge: 'badge-soft-amber', dot: 'dot-amber' },
    in_progress: { label: 'Em andamento', badge: 'badge-soft-blue', dot: 'dot-blue' },
    completed: { label: 'Concluída', badge: 'badge-soft-emerald', dot: 'dot-emerald' },
  };

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.error = 'Tarefa não encontrada.';
      return;
    }

    this.fetchTask(id);
  }

  private fetchTask(id: string): void {
    this.loading = true;
    this.error = null;

    this.taskService.getById(id).subscribe({
      next: (response: { data?: Task | null }) => {
        this.task.set(response.data ?? null);
        if (!this.task()) {
          this.error = 'Tarefa não encontrada.';
        }
        this.loading = false;
      },
      error: (err: unknown) => {
        console.error('Erro ao carregar tarefa', err);
        this.error = 'Não foi possível carregar a tarefa. Tente novamente.';
        this.loading = false;
      },
    });
  }
}
