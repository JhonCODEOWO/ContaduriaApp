import { Component, computed, effect, inject, input } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Payment } from '../../interfaces/payment.interface';
import { isUUIDValidator } from '../../../common/validators/uuid.validator';
import { SelectData } from '../../../common/components/select/interfaces/select-data.interface';
import { InputFieldComponent } from "../../../common/components/input-field/input-field.component";
import { TextareaInputComponent } from "../../../common/components/forms/textarea-input/textarea-input.component";
import { SelectComponent } from "../../../common/components/select/select.component";
import { ClientsService } from '../../../clients/services/clients.service';
import { PaymentsService } from '../../payments.service';

@Component({
  selector: 'payment-form',
  imports: [ReactiveFormsModule, InputFieldComponent, TextareaInputComponent, SelectComponent],
  templateUrl: './payment-form.component.html',
})
export class PaymentFormComponent {
  clientPreselected = input.required<boolean>(); //Mark if the component will be used with a client preselected
  payment = input.required<Payment | null>(); //If payment is null then the form will be act to create a register in other case it will make a update request.
  clients = input.required<SelectData[]>(); //Data to list the select input with clients, if you wanna preselect just one client send a array with that client only
  payments: SelectData[] = [{id: 'débito', optionText: 'Tarjeta de débito'}, {id: 'efectivo', optionText: 'Efectivo'}]; //Values to apply in select element for method

  fb = inject(FormBuilder);
  clientsService = inject(ClientsService);
  paymentService = inject(PaymentsService);

  //Form group data
  paymentForm = this.fb.group({
    payment_concept: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]],
    method: ['', [Validators.required, Validators.maxLength(30)]],
    amount: ['', [Validators.required, Validators.min(1)]],
    details: ['', [Validators.required, Validators.maxLength(1000)]],
    payedBy: ['', [Validators.required, isUUIDValidator]],
  })

  isEditing = computed(() => (this.payment())? true: false) //Checks if the payment is null/undefined or not the functionality is use it to apply functionality based in it

  //If client-preselected is true then payed by got a initial value based in the first element of the array
  manageFormData = effect(() =>{
    if(this.clientPreselected() && !this.payment()) this.paymentForm.controls['payedBy'].setValue(this.clients()[0].id.toString());
  })

  //Load data to the form.
  loadData = effect(()=> {
    this.loadForm();
  })

  //Check it isEditing is true if so then reset the form with the data.
  loadForm(){
    if(this.isEditing())
    // this.paymentForm.reset({amount: this.payment()!.amount.toString(), details: this.payment()?.details, payment_concept: this.payment()?.payment_concept, method: this.payment()?.method});
    this.paymentForm.reset({...this.payment() as any, payedBy: this.payment()?.payedBy.id})
  }

  //Handle event onSubmit from the form
  onSubmit(){
    this.paymentForm.markAllAsTouched();
    console.log(this.paymentForm.value);
    if(this.paymentForm.invalid) return;

    const data: Partial<Payment> = {
      ...(this.paymentForm.value) as any
    }

    if(!this.isEditing()){
      this.paymentService.create(data).subscribe(payment => console.log(payment));
      return;
    }
    this.paymentService.update(this.payment()?.id ?? '', data).subscribe(data => console.log(data));
  }
}
