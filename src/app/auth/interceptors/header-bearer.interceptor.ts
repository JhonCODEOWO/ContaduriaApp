import type { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const headerBearerInterceptor: HttpInterceptorFn = (req, next) => {
  console.log(req);
  const authService = inject(AuthService);
  const newReq = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${authService.token()}`),
  })
  return next(newReq);
};
