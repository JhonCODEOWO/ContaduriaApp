import { Pipe, type PipeTransform } from '@angular/core';
import { last } from 'rxjs';

@Pipe({
  name: 'PhoneNumber',
})
export class PhoneNumberPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    if(value.length === 10) return  this.formatNumber(value);

    const internationalCode = value.slice(0, 3); // International code
    const number = value.slice(3) //Número local

    

    return `${internationalCode} ${this.formatNumber(number)}`;
  }

  formatNumber(number: string){
    //Trabajar con las partes del número.
    const lada = number.slice(0, 3);
    const first = number.slice(3, 6);
    const last = number.slice(6);

    return `(${lada}) ${first}-${last}`;
  }

}
