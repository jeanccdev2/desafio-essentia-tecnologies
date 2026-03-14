import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { AuthStore } from './auth.store';

export const AuthGuard: CanActivateFn = () => {
  const store = inject(AuthStore);
  const router = inject(Router);

  const isAuthenticated = store.isAuthenticated();

  if (isAuthenticated) {
    return true;
  }

  router.navigate(['/login']);

  return false;
};
