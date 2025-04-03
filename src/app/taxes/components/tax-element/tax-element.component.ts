import { Component, input } from '@angular/core';
import { TaxRegime } from '../../interfaces/tax-regime.interface';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'tax-element',
  imports: [DatePipe],
  templateUrl: './tax-element.component.html',
})
export class TaxElementComponent {
  tax = input.required<TaxRegime>();
}
