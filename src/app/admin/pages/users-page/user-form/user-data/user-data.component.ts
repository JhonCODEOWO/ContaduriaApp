import { Component, inject, input, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../../../../../users/services/user.service';
import { FormUtils } from '../../../../../utils/form-utils';
import { User } from '../../../../../users/interfaces/user.interface';
import { AlertErrorComponent } from '../../../../../common/components/alert-error/alert-error.component';
import { InputFieldComponent } from '../../../../../common/components/input-field/input-field.component';
import { UniqueEmailOnUser } from '../../../../../utils/user-utils';

@Component({
  selector: 'admin-user-data',
  imports: [AlertErrorComponent, ReactiveFormsModule, InputFieldComponent],
  templateUrl: './user-data.component.html',
})
export class UserDataComponent implements OnInit{
  fb = inject(FormBuilder);
  formUtils = FormUtils;
  userService = inject(UsersService);
  uniqueEmailOnUser = inject(UniqueEmailOnUser);

  user = input.required<User>();

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
        [this.uniqueEmailOnUser.validate.bind(this.uniqueEmailOnUser)]
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
      this.setFormValue(this.user());
  }

  onSubmit() {
    this.userForm.markAllAsTouched();
    if (this.userForm.invalid) return;

    const data = this.userForm.value;
    delete data.passwordVerify;

    const user: Partial<User> = {
      ...(data as any),
    };

    if (this.user().id === 'new') {
      //Crear
      this.userService.createUser(user).subscribe((data) => {
        console.log(data);
      });
    }else{
      //TODO: Editar
      this.userService.updateUser(this.user().id, user).subscribe(data => {
        console.log(data);
      });
    }
  }

  setFormValue(formLike: Partial<User>) {
    this.userForm.reset(formLike);
  }
}
