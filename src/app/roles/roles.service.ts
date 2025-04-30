import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Role } from './interfaces/role.interface';
import { User } from '../users/interfaces/user.interface';

@Injectable({providedIn: 'root'})
export class RolesService {
    route = `${environment.API_URL}/roles`;
    httpClient = inject(HttpClient);

    getRoles(): Observable<Role[]>{
        return this.httpClient.get<Role[]>(this.route);
    }

    assignToUser(relateBody: {idUser: string, roles: string[]}): Observable<User>{
        return this.httpClient.post<User>(`${this.route}/roles-user`, relateBody);
    }

    removeRoleFromUser(idUser: string, idRole: string): Observable<boolean>{
        return this.httpClient.delete<boolean>(`${this.route}/roles-user/remove/${idUser}/${idRole}`);
    }
}