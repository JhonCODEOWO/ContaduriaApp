import { Component, input } from '@angular/core';

@Component({
  selector: 'alert-error',
  imports: [],
  templateUrl: './alert-error.component.html',
})
export class AlertErrorComponent {
  text = input.required<string>();
}
