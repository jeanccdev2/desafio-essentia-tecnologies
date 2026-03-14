export type TaskStatus = 'pending' | 'in_progress' | 'completed';

export interface Task {
  id: string;
  title: string;
  description?: string | null;
  status: TaskStatus;
  createdAt?: string;
  updatedAt?: string;
}

export type TaskPayload = Omit<Task, 'id' | 'createdAt' | 'updatedAt'>;
export type TaskUpdatePayload = Partial<TaskPayload>;
