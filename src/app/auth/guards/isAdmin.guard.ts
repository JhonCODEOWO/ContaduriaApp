import { inject } from '@angular/core';
import type { CanMatchFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { lastValueFrom } from 'rxjs';

export const isAdminGuard: CanMatchFn = async (route, segments) => {
  const authService = inject(AuthService);

  const authenticated = await lastValueFrom(authService.checkStatus());

  if(!authenticated) return false;

  //Validar si el usuario tiene el rol admin necesario.
  const user = authService.getUserLogged;

  if(!user?.roles.includes('admin')) return false;

  return true;
};
