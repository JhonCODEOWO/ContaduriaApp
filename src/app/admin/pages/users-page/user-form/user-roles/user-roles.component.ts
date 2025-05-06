import { Component, computed, input, output, signal } from '@angular/core';
import { Role } from '../../../../../roles/interfaces/role.interface';
import { TitleComponent } from '../../../../../common/components/title/title.component';
import { User } from '../../../../../users/interfaces/user.interface';
import { ClassesNames } from '../../../../../common/enum/classes.enum';

@Component({
  selector: 'user-roles',
  imports: [TitleComponent],
  templateUrl: './user-roles.component.html',
})
export class UserRolesComponent {
  title = input.required<string>(); //Titulo a mostrar
  roles = input.required<Role[]>(); //Roles a listar
  user = input<User | null>(null); //Usuario, inicializado en nulo puesto que solo funciona para mostrar funcionalidades de edición

  editing = input(false); //Deprecated: Su uso era para mostrar o ocultar elementos dependiendo del estado true o false, no se ha utilizado.

  rolesClicked = signal<Role[]>([]); // Arreglo que contendrá todos los role a los que se ha dado click.
  actualRoles = output<Role[]>(); //Output: Roles que se desean exponer a los componentes padre, debe contener únicamente roles utilizables.

  roleToDelete = output<Role>(); //Output: Debe emitir un role destinado a eliminarse o desecharse por los componentes padres
  roleSelected = output<Role>(); //Output: Emit para emitir un role individual seleccionado, solo utilizado para emitir un rol seleccionado por un evento.

  //Obtener roles del usuario en formato plano, SI NO HAY USUARIO PRESENTE EL ARREGLO SIEMPRE SERÁ VACÍO
  rolesInUser = computed(() => {
    if (this.user()) {
      return this.user()?.roles.map((role) => role.id);
    }
    return [];
  });

  //Controla el click en cada elemento que representa la visualización de un role, simboliza el control de roles a exponer a componentes padres.
  onRoleClicked(role: Role, element: HTMLLIElement) {
    //Si rolesClicked no tiene el rol actual....
    if (!this.rolesClicked().includes(role)) {
      element.classList.add(ClassesNames.ClickedElement);
      this.rolesClicked().push(role);
    } else {
      element.classList.remove(ClassesNames.ClickedElement);
      const index = this.rolesClicked().findIndex(
        (clickedRole) => clickedRole.id === role.id
      );
      this.rolesClicked().splice(index, 1);
    }

    //Emitir arreglo con los datos deseados
    this.actualRoles.emit(this.rolesClicked());
  }

  //Controla el click en eliminación de un role, simboliza el desecho de un role.
  onDeleteRoleClicked(role: Role) {
    this.roleToDelete.emit(role);
  }

  onPermissionAssignClick(role: Role) {
    this.roleSelected.emit(role);
  }
}
