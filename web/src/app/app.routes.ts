import { Routes } from '@angular/router';

import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

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
