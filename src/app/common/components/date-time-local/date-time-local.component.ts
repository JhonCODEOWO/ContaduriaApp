import { Component, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';

@Component({
  selector: 'app-date-time-local',
  imports: [ReactiveFormsModule],
  templateUrl: './date-time-local.component.html',
})
export class DateTimeLocalComponent {
  formUtils = FormUtils;
  id = input.required<string>();
  lblText = input.required<string>();
  fg = input.required<FormGroup>();
}
