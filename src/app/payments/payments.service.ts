import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { catchError, Observable } from 'rxjs';
import { Payment } from './interfaces/payment.interface';

@Injectable({providedIn: 'root'})
export class PaymentsService {
    route = `${environment.API_URL}/payments`;
    routePDF = `${environment.API_URL}/pdf/generate`;
    httpClient = inject(HttpClient);

    //Create new payment
    create(payment: Partial<Payment>){
        return this.httpClient.post(`${this.route}`, payment);
    }

    get(idPayment: string): Observable<Payment>{
        return this.httpClient.get<Payment>(`${this.route}/view/${idPayment}`);
    }

    getAllFromClient(idClient: string): Observable<Payment[]>{
        return this.httpClient.get<Payment[]>(`${this.route}/${idClient}`);
    }

    getPDF(idPayment: string): Observable<Blob>{
        return this.httpClient.get(`${this.routePDF}/${idPayment}`, {responseType: 'blob'});
    }

    update(id: string, payment: Partial<Payment>){
        return this.httpClient.patch(`${this.route}/${id}`, payment);
    }
}