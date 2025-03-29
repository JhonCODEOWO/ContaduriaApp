import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { catchError, Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { Client } from '../interfaces/client.interface';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  route = '/clients';
  http = inject(HttpClient);
  router = inject(Router);
  
  getClients(): Observable<Client[]>{
    return this.http.get<Client[]>(`${environment.API_URL}${this.route}`).pipe(
      catchError((response) => {
        if(response.error.statusCode == 401) {
          this.router.navigate(['login']);
        }
        return of([])
      })
    );
  }
}
