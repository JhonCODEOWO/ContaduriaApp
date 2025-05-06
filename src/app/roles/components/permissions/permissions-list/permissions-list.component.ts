import { Component, computed, inject, input, output } from '@angular/core';
import { Permission } from '../../../interfaces/permission.interface';
import { TitleComponent } from '../../../../common/components/title/title.component';
import { CollapseComponent } from '../../../../common/components/collapse/collapse.component';
import { Role } from '../../../interfaces/role.interface';
import { PermissionsService } from '../../../permissions.service';
import { PermissionToRole } from '../../../interfaces/permissionToRole.interface';

@Component({
  selector: 'permissions-list',
  imports: [CollapseComponent],
  templateUrl: './permissions-list.component.html',
})
export class PermissionsListComponent {
  role = input<Role | null>(null);
  permissions = input.required<Permission[]>();
  tittle = input.required<string>();

  permissionService = inject(PermissionsService);

  roleAffected = output<Role>();

  titleComputed = computed(() => {
    if (this.role()) {
      return `Permisos existentes en ${this.role()?.name}`;
    }

    return this.tittle();
  });

  permissionsInRole = computed(() => {
    if (this.role())
      return this.role()?.permissions?.map((permission) => permission.id);
    return [];
  });

  onCheckClick(checkbox: HTMLInputElement, permissionId: string, event: Event) {
    event.preventDefault();
    
    if (!this.role()) return;

    //Data necessary to make the operation
    const data: PermissionToRole = {
      permissionId,
      roleId: this.role()!.id,
    };

    //Try to relate the permission clicked...
    if (checkbox.checked) {
      //Make the request
      this.permissionService
        .assignPermissionToRole({ permissionId, roleId: this.role()!.id })
        .subscribe({
          next: (data) => {
            //Send output with role affected
            this.roleAffected.emit(data);
          },
          error: () => {
            checkbox.checked = false;
          },
        });
      return;
    }

    //Trying to remove the permission clicked..
    this.permissionService.deletePermissionFromRole(data).subscribe({
      next: (success) => {
        if(!success) return;

        const role = this.role();

        if (!role || !role.permissions) return;

        // Clonar role y sus permisos quitando el que se ha eliminado
        const updatedRole: Role = {
          ...role,
          permissions: role.permissions.filter(
            (p) => p.id !== permissionId
          ),
        };
        this.roleAffected.emit(updatedRole);
      },
      error: () => {
        checkbox.checked = true;
      },
    });
    return;
  }
}
