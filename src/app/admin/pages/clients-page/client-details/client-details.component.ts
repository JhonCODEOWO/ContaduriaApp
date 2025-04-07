import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { ClientFormComponent } from "../client-form/client-form.component";
import { ClientsService } from '../../../../clients/services/clients.service';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { Client } from '../../../../clients/interfaces/client.interface';

@Component({
  selector: 'app-client-details',
  imports: [ClientFormComponent],
  templateUrl: './client-details.component.html',
})
export class ClientDetailsComponent implements OnInit{
  clientService = inject(ClientsService);
  activatedRoute = inject(ActivatedRoute);
  client = signal<Client | null>(null);
  router = inject(Router);

  params = toSignal(this.activatedRoute.paramMap.pipe(map(paramMap => paramMap.get('id'))));

  ngOnInit(): void {
    this.clientService.getClient(this.params() ?? '').subscribe(client => {
      this.client.set(client);
    });
  }

  dataClientChanged(event: Client){
    this.router.navigateByUrl('/admin/clients');
  }
}
