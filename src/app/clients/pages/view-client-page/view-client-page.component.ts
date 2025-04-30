import { Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { ClientsService } from '../../services/clients.service';
import { Client } from '../../interfaces/client.interface';
import { TitleComponent } from "../../../common/components/title/title.component";
import { DatePipe } from '@angular/common';
import { PhoneNumberPipe } from '../../../common/pipes/phone-number.pipe';

@Component({
  selector: 'app-view-client-page',
  imports: [TitleComponent, DatePipe, PhoneNumberPipe],
  templateUrl: './view-client-page.component.html',
})
export class ViewClientPageComponent {
  clientsService = inject(ClientsService);
  id = toSignal(inject(ActivatedRoute).paramMap.pipe(
    map(params => params.get('id'))
  ));
  router = inject(Router);

  client = signal<Client | null>(null);

  loadClient = effect((onCleanup) => {
    const sub = this.clientsService.getClient(this.id() ?? '').subscribe(client=> {
      this.client.set(client);
    })

    onCleanup(()=> {
      sub.unsubscribe();
    })
  })

  //Efecto que se dispara para verificar si un cliente está o no activo y redireccionar a otro apartado al usuario.
  verifyActive = effect(()=> {
    if(this.client() && !this.client()?.active) this.router.navigate(['']);
  })
}
