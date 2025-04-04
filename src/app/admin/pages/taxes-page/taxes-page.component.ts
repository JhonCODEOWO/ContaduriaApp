import { Component, effect, inject, signal } from '@angular/core';
import { TitleComponent } from "../../../common/components/title/title.component";
import { TaxRegime } from '../../../taxes/interfaces/tax-regime.interface';
import { TaxObligation } from '../../../taxes/interfaces/tax-obligation.interface';
import { TaxesService } from '../../../taxes/services/taxes.service';
import { TaxElementComponent } from '../../../taxes/components/tax-element/tax-element.component';
import { ObligationElementComponent } from '../../../taxes/components/obligation-element/obligation-element.component';
import { CreateBtnComponent } from "../../../common/components/crud/create-btn/create-btn.component";

@Component({
  selector: 'admin-taxes-page',
  imports: [TaxElementComponent, ObligationElementComponent, TitleComponent, CreateBtnComponent],
  templateUrl: './taxes-page.component.html',
})
export class TaxesPageComponent {
  taxesService = inject(TaxesService);
  taxesRegimes = signal<TaxRegime[]>([]);
  taxesObligations = signal<TaxObligation[]>([]);
  
  loadRegimesTaxes = effect((onCleanup)=> {
    const taxesReg = this.getTaxesRegimes();

    onCleanup(()=> {
      taxesReg.unsubscribe();
    })
  })

  loadRegimesObligations = effect((onCleanup)=> {
    const taxesReg = this.getTaxesObligations();

    onCleanup(()=> {
      taxesReg.unsubscribe();
    })
  })

  getTaxesRegimes(){
    return this.taxesService.getTaxRegimes().subscribe( data => {
      this.taxesRegimes.set(data);
    });
  }

  getTaxesObligations(){
    return this.taxesService.getTaxObligations().subscribe(data => {
      this.taxesObligations.set(data);
    });
  }
}
