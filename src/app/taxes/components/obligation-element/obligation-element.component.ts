import { Component, input } from '@angular/core';
import { TaxObligation } from '../../interfaces/tax-obligation.interface';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'obligation-element',
  imports: [DatePipe, RouterLink],
  templateUrl: './obligation-element.component.html',
})
export class ObligationElementComponent {
  obligation = input.required<TaxObligation>();
}
