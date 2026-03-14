import { Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
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
