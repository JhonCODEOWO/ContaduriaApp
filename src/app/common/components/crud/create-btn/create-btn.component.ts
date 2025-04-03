import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'crud-create-btn',
  imports: [RouterLink],
  templateUrl: './create-btn.component.html',
})
export class CreateBtnComponent {
  link = input.required<string>();
}
