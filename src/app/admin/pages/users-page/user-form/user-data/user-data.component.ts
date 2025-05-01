import { Component, inject, input, OnInit, output, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../../../../../users/services/user.service';
import { FormUtils } from '../../../../../utils/form-utils';
import { User } from '../../../../../users/interfaces/user.interface';
import { AlertErrorComponent } from '../../../../../common/components/alert-error/alert-error.component';
import { InputFieldComponent } from '../../../../../common/components/input-field/input-field.component';
import { UniqueEmailOnUser } from '../../../../../utils/user-utils';
import { RolesService } from '../../../../../roles/roles.service';
import { Role } from '../../../../../roles/interfaces/role.interface';
import { UserRolesComponent } from '../user-roles/user-roles.component';
import { firstValueFrom } from 'rxjs';
import { uniqueEmailValidator } from '../../../../../users/validators/validate-email-update';

@Component({
  selector: 'admin-user-data',
  imports: [AlertErrorComponent, ReactiveFormsModule, InputFieldComponent, UserRolesComponent],
  templateUrl: './user-data.component.html',
})
export class UserDataComponent implements OnInit{
  fb = inject(FormBuilder);
  rolesService = inject(RolesService);
  userService = inject(UsersService);
  uniqueEmailOnUser = inject(UniqueEmailOnUser);

  formUtils = FormUtils;
  roles = signal<Role[] | null>(null); //Signal que almacenará los roles provenientes de la base de datos.
  rolesSelected = signal<Role[]>([]); //Signal que mantendrá los roles para poder enviarlos a la petición del API.

  rolesActual = output<Role[]>(); //Output para dar a conocer roles
  roleDeleted = output<Role>(); //Output para dar a conocer role eliminado

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
        []
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
      updateOn: 'blur'
    }
  );

  ngOnInit(): void {
      this.rolesService.getRoles().subscribe(roles => this.roles.set(roles))
      this.setFormValue(this.user());
      //Añadir o eliminar validadores en base al tipo de operación
      if(this.user().id != 'new') {
        this.userForm.get('password')?.removeValidators([Validators.required]);
        this.userForm.get('passwordVerify')?.removeValidators([Validators.required]);
        this.userForm.get('email')?.addAsyncValidators([uniqueEmailValidator(this.userService, this.user().id)]);
      } else {
        this.userForm.get('email')?.addAsyncValidators([uniqueEmailValidator(this.userService, '')]);
      }
  }

  async onSubmit() {
    this.userForm.markAllAsTouched();
    if (this.userForm.invalid) return;

    const data = this.userForm.value;
    delete data.passwordVerify;

    const user: Partial<User> = {
      ...(data as any),
    };
    const roles = this.rolesSelected().map(role => role.id);

    if (this.user().id === 'new') {
      //Crear
      const userCreated = await firstValueFrom(this.userService.createUser(user));

      this.rolesService.assignToUser({idUser: userCreated.id, roles}).subscribe(user => console.log(user));
    }else{
      //TODO: Eliminar propiedades que son opcionales
      if(!user.password) delete user.password;
      this.userService.updateUser(this.user().id, user).subscribe(data => {
        this.rolesService.assignToUser({idUser: data.id, roles}).subscribe(user => console.log(user));
      });
    }
  }

  setFormValue(formLike: Partial<User>) {
    this.userForm.reset(formLike);
  }

  //Recibe los datos emitidos por user-roles y los aplica a sus datos para enviarlos a las peticiones correspondientes
  handleRolesClicked(roles: Role[]){
    this.rolesActual.emit(roles); //Emite los roles para que los componentes padres puedan utilizarlos
    this.rolesSelected.set(roles); //Coloca los datos actuales en cada evento.
  }

  //Trata el evento clickDeleteRol y realiza la petición pertinente, si esta es true emite el role eliminado para componentes padre
  handleRoleToDelete(role: Role){
    console.log('DeleteRole');
    this.rolesService.removeRoleFromUser(this.user().id, role.id).subscribe(success => (success)? this.roleDeleted.emit(role): '');
  }
}
