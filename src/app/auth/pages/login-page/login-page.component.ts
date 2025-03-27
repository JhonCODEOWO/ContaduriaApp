import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';
import { AuthService } from '../../services/auth.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule],
  templateUrl: './login-page.component.html',
})
export class LoginPageComponent {

  constructor(){
    console.log(environment.API_URL);
  }
  fb = inject(FormBuilder);
  formUtils = FormUtils;
  authService = inject(AuthService);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.pattern(FormUtils.emailPattern)]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  onSubmit() {
    if(this.loginForm.invalid) return; 
    let email: string = this.loginForm.controls['email'].value ?? '';
    let password: string = this.loginForm.controls['password'].value ?? '';
    this.authService.login(email, password);
    this.loginForm.reset();
  }
}
