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
import { UserDataComponent } from './user-data/user-data.component';
import { UserRolesComponent } from './user-roles/user-roles.component';
import { Role } from '../../../../roles/interfaces/role.interface';
import { RolesService } from '../../../../roles/roles.service';

@Component({
  selector: 'admin-user-form',
  imports: [ReactiveFormsModule, UserDataComponent, TitleComponent],
  templateUrl: './user-form.component.html',
})
export class UserFormComponent implements OnInit {
  user = signal<User | null>(null);
  roles = signal<Role[] | null>(null);

  userService = inject(UsersService);
  rolesService = inject(RolesService);
  activateRoute = inject(ActivatedRoute);

  title = signal<string>('Crear nuevo usuario...');

  userID = toSignal(
    this.activateRoute.paramMap.pipe(map((params) => params.get('id')))
  );

  ngOnInit(): void {
    this.userService.getUser(this.userID() ?? '').subscribe((data) => {
      this.user.set(data);
    });

    this.rolesService.getRoles().subscribe((roles) => this.roles.set(roles));

    if (this.userID() != 'new') this.title.set('Modificar usuario...');
  }

  //JUST DEVELOPMENT: Suscripción al evento de roles actuales. No necesarios hasta el momento.
  handleRolesActual(roles: Role[]) {
    console.log(roles);
  }

  //Realiza acciones de renderización para los elementos hijos en base al evento removeRole emitido por el formulario.
  handleRemoveRole(role: Role) {
    const actual = this.user()?.roles ?? [];
    const index =
      actual?.findIndex((actualRole) => actualRole.id == role.id) ?? -1;
    actual?.splice(index, 1);

    this.user.update((actualUser) => {
      if (actualUser) {
        return { ...actualUser, roles: [...actual] };
      }
      return null;
    });
  }
}
