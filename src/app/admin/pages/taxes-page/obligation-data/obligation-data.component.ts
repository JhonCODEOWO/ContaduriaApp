import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaxObligation } from '../../../../taxes/interfaces/tax-obligation.interface';
import { TaxesService } from '../../../../taxes/services/taxes.service';

@Component({
  selector: 'app-obligation-data',
  imports: [],
  templateUrl: './obligation-data.component.html',
})
export class ObligationDataComponent implements OnInit {
  taxesService = inject(TaxesService);
  obligationID = inject(ActivatedRoute).snapshot.paramMap.get('id');

  obligation = signal<TaxObligation | null>(null);

  ngOnInit(): void {
      
  }
}
