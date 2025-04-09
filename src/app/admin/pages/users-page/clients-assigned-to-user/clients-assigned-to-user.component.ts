import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../../../users/services/user.service';
import { ClientsService } from '../../../../clients/services/clients.service';
import { ClientRelated } from '../../../../clients/interfaces/client-assigned.interface';
import { TitleComponent } from "../../../../common/components/title/title.component";
import { DatePipe } from '@angular/common';
import { User } from '../../../../users/interfaces/user.interface';
import { Client } from '../../../../clients/interfaces/client.interface';

@Component({
  selector: 'app-clients-assigned-to-user',
  imports: [TitleComponent, DatePipe],
  templateUrl: './clients-assigned-to-user.component.html',
})
export class ClientsAssignedToUserComponent implements OnInit{

  clientsService = inject(ClientsService);

  userID = inject(ActivatedRoute).snapshot.paramMap.get('id') ?? '';

  clientsRelated = signal<ClientRelated[]>([]);
  userOwner = signal<User | null>(null);
  isLoading = signal(false);

  ngOnInit(): void {
      this.isLoading.set(true);
      this.clientsService.getClientsAssignedToUser(this.userID).subscribe(response => {
        this.clientsRelated.set(response.clientAssigned);
        this.userOwner.set(response.user);
        this.isLoading.set(false);
      });
  }

  onUnlinkClick(id: string, idRelation: string){
    this.clientsService.unlinkClientFromUser(id, this.userID).subscribe(response => {
      if(response) {
        const index = this.clientsRelated().findIndex( relation => relation.id === idRelation);
        this.clientsRelated().splice(index, 1);
      }
    });
  }
}
