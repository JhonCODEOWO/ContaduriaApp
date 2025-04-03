import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { TaxRegime } from '../interfaces/tax-regime.interface';
import { environment } from '../../../environments/environment';
import { catchError, Observable, of } from 'rxjs';
import { TaxObligation } from '../interfaces/tax-obligation.interface';

@Injectable({
  providedIn: 'root'
})
export class TaxesService {
  route = '/taxes';
  http = inject(HttpClient);

  getTaxRegimes(){
    return this.http.get<TaxRegime[]>(`${environment.API_URL}${this.route}/regime`).pipe(
      catchError((error) => {
        console.log(error.error.message);
        return of([]);
      })
    );
  }

  getTaxObligations(): Observable<TaxObligation[]>{
    return this.http.get<TaxObligation[]>(`${environment.API_URL}${this.route}/obligation`).pipe(
      catchError((error) => {
        console.log(error);
        return of([]);
      })
    );
  }

}
