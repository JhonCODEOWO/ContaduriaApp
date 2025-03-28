import { Component, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';

@Component({
  selector: 'app-input-field',
  imports: [ReactiveFormsModule],
  templateUrl: './input-field.component.html',
})
export class InputFieldComponent {
  formUtils = FormUtils;
  type = input.required<'text' | 'email' | 'number' | 'password'>();
  id = input.required<string>();
  lblText = input.required<string>();
  placeholder = input('');
  formGroup = input.required<FormGroup>();
}
