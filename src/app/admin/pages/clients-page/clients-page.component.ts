import { Component, effect, inject, signal } from '@angular/core';
import { ClientsService } from '../../../clients/services/clients.service';
import { ClientTableComponent } from "../../../clients/components/client-table/client-table.component";
import { Client } from '../../../clients/interfaces/client.interface';
import { TitleComponent } from "../../../common/components/title/title.component";
import { CreateBtnComponent } from "../../../common/components/crud/create-btn/create-btn.component";

@Component({
  selector: 'app-clients-page',
  imports: [ClientTableComponent, TitleComponent, CreateBtnComponent, CreateBtnComponent],
  templateUrl: './clients-page.component.html',
})
export class ClientsPageComponent {
  clientsService = inject(ClientsService);
  clients = signal<Client[]>([]);

  loadClients = effect((onCleanup)=> {
    const requestClients = this.getClients();

    onCleanup(()=> {
      requestClients.unsubscribe();
    })
  })

  getClients(){
    return this.clientsService.getClients().subscribe( data =>{
      this.clients.set(data);
    })
  }

  clientDeleted(id: string){

    //Encontrar el objeto que cambio en el arreglo del padre por indice
    const index = this.clients().findIndex(client => client.id === id);
    const client = this.clients()[index];
    
    client.active = (client.active)? false: true;
  }
}
