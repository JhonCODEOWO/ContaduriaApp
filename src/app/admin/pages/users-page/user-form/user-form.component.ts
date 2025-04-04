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
import { UserDataComponent } from "./user-data/user-data.component";

@Component({
  selector: 'admin-user-form',
  imports: [
    ReactiveFormsModule,
    UserDataComponent,
    TitleComponent
],
  templateUrl: './user-form.component.html',
})
export class UserFormComponent implements OnInit {
  
  user = signal<User | null>(null);

  userService = inject(UsersService);
  activateRoute = inject(ActivatedRoute);

  title = signal<string>('Crear nuevo usuario...');

  userID = toSignal(
    this.activateRoute.paramMap.pipe(map((params) => params.get('id')))
  );

  ngOnInit(): void {
    this.userService.getUser(this.userID() ?? '').subscribe((data) => {
      this.user.set(data);
    });

    if(this.userID() != 'new') this.title.set('Modificar usuario...');
  }
}
