import { inject } from '@angular/core';
import { Router, type CanMatchFn } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const isAuthenticatedGuard: CanMatchFn = async (route, segments) => {
  const authService = inject(AuthService);
    const router = inject(Router);

    const isAuthenticated = await firstValueFrom(authService.checkStatus());

    if (isAuthenticated) {
        router.navigateByUrl('employees');
        return false;
    }
  return true;
};
