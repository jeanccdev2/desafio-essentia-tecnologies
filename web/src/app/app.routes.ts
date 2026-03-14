import { Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from '../core/auth/auth.guard';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';
import { TaskDetailComponent } from './pages/task-detail/task-detail.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
        title: 'Login',
      },
      {
        path: 'cadastro',
        component: RegisterComponent,
        title: 'Cadastro',
      },
    ],
  },
  {
    path: 'app',
    canActivate: [AuthGuard],
    component: HomeComponent,
    title: 'Dashboard',
  },
  {
    path: 'app/tasks/:id',
    canActivate: [AuthGuard],
    component: TaskDetailComponent,
    title: 'Detalhe da tarefa',
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
