import { Component, input } from '@angular/core';
import { Client } from '../../interfaces/client.interface';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'client-table',
  imports: [DatePipe],
  templateUrl: './client-table.component.html',
})
export class ClientTableComponent {
  clients = input.required<Client[]>();
}
