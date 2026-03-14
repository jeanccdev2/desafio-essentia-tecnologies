import { Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from '../core/auth/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login',
  },
  {
    path: 'app',
    canActivate: [AuthGuard],
    component: HomeComponent,
    title: 'Dashboard',
  },
  {
    path: '**',
    redirectTo: '',
  },
];
