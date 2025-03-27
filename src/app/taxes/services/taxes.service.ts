import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { TaxRegime } from '../interfaces/tax-regime.interface';
import { environment } from '../../../environments/environment';
import { catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaxesService {
  route = '/taxes/regime';
  http = inject(HttpClient);

  getTaxRegimes(){
    return this.http.get<TaxRegime[]>(`${environment.API_URL}${this.route}`).pipe(
      catchError((error) => {
        console.log(error.error.message);
        return of([]);
      })
    );
  }

  getTaxObligations(){

  }

}
