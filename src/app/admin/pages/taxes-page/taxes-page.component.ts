import { Component, effect, inject, signal } from '@angular/core';
import { TitleComponent } from "../../../common/components/title/title.component";
import { TaxRegime } from '../../../taxes/interfaces/tax-regime.interface';
import { TaxObligation } from '../../../taxes/interfaces/tax-obligation.interface';
import { TaxesService } from '../../../taxes/services/taxes.service';
import { TaxElementComponent } from '../../../taxes/components/tax-element/tax-element.component';
import { ObligationElementComponent } from '../../../taxes/components/obligation-element/obligation-element.component';
import { CreateBtnComponent } from "../../../common/components/crud/create-btn/create-btn.component";
import { ObligationTaxModalComponent } from "./obligation-tax-modal/obligation-tax-modal.component";

@Component({
  selector: 'admin-taxes-page',
  imports: [TaxElementComponent, ObligationElementComponent, TitleComponent, CreateBtnComponent, ObligationTaxModalComponent],
  templateUrl: './taxes-page.component.html',
})
export class TaxesPageComponent {
  resetCheck = signal(false);

  taxesService = inject(TaxesService);
  taxesRegimes = signal<TaxRegime[]>([]);
  taxesObligations = signal<TaxObligation[]>([]);

  obligationsToRelate = signal<string[]>([]);
  
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

  checkedObligation(event: string){
    this.resetCheck.set(false);
    this.obligationsToRelate.update(values => [...values, event]);
    console.log(this.obligationsToRelate());
  }

  rejectedObligation(event: string){
    const index = this.obligationsToRelate().findIndex(element => element === event);
    this.obligationsToRelate().splice(index, 1);
    console.log(this.obligationsToRelate());
  }

  //Method to check the result of modal submit
  relationeIsDone(state: boolean){
    if(state) this.obligationsToRelate.set([]);
    this.resetCheck.set(true);
  }
}
