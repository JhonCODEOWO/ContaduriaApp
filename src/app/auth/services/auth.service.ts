import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { UserSession } from '../interfaces/user-session.interface';
import { Router } from '@angular/router';
import { AuthResponse } from '../interfaces/auth-response.interface';
import { catchError, map, Observable, of, tap } from 'rxjs';

type AuthStatus = 'authenticated' | 'not-authenticated' | 'checking';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  routeApi = '/auth'
  httpClient = inject(HttpClient);
  router = inject(Router);

  constructor(){
    this.checkStatus().subscribe((data)=>{
      console.log(data);
    })
  }

  private _user = signal<UserSession | null>(null);
  private _authStatus = signal<AuthStatus>('checking');
  private _token = signal<string | null>(this.getFromLocalStorage());

  user = computed(() => this._user());
  token = computed(() => this._token());

  login(email: string, password:string): Observable<boolean> {
    return this.httpClient.post<AuthResponse>(`${environment.API_URL}${this.routeApi}/login`, {
      email,
      password
    }).pipe(
      map((response)=> this.handleAuthSuccess(response)),
      catchError((error) => this.handleAuthError(error))
    );
  }

  checkStatus(): Observable<boolean>{
    return this.httpClient.get<AuthResponse>(`${environment.API_URL}${this.routeApi}/session/check-status`, {
      headers: {
        Authorization: `Bearer ${this._token()}`
      }
    }).pipe(
      map((response) => this.handleAuthSuccess(response)),
      catchError((error) => {
        return this.handleAuthError(error);
      })
    );
  }

  private handleAuthSuccess({user, token}: AuthResponse){
    this._user.set(user);
    this._token.set(token);
    this._authStatus.set('authenticated');

    localStorage.setItem('token', token);

    return true;
  }

  private handleAuthError(error: any){
    this.logout();
    // console.error(error);
    return of(false);
  }

  logout(){
    //Eliminar usuario del localStorage
    localStorage.removeItem('token');
    //Asignar null al usuario
    this._user.set(null);
    this._token.set(null);
    this._authStatus.set('not-authenticated');
  }

  get getUserLogged(){
    return this.user();
  }

  //Retorna el token almacenado en localStorage si existe
  getFromLocalStorage(): string | null{
    const tokenFromLocal = localStorage.getItem('token');
    if(!tokenFromLocal) return null;

    return tokenFromLocal;
  }
}
