import { Component, effect, inject, signal } from '@angular/core';
import { PaymentFormComponent } from '../../../../../payments/components/payment-form/payment-form.component';
import { UsersService } from '../../../../../users/services/user.service';
import { SelectData } from '../../../../../common/components/select/interfaces/select-data.interface';
import { LoaderComponent } from '../../../../../common/components/loader/loader.component';
import { ClientsService } from '../../../../../clients/services/clients.service';
import { AuthService } from '../../../../../auth/services/auth.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Payment } from '../../../../../payments/interfaces/payment.interface';
import { PaymentsService } from '../../../../../payments/payments.service';

@Component({
  selector: 'app-client-payment-resource',
  imports: [PaymentFormComponent, LoaderComponent],
  templateUrl: './client-payment-resource.component.html',
})
export class ClientPaymentResourceComponent {
  authService = inject(AuthService);
  user = this.authService.getUserLogged;
  isAdmin = this.authService.isAdmin();
  clientService = inject(ClientsService);
  paymentService = inject(PaymentsService);
  payment = signal<Payment | null>(null);

  clientsData = signal<SelectData[] | null>(null);

  clientID = inject(ActivatedRoute).snapshot.paramMap.get('idClient');
  paymentID = inject(ActivatedRoute).snapshot.paramMap.get('idPayment');

  loadClient = effect(cleanup => {
    this.clientService.getClient(this.clientID ?? '').subscribe(client => this.clientsData.set([{id: client.id, optionText: client.fullName}]))
  })

  loadUser = effect(cleanup => {
    if(this.paymentID !== 'new') this.paymentService.get(this.paymentID ?? '').subscribe(payment => this.payment.set(payment))
  })

//   loadClients = effect((cleanup) => {
//     let clientSub: Subscription | null = null;
//     if (!this.isAdmin)
//       this.clientService
//         .getClientsAssignedToUser(this.user!.id)
//         .subscribe((clients) =>
//           this.clientsData.set(
//             clients.clientAssigned.map((clientAssigned) => ({
//               id: clientAssigned.client.id,
//               optionText: clientAssigned.client.fullName,
//             }))
//           )
//         );

//     clientSub = this.clientService.getClients().subscribe(clients => this.clientsData.set(this.toSelectData(clients, c => c.id, c => c.fullName)))

//     cleanup(() => {
//       clientSub.unsubscribe();
//     });
//   });

//   toSelectData<T>(
//   array: T[],
//   getId: (item: T) => string,
//   getText: (item: T) => string
// ): SelectData[] {
//   return array.map(item => ({
//     id: getId(item),
//     optionText: getText(item)
//   }));
// }

}
