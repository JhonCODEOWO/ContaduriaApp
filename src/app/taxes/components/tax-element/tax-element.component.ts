import { Component, inject, input, output } from '@angular/core';
import { TaxRegime } from '../../interfaces/tax-regime.interface';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TaxObligation } from '../../interfaces/tax-obligation.interface';
import { TaxesService } from '../../services/taxes.service';

export interface RegimeObligation {
  obligation: TaxObligation,
  regime: TaxRegime
}

@Component({
  selector: 'tax-element',
  imports: [DatePipe, RouterLink],
  templateUrl: './tax-element.component.html',
})
export class TaxElementComponent {
  taxService = inject(TaxesService);
  tax = input.required<TaxRegime>();

  onDeleteObligation = output<RegimeObligation>();

  onUnlinkObligation(obligation: TaxObligation, regime: TaxRegime){
    this.taxService.unlinkObligationInRegime(regime.id, obligation.id).subscribe(regimeAffected => {
      this.onDeleteObligation.emit({obligation, regime: regimeAffected});
    });
  }
}
