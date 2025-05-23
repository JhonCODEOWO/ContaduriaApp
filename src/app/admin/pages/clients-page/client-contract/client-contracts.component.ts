import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { ClientsService } from '../../../../clients/services/clients.service';
import { Client } from '../../../../clients/interfaces/client.interface';
import { TitleComponent } from '../../../../common/components/title/title.component';
import { ContractService } from '../../../../contracts/services/contract.service';
import { Contract } from '../../../../contracts/interfaces/contract.interface';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { CreateBtnComponent } from '../../../../common/components/crud/create-btn/create-btn.component';
import { PaymentsService } from '../../../../payments/payments.service';
import { Payment } from '../../../../payments/interfaces/payment.interface';
import { PaymentElementComponent } from '../../../../payments/components/payment-element/payment-element.component';
import { ContractElementComponent } from '../../../../contracts/components/contract-element/contract-element.component';

@Component({
  selector: 'app-client-contracts',
  imports: [
    TitleComponent,
    CreateBtnComponent,
    PaymentElementComponent,
    ContractElementComponent
],
  templateUrl: './client-contracts.component.html',
})
export class ClientContractsComponent implements OnInit {
  clientService = inject(ClientsService);
  contractService = inject(ContractService);
  paymentsService = inject(PaymentsService);
  clientID = toSignal(
    inject(ActivatedRoute).paramMap.pipe(map((params) => params.get('id')))
  );

  client = signal<Client | null>(null);
  contracts = signal<Contract[] | null>(null);
  payments = signal<Payment[] | null>(null);

  ngOnInit(): void {
    this.clientService.getClient(this.clientID() ?? '').subscribe((client) => {
      this.client.set(client);
    });

    //TODO: Implementar get all con id del cliente
    this.contractService.getAll().subscribe((contracts) => {
      this.contracts.set(contracts);
    });

    this.paymentsService
      .getAllFromClient(this.clientID() ?? '')
      .subscribe((payments) => this.payments.set(payments));
  }

  handleDeleteContract(contract: Contract) {
    this.contractService.delete(contract.id).subscribe((deleted) =>
      this.contracts.update((data) => {
        if (!data) return data;

        return data.filter((contract) => contract.id != contract.id);
      })
    );
  }

  handleDownloadPDF(idPayment: string) {
    this.paymentsService.getPDF(idPayment).subscribe((blob) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'pago.pdf';
      a.click();
      URL.revokeObjectURL(url);
    });
  }
}
