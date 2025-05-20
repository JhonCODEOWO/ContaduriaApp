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

@Component({
  selector: 'app-client-contracts',
  imports: [
    TitleComponent,
    DatePipe,
    CurrencyPipe,
    CreateBtnComponent,
    RouterLink,
  ],
  templateUrl: './client-contracts.component.html',
})
export class ClientContractsComponent implements OnInit {
  clientService = inject(ClientsService);
  contractService = inject(ContractService);
  clientID = toSignal(
    inject(ActivatedRoute).paramMap.pipe(map((params) => params.get('id')))
  );

  client = signal<Client | null>(null);
  contracts = signal<Contract[] | null>(null);

  ngOnInit(): void {
    this.clientService.getClient(this.clientID() ?? '').subscribe((client) => {
      this.client.set(client);
    });

    this.contractService.getAll().subscribe((contracts) => {
      this.contracts.set(contracts);
    });
  }

  onDeleteClick(idContract: string) {
    this.contractService.delete(idContract).subscribe((deleted) =>
      this.contracts.update((data) => {
        if (!data) return data;

        return data.filter((contract) => contract.id != idContract);
      })
    );
  }
}
