import { Component, inject, input, output, signal } from '@angular/core';
import { Client } from '../../interfaces/client.interface';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ClientsService } from '../../services/clients.service';
import { User } from '../../../users/interfaces/user.interface';
import { UsersService } from '../../../users/services/user.service';
import { PhoneNumberPipe } from '../../../common/pipes/phone-number.pipe';
import { AuthService } from '../../../auth/services/auth.service';
import { StylesToast, ToastComponent, ToastData } from "../../../common/components/toast-component/toast.component";
import { ToastService } from '../../../common/components/toast-component/service/toast.service';

export interface UsersAndClient {
  users: User[];
  client: string;
}

@Component({
  selector: 'client-table',
  imports: [DatePipe, RouterLink, PhoneNumberPipe],
  templateUrl: './client-table.component.html',
})
export class ClientTableComponent {
  stylesEnum = StylesToast;
  isAdmin = inject(AuthService).isAdmin();
  clients = input.required<Client[]>();

  clientService = inject(ClientsService);
  userService = inject(UsersService);
  toastService = inject(ToastService);

  onClientDeleted = output<string>();
  onUserClick = output<UsersAndClient>();
  loading = signal(false);

  onClickDelete(id: string){
    this.clientService.disableClient(id).subscribe(response => {
      this.onClientDeleted.emit(id);
    });
  }

  onUsersClick(id: string){
    if(this.loading()) return
    this.loading.set(true);
    // this.toastService.saveToast({styleClass: this.stylesEnum.SUCCESSFUL, txtToast: 'Cargando...'});
    this.userService.getUsers({}).subscribe(userResponse => {
      this.onUserClick.emit({users: userResponse?.data ?? [], client: id})
      this.loading.set(false);
      // this.toastService.deleteToast();
    })
  }
}
