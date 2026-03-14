import { Injectable, computed, signal } from '@angular/core';

import { Task } from './task.model';

interface TaskState {
  items: Task[];
  loading: boolean;
  error: string | null;
}

@Injectable({ providedIn: 'root' })
export class TaskStore {
  private readonly state = signal<TaskState>({ items: [], loading: false, error: null });

  readonly tasks = computed(() => this.state().items);
  readonly loading = computed(() => this.state().loading);
  readonly error = computed(() => this.state().error);

  setLoading(loading: boolean): void {
    this.state.update((prev) => ({ ...prev, loading }));
  }

  setError(error: string | null): void {
    this.state.update((prev) => ({ ...prev, error }));
  }

  setTasks(tasks: Task[]): void {
    this.state.update((prev) => ({ ...prev, items: tasks }));
  }

  upsertTask(task: Task): void {
    this.state.update((prev) => {
      const idx = prev.items.findIndex((t) => t.id === task.id);
      if (idx === -1) return { ...prev, items: [...prev.items, task] };
      const next = [...prev.items];
      next[idx] = task;
      return { ...prev, items: next };
    });
  }

  removeTask(id: string): void {
    this.state.update((prev) => ({ ...prev, items: prev.items.filter((t) => t.id !== id) }));
  }
}
