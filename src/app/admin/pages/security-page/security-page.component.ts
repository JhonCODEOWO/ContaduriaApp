import { Component, inject, OnInit, signal } from '@angular/core';
import { TitleComponent } from "../../../common/components/title/title.component";
import { RolesService } from '../../../roles/roles.service';
import { Role } from '../../../roles/interfaces/role.interface';
import { UserRolesComponent } from "../users-page/user-form/user-roles/user-roles.component";
import { PermissionsListComponent } from "../../../roles/components/permissions/permissions-list/permissions-list.component";
import { PermissionsService } from '../../../roles/permissions.service';
import { Permission } from '../../../roles/interfaces/permission.interface';
import { LoaderComponent } from '../../../common/components/loader/loader.component';

@Component({
  selector: 'admin-security-page',
  imports: [TitleComponent, UserRolesComponent, PermissionsListComponent, LoaderComponent],
  templateUrl: './security-page.component.html',
})
export class SecurityPageComponent implements OnInit{
  rolesService = inject(RolesService);
  permissionsService = inject(PermissionsService);

  roles = signal<Role[] | null>(null);
  permissions = signal<Permission[] | null>(null);
  actualRole = signal<Role | null>(null);

  ngOnInit(): void {
      this.rolesService.getRoles().subscribe(roles => this.roles.set(roles));
      this.permissionsService.getPermissions().subscribe(permissions => this.permissions.set(permissions));
  }

  handleRoleSelected(role: Role) {
    this.actualRole.set(role);
  }

  onDeselect(){
    this.actualRole.set(null);
  }

  //Handle a role affected when is used in permissionList
  handleRoleAffected(role: Role){
    if(this.actualRole) this.actualRole.update(actual => role); //update role selected just if its different of null
    this.roles.update(actualData => {
      if(actualData){
        const data = [...actualData];
        const index = data.findIndex(roleActual => roleActual.id === role.id); //Get index from the array
        data.splice(index, 1, role);
        return data;
      }

      return actualData;
    })
  }
}
