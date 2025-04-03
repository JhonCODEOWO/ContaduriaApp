import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { User } from '../interfaces/user.interface';
import { environment } from '../../../environments/environment';
import { UserResponse } from '../interfaces/user-response.interface';

const route = '/auth/users';

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
}
