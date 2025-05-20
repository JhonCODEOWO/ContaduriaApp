import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { TaxRegime } from '../interfaces/tax-regime.interface';
import { environment } from '../../../environments/environment';
import { catchError, forkJoin, Observable, of, tap } from 'rxjs';
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

  getTaxRegimes(): Observable<TaxRegime[]>{
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

  updateRegime(id: string, regimeData: Partial<TaxRegime>): Observable<TaxRegime> {
    return this.http.patch<TaxRegime>(`${this.route}/regime/${id}`, regimeData);
  }

  assignObligationToRegime(regimeId: string, obligationId: string): Observable<TaxRegime> {
    return this.http.post<TaxRegime>(`${this.route}/regime/assign`, {
      regimeId,
      obligationId
    });
  }

  //Método que realiza una petición masiva usando un arreglo de id con obligaciones
  massiveAssignationObligationToRegime(regimeId: string, obligationIds: string[]): Observable<TaxRegime[] | boolean>{
    const requests = obligationIds.map(obligationId => this.assignObligationToRegime(regimeId, obligationId));

    return forkJoin(requests).pipe(
      catchError(error => {
        console.error(error);
        return of(false);
      })
    );
  }

  unlinkObligationInRegime(regimeId: string, obligationId: string): Observable<TaxRegime>{
    return this.http.delete<TaxRegime>(`${this.route}/regime/unlink/${regimeId}/${obligationId}`);
  }
}
