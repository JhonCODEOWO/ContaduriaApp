import { Component, input } from '@angular/core';

@Component({
  selector: 'app-collapse',
  imports: [],
  templateUrl: './collapse.component.html',
})
export class CollapseComponent {
  tittle = input.required<string>();
  details = input.required<string>();
}
