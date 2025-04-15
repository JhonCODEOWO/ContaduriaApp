import { Component, inject, input, OnInit } from '@angular/core';
import { TaxRegime } from '../../../../../taxes/interfaces/tax-regime.interface';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputFieldComponent } from "../../../../../common/components/input-field/input-field.component";
import { TextareaInputComponent } from "../../../../../common/components/forms/textarea-input/textarea-input.component";
import { TaxesService } from '../../../../../taxes/services/taxes.service';

@Component({
  selector: 'regime-form',
  imports: [ReactiveFormsModule, InputFieldComponent, TextareaInputComponent],
  templateUrl: './regime-form.component.html',
})
export class RegimeFormComponent implements OnInit{
  regime = input.required<TaxRegime>();

  taxesService = inject(TaxesService);
  fb = inject(FormBuilder);
  regimeForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(150)]],
    description: ['', [Validators.required, Validators.minLength(15)]]
  })

  ngOnInit(): void {
      this.regimeForm.reset({
        description: this.regime().description,
        name: this.regime().name
      })
  }

  onSubmit(){
    this.regimeForm.markAllAsTouched();
    if(this.regimeForm.invalid) return;

    const data = this.regimeForm.value; //Datos del formulario

    const regime: Partial<TaxRegime> = {
      ...data as any
    }
    
    if(this.regime().id === 'new'){
      this.taxesService.createRegime(regime).subscribe(data => {
        console.log('Creado');
      });
    }else{
      this.taxesService.updateRegime(this.regime().id, regime).subscribe(regime => {
        console.log('Actualizado');
      })
    }

    return;
  }
}
