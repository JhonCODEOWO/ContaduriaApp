import { Injectable, inject } from "@angular/core";
import { AsyncValidator, AbstractControl, ValidationErrors } from "@angular/forms";
import { Observable, map, catchError, of, firstValueFrom } from "rxjs";
import { UsersService } from "../users/services/user.service";

@Injectable({providedIn: 'root'})
export class UniqueEmailOnUser implements AsyncValidator {
  private readonly userService = inject(UsersService);
  
  async validate(control: AbstractControl): Promise<ValidationErrors | null> {
    const result = await firstValueFrom(this.userService.verifyEmail(control.value));

    return result
        ? { emailTaken: true }
        : null;
  }
}