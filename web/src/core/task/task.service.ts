import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import { environment } from '../env';
import { ApiResponseInterface } from '../types/api-response.type';
import { Task, TaskPayload, TaskUpdatePayload } from './task.model';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private readonly baseUrl = `${environment.apiUrl}/api/v1/tasks`;

  constructor(private readonly http: HttpClient) {}

  getAll(
    params: { page?: number; limit?: number; status?: string } = {},
  ): Observable<{ data: Task[]; totalItems: number; totalPages: number }> {
    return this.http
      .get<ApiResponseInterface<Task[]>>(this.baseUrl, { params, observe: 'response' })
      .pipe(
        map((response) => {
          const totalItems = Number(response.headers.get('X-Total-Items') ?? '0');
          const totalPages = Number(response.headers.get('X-Total-Pages') ?? '1');

          return {
            data: response.body?.data ?? [],
            totalItems,
            totalPages,
          };
        }),
      );
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
