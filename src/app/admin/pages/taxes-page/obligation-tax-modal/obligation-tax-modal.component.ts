import { Component, inject, input, OnDestroy, OnInit, output, signal } from '@angular/core';
import { TaxesService } from '../../../../taxes/services/taxes.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaxRegime } from '../../../../taxes/interfaces/tax-regime.interface';

export interface RegimeAffected {
  regime: TaxRegime | null;
  success: boolean,
}

@Component({
  selector: 'obligation-tax-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './obligation-tax-modal.component.html',
})
export class ObligationTaxModalComponent implements OnDestroy, OnInit{
  onAssigned = output<RegimeAffected>(); //Evento a emitir cuando se realiza la asignación.
  taxService = inject(TaxesService);
  fb = inject(FormBuilder);

  obligations = input.required<string[]>();
  regimes = signal<TaxRegime[] | null>(null);

  regimeForm = this.fb.group({
    regimeId: ['', [Validators.required]],
  })

  ngOnInit(): void {
      this.taxService.getTaxRegimes().subscribe(regimes => this.regimes.set(regimes));
  }

  ngOnDestroy(): void {
      console.log('Modal destruido');
  }

  onSubmit(){
    this.regimeForm.markAllAsTouched();
    if(this.regimeForm.invalid) return;

    //Realizar peticiones
    this.taxService.massiveAssignationObligationToRegime(this.regimeForm.controls.regimeId.value ?? '', this.obligations()).subscribe(data => {
      //Validar que no tenga un valor booleano
      if(typeof data !== 'boolean'){
        //Recoge cualquier dato de la petición, pues todos contendran el mismo regime.
        const regime = data[0];
        this.onAssigned.emit({regime: regime ?? null, success: true});
      };
    })
  }
}
