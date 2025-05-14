import { Component, input, OnInit, output } from '@angular/core';
import { SelectData } from './interfaces/select-data.interface';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';

@Component({
  selector: 'app-select',
  imports: [ReactiveFormsModule],
  templateUrl: './select.component.html',
})
export class SelectComponent implements OnInit{
  formUtils = FormUtils;
  id = input.required<string>();
  values = input.required<SelectData[]>();
  lblText = input.required<string>();
  fb = input.required<FormGroup>();
  valueSelected = output<string>();

  ngOnInit(): void {
      this.fb().get(this.id())?.valueChanges.subscribe({
        next: (elementId) => this.valueSelected.emit(elementId)
      });
  }
}
