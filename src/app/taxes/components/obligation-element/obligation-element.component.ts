import { Component, effect, ElementRef, input, output, signal, viewChild } from '@angular/core';
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

  onChecked = output<string>();
  onNotChecked = output<string>();

  checked = signal<boolean>(false);
  resetChecked = input<boolean>(false); //Input para ejecutar un efecto si este es true

  initialState = input<'checked' | 'not-checked'>('not-checked');// Initial state optional for each element

  inputCheck = viewChild<ElementRef>('check');

  resetCheck = effect(() => {
    const element = this.inputCheck()?.nativeElement as HTMLInputElement;
    if (this.resetChecked()) {
      this.checked.set(false)
      element.checked = false;
    }
  });

  onCheck(id: string){
    //Si el valor es false se coloca true, caso contrario es falso.
    (!this.checked())? this.checked.set(true) : this.checked.set(false);

    //Emitir el id solo si el check es true
    if(this.checked()){
      this.onChecked.emit(id);
      return;
    }else{
      this.onNotChecked.emit(id);
      return;
    }
  }
}
