import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { TaxRegime } from '../interfaces/tax-regime.interface';
import { environment } from '../../../environments/environment';
import { catchError, Observable, of } from 'rxjs';
import { TaxObligation } from '../interfaces/tax-obligation.interface';

const newRegime: TaxRegime = {
  id: 'new',
  description: '',
  name: '',
}

@Injectable({
  providedIn: 'root'
})
export class TaxesService {
  route = `${environment.API_URL}/taxes`;
  http = inject(HttpClient);

  getTaxRegimes(){
    return this.http.get<TaxRegime[]>(`${this.route}/regime`).pipe(
      catchError((error) => {
        console.log(error.error.message);
        return of([]);
      })
    );
  }

  getTaxObligations(): Observable<TaxObligation[]>{
    return this.http.get<TaxObligation[]>(`${this.route}/obligation`).pipe(
      catchError((error) => {
        console.log(error);
        return of([]);
      })
    );
  }

  getRegime(id: string): Observable<TaxRegime>{
    if(id === 'new') return of(newRegime);
    return this.http.get<TaxRegime>(`${this.route}/${id}`);
  }

}
