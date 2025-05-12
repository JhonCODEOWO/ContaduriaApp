import { Component, input } from '@angular/core';
import { SelectData } from './interfaces/select-data.interface';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';

@Component({
  selector: 'app-select',
  imports: [ReactiveFormsModule],
  templateUrl: './select.component.html',
})
export class SelectComponent {
  formUtils = FormUtils;
  id = input.required<string>();
  values = input.required<SelectData[]>();
  lblText = input.required<string>();
  fb = input.required<FormGroup>();
}
