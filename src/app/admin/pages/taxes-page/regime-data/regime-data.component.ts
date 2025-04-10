import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaxesService } from '../../../../taxes/services/taxes.service';
import { TaxRegime } from '../../../../taxes/interfaces/tax-regime.interface';
import { RegimeFormComponent } from "./regime-form/regime-form.component";

@Component({
  selector: 'app-regime-data',
  imports: [RegimeFormComponent],
  templateUrl: './regime-data.component.html',
})
export class RegimeDataComponent implements OnInit {
  taxesService = inject(TaxesService);
  regimeID = inject(ActivatedRoute).snapshot.paramMap.get('id');

  regime = signal<TaxRegime | null>(null);

  ngOnInit(): void {
      this.taxesService.getRegime(this.regimeID ?? '').subscribe(regime => {
        this.regime.set(regime);
      });
  }
}
