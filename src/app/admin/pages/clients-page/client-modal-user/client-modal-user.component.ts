import {
  Component,
  effect,
  ElementRef,
  inject,
  input,
  output,
  viewChild,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersAndClient } from '../../../../clients/components/client-table/client-table.component';
import {
  ClientsService,
  ClientWithUserBody,
} from '../../../../clients/services/clients.service';
import { AlertErrorComponent } from '../../../../common/components/alert-error/alert-error.component';
import { FormUtils } from '../../../../utils/form-utils';
import { Client } from '../../../../clients/interfaces/client.interface';
import { User } from '../../../../users/interfaces/user.interface';

export type ClientUserRelationDone = {
  user: User | undefined;
  clientID: string;
};

@Component({
  selector: 'client-modal-user',
  imports: [ReactiveFormsModule, AlertErrorComponent],
  templateUrl: './client-modal-user.component.html',
})
export class ClientModalUserComponent {
  formUtils = FormUtils;

  //Input de los datos requeridos
  usersAndClient = input.required<UsersAndClient | null>();

  //Referencia local hacia modalUsers
  modalUsers = viewChild<ElementRef>('modalUsers');

  //Inyecciones
  fb = inject(FormBuilder);
  clientsService = inject(ClientsService);

  //Emits
  onClientAffected = output<ClientUserRelationDone>(); //ID of the client affected

  //Formulario
  userToClientForm = this.fb.group({
    clientID: ['', [Validators.required]],
    userID: ['', [Validators.required]],
  });

  //Efecto que toma lugar cuando userAndClient obtiene cambios.
  waitChanges = effect(() => {
    if (this.usersAndClient()) {
      this.modalUsers()?.nativeElement.showModal();
      this.loadForm(this.usersAndClient()!.client);
    }
  });

  //Método que carga valores a el formulario.
  loadForm(id: string) {
    this.userToClientForm.reset({ clientID: id });
  }

  //Evento que toma lugar al intentar hacer submit
  onSubmit() {
    if (this.userToClientForm.invalid) {
      console.log('Invalido');
      return;
    }

    const data: ClientWithUserBody = {
      ...(this.userToClientForm.value as any),
    };

    this.clientsService.assignUser(data).subscribe((client) => {
      if (!client) {
        this.userToClientForm.setErrors({ exception: true });
        return;
      }

      //Emitir id afectado del cliente al padre y cerrar modal
      const user = this.findUser(
        this.usersAndClient()?.users ?? [],
        this.userToClientForm.value.userID ?? ''
      ); //Tomar el usuario asignado
      this.onClientAffected.emit({
        user,
        clientID: this.userToClientForm.value.clientID ?? '',
      }); //Emitir el valor
      this.onCloseModal();
    });
  }

  onCloseModal() {
    this.modalUsers()?.nativeElement.close();
  }

  findUser(users: User[], id: string) {
    return this.usersAndClient()?.users.find((user) => user.id === id);
  }
}
