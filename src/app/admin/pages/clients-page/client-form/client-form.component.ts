import { Component, computed, inject, input, OnInit, output, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputFieldComponent } from "../../../../common/components/input-field/input-field.component";
import { FormUtils } from '../../../../utils/form-utils';
import { ClientsService } from '../../../../clients/services/clients.service';
import { Client } from '../../../../clients/interfaces/client.interface';
import { TitleComponent } from '../../../../common/components/title/title.component';

@Component({
  selector: 'client-form',
  imports: [ReactiveFormsModule, InputFieldComponent, TitleComponent],
  templateUrl: './client-form.component.html',
})
export class ClientFormComponent implements OnInit{
  fb = inject(FormBuilder);
  clientService = inject(ClientsService);
  client = input.required<Client>();
  isEditing = computed(() => {
    return this.client().id !== 'new' ? true : false;
  });

  newDataClient = output<Client>();

  clientForm = this.fb.group({
    fullName: ['', [Validators.required, Validators.maxLength(150), Validators.minLength(1), Validators.pattern(FormUtils.namePattern)]],
    sat_password: ['', [Validators.required, Validators.maxLength(15), Validators.minLength(8)]],
    rfc: ['', [Validators.required, Validators.maxLength(13), Validators.minLength(12)]],
    phoneNumber: ['', [Validators.required, Validators.maxLength(15), Validators.minLength(10)]],
  });

  ngOnInit(): void {
      this.loadForm();
  }

  loadForm(){
    this.clientForm.reset({...this.client()});
  }

  onClientSubmit() {
    const invalid = this.clientForm.invalid;
    this.clientForm.markAllAsTouched();
    if(invalid) return;
    const data = this.clientForm.value;
    const newClient: Partial<Client> = {
      ...(data as any)
    }
    

    if (this.client().id === 'new') {
      this.clientService.createClient(newClient).subscribe(client => {
        this.newDataClient.emit(client);
      });
    }else{
      this.clientService.updateClient(newClient, this.client().id).subscribe(client => {
        this.newDataClient.emit(client);
      });
    }
  }
}
