import { Component, effect, inject } from '@angular/core';
import { ClientsService } from '../../../clients/services/clients.service';

@Component({
  selector: 'app-clients-page',
  imports: [],
  templateUrl: './clients-page.component.html',
})
export class ClientsPageComponent {
  clientsService = inject(ClientsService);

  loadClients = effect(()=> {
    this.clientsService.getClients().subscribe( data =>{
      console.log(data);
    })
  })
}
