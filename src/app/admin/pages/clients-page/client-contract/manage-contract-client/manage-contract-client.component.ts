import { Component, inject, OnInit, signal } from '@angular/core';
import { ContractFormComponent } from "../contract-form/contract-form.component";
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { ClientsService } from '../../../../../clients/services/clients.service';
import { ContractService } from '../../../../../contracts/services/contract.service';
import { Client } from '../../../../../clients/interfaces/client.interface';
import { SelectData } from '../../../../../common/components/select/interfaces/select-data.interface';

@Component({
  selector: 'app-manage-contract-client',
  imports: [ContractFormComponent],
  templateUrl: './manage-contract-client.component.html',
})
export class ManageContractClientComponent implements OnInit{
  clientService = inject(ClientsService);
  contractService = inject(ContractService);
  activatedRoute = inject(ActivatedRoute);

  clientSelect = signal<SelectData[] | null>(null)

  clientID = toSignal(this.activatedRoute.paramMap.pipe(map(params => params.get('idClient'))));
  contractID = toSignal(this.activatedRoute.paramMap.pipe(map(params => params.get('idContract'))));

  ngOnInit(): void {
      this.clientService.getClient(this.clientID() ?? '').pipe(map((client): SelectData[] => ([{id: client.id, optionText: client.fullName}]))).subscribe(selectData => this.clientSelect.set(selectData));
  }
}
