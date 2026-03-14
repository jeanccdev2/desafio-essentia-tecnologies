import { Injectable, computed, signal } from '@angular/core';
import { Router } from '@angular/router';

import { AuthResponse, AuthUser } from './auth.model';

interface AuthState {
  token: string | null;
  user: AuthUser | null;
}

const STORAGE_KEY = 'essentia_auth';

@Injectable({ providedIn: 'root' })
export class AuthStore {
  private readonly state = signal<AuthState>(this.loadFromStorage());

  readonly token = computed(() => this.state().token);
  readonly user = computed(() => this.state().user);
  readonly isAuthenticated = computed(() => !!this.state().token);

  constructor(private readonly router: Router) {}

  setSession(payload: AuthResponse): void {
    const next: AuthState = { token: payload.token, user: payload.user };
    this.state.set(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }

  clear(): void {
    this.state.set({ token: null, user: null });
    localStorage.removeItem(STORAGE_KEY);
  }

  async logout(): Promise<void> {
    this.clear();
    await this.router.navigate(['/login']);
  }

  private loadFromStorage(): AuthState {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return { token: null, user: null };
      return JSON.parse(raw) as AuthState;
    } catch (err) {
      console.warn('auth storage read failed', err);
      return { token: null, user: null };
    }
  }
}
