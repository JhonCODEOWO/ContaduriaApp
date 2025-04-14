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

const newObligation: TaxObligation = {
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
    return this.http.get<TaxRegime>(`${this.route}/regime/${id}`);
  }

  getObligation(id: string): Observable<TaxObligation> {
    if(id === 'new') return of(newObligation);
    return this.http.get<TaxObligation>(`${this.route}/obligation/${id}`);
  }

  //Crea un nuevo regime, revisar documentación de backend para enviar en partial las partes necesarias.
  createRegime(regimeToCreate: Partial<TaxRegime>): Observable<TaxRegime> {
    return this.http.post<TaxRegime>(`${this.route}/regime`, regimeToCreate);
  }

  createObligation(obligationToCreate: Partial<TaxObligation>): Observable<TaxObligation>{
    return this.http.post<TaxObligation>(`${this.route}/obligation`, obligationToCreate);
  }

  updateObligation(id: string, dataToUpdate: Partial<TaxObligation>): Observable<TaxObligation> {
    return this.http.patch<TaxObligation>(`${this.route}/obligation/${id}`, dataToUpdate);
  }
}
