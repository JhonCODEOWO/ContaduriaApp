import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';
import { AuthService } from '../../services/auth.service';
import { environment } from '../../../../environments/environment';
import { InputFieldComponent } from "../../../common/components/input-field/input-field.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule, InputFieldComponent],
  templateUrl: './login-page.component.html',
})
export class LoginPageComponent {
  constructor() {
    console.log(environment.API_URL);
  }
  fb = inject(FormBuilder);
  router = inject(Router);
  formUtils = FormUtils;
  authService = inject(AuthService);

  loginForm = this.fb.group({
    email: [
      '',
      [Validators.required, Validators.pattern(FormUtils.emailPattern)],
    ],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  onSubmit() {
    if (this.loginForm.invalid) return;
    let email: string = this.loginForm.controls['email'].value ?? '';
    let password: string = this.loginForm.controls['password'].value ?? '';
    this.authService.login(email, password).subscribe((data) => {
      if(data) this.router.navigateByUrl('employees');
    });
    this.loginForm.reset();
  }
}
