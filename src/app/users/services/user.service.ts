import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { User } from '../interfaces/user.interface';
import { environment } from '../../../environments/environment';
import { UserResponse } from '../interfaces/user-response.interface';

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
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  httpClient = inject(HttpClient);

  getUsers(): Observable<UserResponse | null>{
    return this.httpClient.get<UserResponse>(`${environment.API_URL}${route}`).pipe(
      catchError(() => {
        return of(null);
      })
    );
  }

  createUser(userToCreate: Partial<User>): Observable<User>{
    return this.httpClient.post<User>(`${environment.API_URL}/auth/create`, {
      ...userToCreate
    });
  }

  getUser(id: string): Observable<User>{
    if(id == 'new') return of(newUser);
    return this.httpClient.get<User>(`${environment.API_URL}/auth/${id}`);
  }
}
