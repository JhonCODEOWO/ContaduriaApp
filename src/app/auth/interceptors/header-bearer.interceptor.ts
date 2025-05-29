import { HttpErrorResponse, type HttpInterceptorFn } from '@angular/common/http';
import { inject, INJECTOR } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { catchError, of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ToastService } from '../../common/components/toast-component/service/toast.service';
import { StylesToast } from '../../common/components/toast-component/toast.component';

export const headerBearerInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const toastService = inject(ToastService);

  //Request cloned to set bearer token
  const newReq = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${authService.token()}`),
  })

  //Return the request if it has an error then realize actions to manage it
  return next(newReq).pipe(catchError((error: any) => {
    if(error instanceof HttpErrorResponse){
      toastService.saveToast({styleClass: StylesToast.ERROR, txtToast: 'Error de credenciales, la sesión ha caducado o no tienes permisos para realizar la operación'});
      if(error.status === 401) router.navigateByUrl('login'); 
    }
    return of(error);
  }));
};
