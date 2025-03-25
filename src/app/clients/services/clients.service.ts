import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { catchError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  route = '/clients';
  http = inject(HttpClient);
  router = inject(Router);
  
  getClients(){
    return this.http.get(`${environment.API_URL}${this.route}`).pipe(
      catchError((response) => {
        if(response.error.statusCode == 401) {
          this.router.navigate(['login']);
        }
        return response.error.message;
      })
    );
  }
}
