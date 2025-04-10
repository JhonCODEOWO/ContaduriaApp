import { Component, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormUtils } from '../../../../utils/form-utils';

@Component({
  selector: 'app-textarea-input',
  imports: [ReactiveFormsModule],
  templateUrl: './textarea-input.component.html',
})
export class TextareaInputComponent {
  id = input.required<string>();
  placeholder = input('');
  formGroup = input.required<FormGroup>();
  lblText = input.required<string>();

  formUtils = FormUtils;
}
