import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, delay, Observable, of, tap } from 'rxjs';
import { User } from '../interfaces/user.interface';
import { environment } from '../../../environments/environment';
import { UserResponse } from '../interfaces/user-response.interface';
import { ToastService } from '../../common/components/toast-component/service/toast.service';
import { StylesToast } from '../../common/components/toast-component/toast.component';
import { PaginationOpts } from '../../common/components/pagination-component/interfaces/pagination-opts.interface';

const route = '/auth/users';

const newUser: User = {
  id: 'new',
  name: '',
  lastName: '',
  email: '',
  phone_number: '',
  active: false,
  createdAt: new Date,
  updatedAt: new Date,
  roles: [],
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  httpClient = inject(HttpClient);
  toastService = inject(ToastService);

  getUsers(options: PaginationOpts): Observable<UserResponse | null>{
    const {limit = 8, offset = 0} = options;
    return this.httpClient.get<UserResponse>(`${environment.API_URL}${route}`, {params: {limit, offset}}).pipe(
      delay(2000),
      catchError(() => {
        return of(null);
      })
    );
  }

  createUser(userToCreate: Partial<User>): Observable<User>{
    return this.httpClient.post<User>(`${environment.API_URL}/auth/create`, {
      ...userToCreate
    }).pipe(
      tap(user => this.toastService.saveToast({styleClass: StylesToast.SUCCESSFUL, txtToast: `Usuario ${user.lastName} creado correctamente`}))
    );
  }

  getUser(id: string): Observable<User>{
    if(id == 'new') return of(newUser);
    return this.httpClient.get<User>(`${environment.API_URL}/auth/${id}`);
  }

  updateUser(id: string, dataUpdate: Partial<User>): Observable<User>{
    return this.httpClient.patch<User>(`${environment.API_URL}/auth/${id}`, {
      ...dataUpdate
    }).pipe(
      tap(user => this.toastService.saveToast({styleClass: StylesToast.SUCCESSFUL, txtToast: `Usuario ${user.lastName} actualizado correctamente`}))
    );
  }

  disableUser(id: string): Observable<boolean>{
    return this.httpClient.delete<boolean>(`${environment.API_URL}/auth/disable/${id}`);
  }

  enableUser(id: string): Observable<boolean>{
    return this.httpClient.patch<boolean>(`${environment.API_URL}/auth/enable/${id}`, {});
  }

  verifyEmail(email: string, idUser: string = ''): Observable<boolean>{
    return this.httpClient.get<boolean>(`${environment.API_URL}/auth/verifyAvailableEmail/${email}`, {params: {idUser}});
  }
}
