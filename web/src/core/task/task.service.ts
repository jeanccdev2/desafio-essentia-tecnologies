import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../env';
import { ApiResponseInterface } from '../types/api-response.type';
import { Task, TaskPayload, TaskUpdatePayload } from './task.model';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private readonly baseUrl = `${environment.apiUrl}/api/v1/tasks`;

  constructor(private readonly http: HttpClient) {}

  getAll(
    params: { page?: number; limit?: number; status?: string } = {},
  ): Observable<ApiResponseInterface<Task[]>> {
    return this.http.get<ApiResponseInterface<Task[]>>(this.baseUrl, { params });
  }

  create(payload: TaskPayload): Observable<ApiResponseInterface<Task>> {
    return this.http.post<ApiResponseInterface<Task>>(this.baseUrl, payload);
  }

  update(id: string, payload: TaskUpdatePayload): Observable<ApiResponseInterface<Task>> {
    return this.http.patch<ApiResponseInterface<Task>>(`${this.baseUrl}/${id}`, payload);
  }

  delete(id: string): Observable<ApiResponseInterface<void>> {
    return this.http.delete<ApiResponseInterface<void>>(`${this.baseUrl}/${id}`);
  }
}
