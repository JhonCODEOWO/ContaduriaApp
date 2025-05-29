import { AfterViewInit, Component, effect, ElementRef, inject, signal, viewChild } from '@angular/core';
import { ClientsService, ClientWithUserBody } from '../../../clients/services/clients.service';
import { ClientTableComponent, UsersAndClient } from "../../../clients/components/client-table/client-table.component";
import { Client } from '../../../clients/interfaces/client.interface';
import { TitleComponent } from "../../../common/components/title/title.component";
import { CreateBtnComponent } from "../../../common/components/crud/create-btn/create-btn.component";
import { GetAllResponse, UserResponse } from '../../../users/interfaces/user-response.interface';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClientModalUserComponent, ClientUserRelationDone } from "./client-modal-user/client-modal-user.component";
import { User } from '../../../users/interfaces/user.interface';
import { LoaderComponent } from '../../../common/components/loader/loader.component';
import { PaginationComponentComponent } from '../../../common/components/pagination-component/pagination-component.component';
import { PaginationService } from '../../../common/components/pagination-component/pagination.service';

@Component({
  selector: 'app-clients-page',
  imports: [ClientTableComponent, TitleComponent, CreateBtnComponent, CreateBtnComponent, ReactiveFormsModule, ClientModalUserComponent,LoaderComponent, PaginationComponentComponent],
  templateUrl: './clients-page.component.html',
})
export class ClientsPageComponent {
  clientsService = inject(ClientsService);
  page = inject(PaginationService).pageInUrl;

  clients = signal<Client[] | null >(null);
  getAllResponse = signal<GetAllResponse<Client> | null>(null);
  usersAndClient = signal<UsersAndClient | null>(null);
  loading = signal<boolean>(false);

  loadClients = effect((onCleanup)=> {
    this.clients.set(null);
    this.getAllResponse.set(null);
    const requestClients = this.getClients((this.page() - 1) * 5);

    onCleanup(()=> {
      if(requestClients)
      requestClients.unsubscribe();
    })
  })

  getClients(offset: number){
    return this.clientsService.getClients({offset}).subscribe( data =>{
      this.clients.set(data?.data ?? []);
      this.getAllResponse.set(data);
    })
  }

  handleClientDeleted(id: string){
    //Actualizar el estado del id recibido
    this.clients.update(clients => {
      if(!this.clients()) return null;

      return clients!.map(client => client.id === id ? ({...client, active: (client.active)? false: true}): client)
    });
  }

  //Evento que controla cuando un hijo emite un valor UserAndClient y se asigna a la propiedad que toma el modal.
  handleUsersClicked(usersWithClient: UsersAndClient){
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
