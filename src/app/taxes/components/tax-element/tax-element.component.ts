import { Component, input } from '@angular/core';
import { TaxRegime } from '../../interfaces/tax-regime.interface';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'tax-element',
  imports: [DatePipe, RouterLink],
  templateUrl: './tax-element.component.html',
})
export class TaxElementComponent {
  tax = input.required<TaxRegime>();
}
