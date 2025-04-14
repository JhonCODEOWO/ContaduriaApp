import { AfterViewInit, Component, effect, ElementRef, inject, signal, viewChild } from '@angular/core';
import { ClientsService, ClientWithUserBody } from '../../../clients/services/clients.service';
import { ClientTableComponent, UsersAndClient } from "../../../clients/components/client-table/client-table.component";
import { Client } from '../../../clients/interfaces/client.interface';
import { TitleComponent } from "../../../common/components/title/title.component";
import { CreateBtnComponent } from "../../../common/components/crud/create-btn/create-btn.component";
import { UserResponse } from '../../../users/interfaces/user-response.interface';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClientModalUserComponent, ClientUserRelationDone } from "./client-modal-user/client-modal-user.component";
import { User } from '../../../users/interfaces/user.interface';
import { LoaderComponent } from '../../../common/components/loader/loader.component';

@Component({
  selector: 'app-clients-page',
  imports: [ClientTableComponent, TitleComponent, CreateBtnComponent, CreateBtnComponent, ReactiveFormsModule, ClientModalUserComponent,LoaderComponent],
  templateUrl: './clients-page.component.html',
})
export class ClientsPageComponent {
  clientsService = inject(ClientsService);
  clients = signal<Client[] | null >(null);
  usersAndClient = signal<UsersAndClient | null>(null);

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
    const index = this.clients()!.findIndex(client => client.id === id);
    const client = this.clients()![index];
    
    client.active = (client.active)? false: true;
  }

  //Evento que controla cuando un hijo emite un valor UserAndClient y se asigna a la propiedad que toma el modal.
  usersClicked(usersWithClient: UsersAndClient){
    this.usersAndClient.set(usersWithClient);
  }

  //Evento para controlar cuando a un usuario se le ha relacionado un cliente correctamente
  clientAffected(relationDone: ClientUserRelationDone){
    const client = this.findClient(this.clients()!, relationDone.clientID) //Obtener cliente de la propiedad
    //Si el objeto recibido por el evento contiene un usuario y no indefinido
    if(relationDone.user){
      client.clientUser?.push({client: client, user: relationDone.user}); //Añadir al indice del cliente los datos recibidos
    }
  }

  findClient(clients: Client[], id: string) {
    const index = this.clients()!.findIndex(client => client.id === id);
    return clients[index];
  }
}
