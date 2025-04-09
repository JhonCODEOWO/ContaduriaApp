import { Component, computed, inject, input, output } from '@angular/core';
import { Client } from '../../interfaces/client.interface';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ClientsService } from '../../services/clients.service';
import { User } from '../../../users/interfaces/user.interface';
import { UsersService } from '../../../users/services/user.service';
import { UserResponse } from '../../../users/interfaces/user-response.interface';

export interface UsersAndClient {
  users: User[];
  client: string;
}

@Component({
  selector: 'client-table',
  imports: [DatePipe, RouterLink],
  templateUrl: './client-table.component.html',
})
export class ClientTableComponent {
  clients = input.required<Client[]>();

  clientService = inject(ClientsService);
  userService = inject(UsersService);

  onClientDeleted = output<string>();
  onUserClick = output<UsersAndClient>();

  onClickDelete(id: string){
    this.clientService.disableClient(id).subscribe(response => {
      this.onClientDeleted.emit(id);
    });
  }

  onUsersClick(id: string){
    this.userService.getUsers().subscribe(userResponse => {
      this.onUserClick.emit({users: userResponse?.data ?? [], client: id})
    })
  }
}
