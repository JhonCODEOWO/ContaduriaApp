import { Component, input } from '@angular/core';
import { TaxObligation } from '../../interfaces/tax-obligation.interface';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'obligation-element',
  imports: [DatePipe],
  templateUrl: './obligation-element.component.html',
})
export class ObligationElementComponent {
  obligation = input.required<TaxObligation>();
}
