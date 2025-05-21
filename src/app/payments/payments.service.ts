import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Payment } from './interfaces/payment.interface';

@Injectable({providedIn: 'root'})
export class PaymentsService {
    route = `${environment.API_URL}/payments`;
    routePDF = `${environment.API_URL}/pdf/generate`;
    httpClient = inject(HttpClient);

    //Create new payment
    create(){
        return this.httpClient.post(`${this.route}`, {});
    }

    getAllFromClient(idClient: string): Observable<Payment[]>{
        return this.httpClient.get<Payment[]>(`${this.route}/${idClient}`);
    }

    getPDF(idPayment: string): Observable<Blob>{
        return this.httpClient.get(`${this.routePDF}/${idPayment}`, {responseType: 'blob'});
    }
}