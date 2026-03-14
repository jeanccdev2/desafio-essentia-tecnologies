import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Task, TaskStatus } from '../../../core/task/task.model';


@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.css',
})
export class TaskCardComponent {
  @Input({ required: true }) task!: Task;
  @Input({ required: true }) statusCopy!: Record<TaskStatus, { label: string; badge: string; dot: string }>;
}
