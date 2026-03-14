import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthResponse } from './auth.model';
import { environment } from '../env';
import { ApiResponseInterface } from '../types/api-response.type';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private readonly http: HttpClient) {}

  login(email: string, password: string): Observable<ApiResponseInterface<AuthResponse>> {
    return this.http.post<ApiResponseInterface<AuthResponse>>(
      `${environment.apiUrl}/api/v1/auth/login`,
      { email, password },
    );
  }

  register(name: string, email: string, password: string): Observable<ApiResponseInterface<AuthResponse>> {
    return this.http.post<ApiResponseInterface<AuthResponse>>(
      `${environment.apiUrl}/api/v1/auth/register`,
      { name, email, password },
    );
  }
}
