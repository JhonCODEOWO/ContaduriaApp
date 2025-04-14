import { HttpClient } from '@angular/common/http';
import { effect, inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { catchError, delay, Observable, of, switchMap } from 'rxjs';
import { Router } from '@angular/router';
import { Client } from '../interfaces/client.interface';
import { ClientRelated } from '../interfaces/client-assigned.interface';
import { UsersService } from '../../users/services/user.service';
import { ClientRelatedResponse } from '../interfaces/client-related-response.interface';

const newClient: Client = {
  id: 'new',
  fullName: '',
  phoneNumber: '',
  active: false,
  sat_password: '',
  createdAt: new Date(),
  rfc: '',
  updatedAt: new Date()
}

/**
 * Representa el body necesario para relacionar un cliente a un usuario
 */
export interface ClientWithUserBody {
  /**
   * Identificador único del cliente, debe ser UUID.
   */
  clientID: string,
    /**
   * Identificador único del usuario, debe ser UUID.
   */
  userID: string,
}

@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  route = `${environment.API_URL}/clients`;
  http = inject(HttpClient);
  router = inject(Router);
  userService = inject(UsersService);
  
  getClients(): Observable<Client[]>{
    return this.http.get<Client[]>(`${this.route}`).pipe(
      catchError((response) => {
        if(response.error.statusCode == 401) {
          this.router.navigate(['login']);
        }
        return of([])
      })
    );
  }

  getClient(id: string): Observable<Client>{
    if(id === 'new') return of(newClient);
    return this.http.get<Client>(`${this.route}/${id}`);
  }

  getClientById(){

  }

  createClient(clientToCreate: Partial<Client>): Observable<Client>{
    return this.http.post<Client>(`${this.route}`, clientToCreate);
  }

  updateClient(clientToUpdate: Partial<Client>, id: string): Observable<Client>{
    return this.http.patch<Client>(`${this.route}/${id}`, clientToUpdate);
  };

  disableClient(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.route}/${id}`);
  }

  assignUser(clientWithUser: ClientWithUserBody): Observable<Client | null>{
    return this.http.post<Client>(`${this.route}/assign`, clientWithUser).pipe(
      catchError(error => {
        return of(null);
      })
    );
  }


  getClientsAssignedToUser(id: string): Observable<ClientRelatedResponse>{
    return this.userService.getUser(id).pipe(
      switchMap(user => this.http.get<ClientRelatedResponse>(`${this.route}/assigned/${user.id}`))
    );
  }

  unlinkClientFromUser(idClient: string, idUser: string): Observable<boolean>{
    return this.http.delete<boolean>(`${this.route}/unlink/${idClient}/${idUser}`);
  }
}
