import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';
import { AuthService } from '../../services/auth.service';
import { environment } from '../../../../environments/environment';
import { InputFieldComponent } from "../../../common/components/input-field/input-field.component";
import { Router } from '@angular/router';
import { AlertErrorComponent } from '../../../common/components/alert-error/alert-error.component';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule, InputFieldComponent],
  templateUrl: './login-page.component.html',
})
export class LoginPageComponent {
  fb = inject(FormBuilder);
  router = inject(Router);
  formUtils = FormUtils;
  authService = inject(AuthService);
  error = signal<boolean>(false);

  loginForm = this.fb.group({
    email: [
      '',
      [Validators.required, Validators.pattern(FormUtils.emailPattern)],
    ],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  onSubmit() {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.invalid) return;
    let email: string = this.loginForm.controls['email'].value!;
    let password: string = this.loginForm.controls['password'].value!;
    this.authService.login(email, password).subscribe({
      next: (logged) => {
        if(logged) {
          this.router.navigateByUrl('employees');
          return;
        }
        this.error.set(true);
      }
    });
    // this.loginForm.reset();
  }
}
