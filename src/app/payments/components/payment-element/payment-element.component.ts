import { Component, input, output } from '@angular/core';
import { Payment } from '../../interfaces/payment.interface';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'payment-element',
  imports: [DatePipe, CurrencyPipe, RouterLink],
  templateUrl: './payment-element.component.html',
})
export class PaymentElementComponent {
  payment = input.required<Payment>();
  downloadPDF = output<string>();

  onDownloadClick(idPayment: string){
    this.downloadPDF.emit(idPayment);
  }
}
