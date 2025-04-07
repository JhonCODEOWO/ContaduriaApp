import { Component, inject, input, output } from '@angular/core';
import { Client } from '../../interfaces/client.interface';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ClientsService } from '../../services/clients.service';

@Component({
  selector: 'client-table',
  imports: [DatePipe, RouterLink],
  templateUrl: './client-table.component.html',
})
export class ClientTableComponent {
  clients = input.required<Client[]>();
  clientService = inject(ClientsService);
  onClientDelete = output<string>();

  onClickDelete(id: string){
    this.clientService.disableClient(id).subscribe(response => {
      this.onClientDelete.emit(id);
    });
  }
}
