import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { TaskPayload, TaskStatus } from '../../../core/task/task.model';

@Component({
  selector: 'app-task-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-modal.component.html',
  styleUrl: './task-modal.component.css',
})
export class TaskModalComponent {
  @Input() open = false;
  @Input() form!: TaskPayload;
  @Input() statuses: TaskStatus[] = [];
  @Input() statusCopy!: Record<TaskStatus, { label: string; badge: string; dot: string }>;
  @Input() creating = false;

  @Output() close = new EventEmitter<void>();
  @Output() submit = new EventEmitter<void>();

  handleSubmit(): void {
    this.submit.emit();
  }

  handleClose(): void {
    this.close.emit();
  }
}
