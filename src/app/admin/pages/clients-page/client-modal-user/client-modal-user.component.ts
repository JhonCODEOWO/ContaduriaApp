import { Component, effect, ElementRef, inject, input, viewChild } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersAndClient } from '../../../../clients/components/client-table/client-table.component';
import { ClientsService, ClientWithUserBody } from '../../../../clients/services/clients.service';
import { AlertErrorComponent } from "../../../../common/components/alert-error/alert-error.component";
import { FormUtils } from '../../../../utils/form-utils';

@Component({
  selector: 'client-modal-user',
  imports: [ReactiveFormsModule, AlertErrorComponent],
  templateUrl: './client-modal-user.component.html',
})
export class ClientModalUserComponent {
  formUtils = FormUtils;
  usersAndClient = input.required<UsersAndClient | null>();

  modalUsers = viewChild<ElementRef>('modalUsers');

  fb = inject(FormBuilder);
  clientsService = inject(ClientsService);

  userToClientForm = this.fb.group({
    clientID: ['', [Validators.required]],
    userID: ['', [Validators.required]]
  });
  
  waitChanges = effect(() => {
    if(this.usersAndClient()) {
      this.modalUsers()?.nativeElement.showModal();
      this.loadForm(this.usersAndClient()!.client);
    }
  })

  loadForm(id: string){
    this.userToClientForm.reset({clientID: id})
  }

  onSubmit(){
    console.log(this.userToClientForm.value);
    if(this.userToClientForm.invalid){
      console.log('Invalido');
      return;
    };
    const data: ClientWithUserBody = {
      ...(this.userToClientForm.value as any)
    };

    this.clientsService.assignUser(data).subscribe(client => {
      if(!client) {
        this.userToClientForm.setErrors({'exception': true});
        return;
      }

      this.onCloseModal();
    });
  }

  onCloseModal(){
    this.modalUsers()?.nativeElement.close();
  }
}
