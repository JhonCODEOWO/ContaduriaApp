import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { UserSession } from '../interfaces/user-session.interface';
import { Router } from '@angular/router';
import { AuthResponse } from '../interfaces/auth-response.interface';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';

type AuthStatus = 'authenticated' | 'not-authenticated' | 'checking';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  routeApi = '/auth'
  httpClient = inject(HttpClient);
  router = inject(Router);

  private _user = signal<UserSession | null>(null);
  private _authStatus = signal<AuthStatus>('checking');
  private _token = signal<string | null>(localStorage.getItem('token'));

  user = computed(() => this._user());
  token = computed(() => this._token());

  //Ejecutar chequeo de status para recrear una sesión o bien dirigir usuario a renovarla
  checkStatusResource = rxResource({
    loader: () => this.checkStatus(),
  });

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
    console.log('CheckStatus token: ' + this.getFromLocalStorage());
    if(!this.getFromLocalStorage()) {
      this.logout();
      return of(false);
    }

    return this.httpClient.get<AuthResponse>(`${environment.API_URL}${this.routeApi}/session/check-status`).pipe(
      map((response) => this.handleAuthSuccess(response)),
      catchError((error) => {
        return this.handleAuthError(error);
      })
    );
  }

  private handleAuthSuccess({user, token}: AuthResponse){
    console.log(user);
    this._user.set(user);
    this._token.set(token);
    this._authStatus.set('authenticated');

    localStorage.setItem('token', token);

    return true;
  }

  private handleAuthError(error: any){
    this.logout();
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
    console.log('GetFromLocalStorage: ' + tokenFromLocal);
    if(!tokenFromLocal) return null;

    return tokenFromLocal;
  }
}
