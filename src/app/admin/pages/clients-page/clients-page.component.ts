import { Component, effect, inject } from '@angular/core';
import { ClientsService } from '../../../clients/services/clients.service';
import { ClientTableComponent } from "../../../clients/components/client-table/client-table.component";
import { Client } from '../../../clients/interfaces/client.interface';
import { TitleComponent } from "../../../common/components/title/title.component";

@Component({
  selector: 'app-clients-page',
  imports: [ClientTableComponent, TitleComponent],
  templateUrl: './clients-page.component.html',
})
export class ClientsPageComponent {
  clientsService = inject(ClientsService);
  clients: Client[] = [];

  loadClients = effect((onCleanup)=> {
    const requestClients = this.getClients();

    onCleanup(()=> {
      requestClients.unsubscribe();
    })
  })

  getClients(){
    return this.clientsService.getClients().subscribe( data =>{
      this.clients = data;
    })
  }
}
