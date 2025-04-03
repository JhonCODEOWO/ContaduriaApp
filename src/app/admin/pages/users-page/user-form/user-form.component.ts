import { Component, computed, inject, OnInit, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputFieldComponent } from '../../../../common/components/input-field/input-field.component';
import { TitleComponent } from '../../../../common/components/title/title.component';
import { FormUtils } from '../../../../utils/form-utils';
import { AlertErrorComponent } from '../../../../common/components/alert-error/alert-error.component';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../../../users/services/user.service';
import { User } from '../../../../users/interfaces/user.interface';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Component({
  selector: 'admin-user-form',
  imports: [
    ReactiveFormsModule,
    InputFieldComponent,
    TitleComponent,
    AlertErrorComponent,
  ],
  templateUrl: './user-form.component.html',
})
export class UserFormComponent implements OnInit {
  fb = inject(FormBuilder);
  formUtils = FormUtils;
  user = signal<Partial<User> | null>(null);

  activateRoute = inject(ActivatedRoute);
  userID = toSignal(
    this.activateRoute.paramMap.pipe(map((params) => params.get('id')))
  );

  userService = inject(UsersService);

  userForm = this.fb.group(
    {
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      lastName: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(30),
        ],
      ],
      email: [
        '',
        [Validators.required, Validators.pattern(FormUtils.emailPattern)],
      ],
      phone_number: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(12),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(8)]],
      passwordVerify: ['', [Validators.required]],
    },
    {
      validators: [
        FormUtils.isFieldOneEqualFieldTwo('password', 'passwordVerify'),
      ],
    }
  );

  ngOnInit(): void {
    this.userService.getUser(this.userID() ?? '').subscribe((data) => {
      this.user.set(data);
      this.setFormValue(data);
    });
  }

  setFormValue(formLike: Partial<User>) {
    this.userForm.reset(formLike);
  }

  onSubmit() {
    this.userForm.markAllAsTouched();
    if (this.userForm.invalid) return;

    const data = this.userForm.value;
    delete data.passwordVerify;

    const user: Partial<User> = {
      ...(data as any),
    };

    if (this.userID() === 'new') {
      //Crear
      this.userService.createUser(user).subscribe((data) => {
        console.log(data);
      });
    }else{
      //TODO: Editar
    }
  }
}
