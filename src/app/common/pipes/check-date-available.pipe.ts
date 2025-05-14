import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'CheckDateAvailable',
})
export class CheckDateAvailablePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    const now = new Date();
    const dateCheck = new Date(value);

    if(dateCheck < now) return 'Ya ha expirado'
    if(dateCheck === now) return 'Se debe realizar hoy mismo'
    return 'En espera de ser realizada';
  }

}
