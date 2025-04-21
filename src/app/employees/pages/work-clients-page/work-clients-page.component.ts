import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { TitleComponent } from "../../../common/components/title/title.component";
import { ClientsService } from '../../../clients/services/clients.service';
import { Client } from '../../../clients/interfaces/client.interface';
import { AuthService } from '../../../auth/services/auth.service';
import { ClientRelatedResponse } from '../../../clients/interfaces/client-related-response.interface';
import { ClientTableComponent } from "../../../clients/components/client-table/client-table.component";

@Component({
  selector: 'employee-work-clients-page',
  imports: [TitleComponent, ClientTableComponent],
  templateUrl: './work-clients-page.component.html',
})
export class WorkClientsPageComponent implements OnInit{
  clientService = inject(ClientsService);
  userLogged = inject(AuthService).getUserLogged;
  dataResponse = signal<ClientRelatedResponse | null>(null);

  clients = computed(() => {
    return this.dataResponse()?.clientAssigned.map(clientAssigned => {
      const client = clientAssigned.client;
      return client;
    })
  })

  ngOnInit(): void {
      this.clientService.getClientsAssignedToUser(this.userLogged?.id ?? '').subscribe(clientRelatedResponse => {
        console.log(clientRelatedResponse);
        this.dataResponse.set(clientRelatedResponse);
      });
  }
}
