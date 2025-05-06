import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { delay, Observable } from 'rxjs';
import { Permission } from './interfaces/permission.interface';
import { PermissionToRole } from './interfaces/permissionToRole.interface';
import { Role } from './interfaces/role.interface';

@Injectable({providedIn: 'root'})
export class PermissionsService {
    route = `${environment.API_URL}/roles`;
    httpClient = inject(HttpClient);

    getPermissions(): Observable<Permission[]> {
        return this.httpClient.get<Permission[]>(`${this.route}/permissions`);
    };

    assignPermissionToRole(body: PermissionToRole): Observable<Role>{
        return this.httpClient.post<Role>(`${this.route}/role-permission`, body);
    }

    deletePermissionFromRole(data: PermissionToRole): Observable<boolean> {
        return this.httpClient.delete<boolean>(`${this.route}/role-permission/${data.roleId}/${data.permissionId}`);
    }
}