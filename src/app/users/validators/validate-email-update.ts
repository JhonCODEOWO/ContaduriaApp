import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { map, catchError, of } from 'rxjs';
import { UsersService } from '../services/user.service';

export function uniqueEmailValidator(
  usersService: UsersService,
  idUser?: string
): AsyncValidatorFn {
  return (control: AbstractControl) => {
    console.log(control.value);
    return usersService.verifyEmail(control.value, idUser).pipe(
      map((isTaken) => (isTaken ? { emailTaken: true } : null)),
      catchError(() => of(null))
    );
  };
}
