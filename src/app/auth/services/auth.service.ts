import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { UserSession } from '../interfaces/user-session.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  routeApi = '/auth'
  httpClient = inject(HttpClient);
  router = inject(Router);

  private _user = signal<UserSession | null>(this.getFromLocalStorage());

  user = computed(() => this._user())

  constructor() { }

  login(email: string,password:string) {
    this.httpClient.post<UserSession>(`${environment.API_URL}${this.routeApi}/login`, {
      email,
      password
    })
    .subscribe( data => {
      localStorage.setItem('userLogged', JSON.stringify(data));
      this._user.set(data);
      this.router.navigate(['admin']);
    });
  }

  getFromLocalStorage(): UserSession | null{
    const dataFromLocal = localStorage.getItem('userLogged');
    if(!dataFromLocal) return null;

    const user = JSON.parse(dataFromLocal);

    return user;
  }

  logout(){
    //Eliminar usuario del localStorage
    localStorage.removeItem('userLogged');
    //Asignar null al usuario
    this._user.set(null);
    //Enviar al login
    this.router.navigate(['login']);
  }

  get getUserLogged(){
    return this.user();
  }
}
