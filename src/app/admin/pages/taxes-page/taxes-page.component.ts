import { Component, effect, inject, signal } from '@angular/core';
import { TitleComponent } from "../../../common/components/title/title.component";
import { TaxRegime } from '../../../taxes/interfaces/tax-regime.interface';
import { TaxObligation } from '../../../taxes/interfaces/tax-obligation.interface';
import { TaxesService } from '../../../taxes/services/taxes.service';

@Component({
  selector: 'admin-taxes-page',
  imports: [],
  templateUrl: './taxes-page.component.html',
})
export class TaxesPageComponent {
  taxesService = inject(TaxesService);
  taxesRegimes = signal<TaxRegime[]>([]);
  
  loadRegimesTaxes = effect((onCleanup)=> {
    const taxesReg = this.getTaxesRegimes();

    onCleanup(()=> {
      taxesReg.unsubscribe();
    })
  })

  getTaxesRegimes(){
    return this.taxesService.getTaxRegimes().subscribe( data => {
      this.taxesRegimes.set(data);
    });
  }
}
