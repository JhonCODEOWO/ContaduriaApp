import { Component, effect, inject, signal } from '@angular/core';
import { TitleComponent } from '../../../common/components/title/title.component';
import { TaxRegime } from '../../../taxes/interfaces/tax-regime.interface';
import { TaxObligation } from '../../../taxes/interfaces/tax-obligation.interface';
import { TaxesService } from '../../../taxes/services/taxes.service';
import {
  RegimeObligation,
  TaxElementComponent,
} from '../../../taxes/components/tax-element/tax-element.component';
import { ObligationElementComponent } from '../../../taxes/components/obligation-element/obligation-element.component';
import { CreateBtnComponent } from '../../../common/components/crud/create-btn/create-btn.component';
import {
  ObligationTaxModalComponent,
  RegimeAffected,
} from './obligation-tax-modal/obligation-tax-modal.component';

@Component({
  selector: 'admin-taxes-page',
  imports: [
    TaxElementComponent,
    ObligationElementComponent,
    TitleComponent,
    CreateBtnComponent,
    ObligationTaxModalComponent,
  ],
  templateUrl: './taxes-page.component.html',
})
export class TaxesPageComponent {
  resetCheck = signal(false);

  taxesService = inject(TaxesService);
  taxesRegimes = signal<TaxRegime[]>([]);
  taxesObligations = signal<TaxObligation[]>([]);

  obligationsToRelate = signal<string[]>([]);

  loadRegimesTaxes = effect((onCleanup) => {
    const taxesReg = this.getTaxesRegimes();

    onCleanup(() => {
      taxesReg.unsubscribe();
    });
  });

  loadRegimesObligations = effect((onCleanup) => {
    const taxesReg = this.getTaxesObligations();

    onCleanup(() => {
      taxesReg.unsubscribe();
    });
  });

  getTaxesRegimes() {
    return this.taxesService.getTaxRegimes().subscribe((data) => {
      this.taxesRegimes.set(data);
    });
  }

  getTaxesObligations() {
    return this.taxesService.getTaxObligations().subscribe((data) => {
      this.taxesObligations.set(data);
    });
  }

  //Method to handle checked event from check
  checkedObligation(event: string) {
    this.resetCheck.set(false);
    this.obligationsToRelate.update((values) => [...values, event]);
    console.log(this.obligationsToRelate());
  }

  //Method to handle rejected event from check
  rejectedObligation(event: string) {
    const index = this.obligationsToRelate().findIndex(
      (element) => element === event
    );
    this.obligationsToRelate().splice(index, 1);
    console.log(this.obligationsToRelate());
  }

  //Method to check the result of modal submit
  relationeIsDone(state: RegimeAffected) {
    if (state.success) {
      this.obligationsToRelate.set([]);
      this.resetCheck.set(true);
      this.taxesService.getRegime(state.regime?.id ?? '').subscribe(regime => {
        const index = this.findIndexRegime(this.taxesRegimes(), state.regime?.id ?? '');
        this.taxesRegimes().splice(index, 1, regime);
      })
    }
  }

  //Method to append the event onDeleteObligation
  deleteObligationInRegime(dataAffected: RegimeObligation) {
    //Id de los elementos
    const regimeId = dataAffected.regime.id;
    const obligationId = dataAffected.obligation.id;

    //Find the index of regime to modify
    const index = this.taxesRegimes().findIndex(
      (regime) => regime.id === regimeId
    );
    const regime = this.taxesRegimes()[index]; //Get the regime by index

    //Delete obligation.
    const indexObligation =
      regime.taxObligations?.findIndex(
        (obligation) => obligation.id === obligationId
      ) ?? -1;
    if (indexObligation !== -1) {
      regime.taxObligations?.splice(indexObligation, 1);
    } else {
      console.error('No se pudo eliminar la obligación');
    }
  }


  findIndexRegime(regimes: TaxRegime[], id: string): number {
    return this.taxesRegimes().findIndex(regime => regime.id === id);
  }
}
