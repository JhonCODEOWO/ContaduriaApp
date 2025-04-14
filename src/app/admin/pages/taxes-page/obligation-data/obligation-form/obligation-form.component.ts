import { Component, inject, input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputFieldComponent } from "../../../../../common/components/input-field/input-field.component";
import { TextareaInputComponent } from "../../../../../common/components/forms/textarea-input/textarea-input.component";
import { TaxObligation } from '../../../../../taxes/interfaces/tax-obligation.interface';
import { TaxesService } from '../../../../../taxes/services/taxes.service';

@Component({
  selector: 'obligation-form',
  imports: [ReactiveFormsModule, InputFieldComponent, TextareaInputComponent],
  templateUrl: './obligation-form.component.html',
})
export class ObligationFormComponent implements OnInit{
  obligation = input.required<TaxObligation>();

  fb = inject(FormBuilder);
  taxesService = inject(TaxesService);

  obligationForm = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(150)]],
    description: ['', [Validators.required, Validators.minLength(5)]],
  })

  ngOnInit(): void {
      this.obligationForm.reset(this.obligation())
  }

  onSubmit(){
    this.obligationForm.markAllAsTouched();
    if(this.obligationForm.invalid) return;

    const obligation: Partial<TaxObligation> = {
      ...(this.obligationForm.value as any)
    }

    if(this.obligation().id === 'new') {
      this.taxesService.createObligation(obligation).subscribe(obligationCreated => {
        console.log('Creado');
      });
    } else {
      this.taxesService.updateObligation(this.obligation().id, obligation).subscribe(obligation => {

      });
    }

    return;
  }
}
