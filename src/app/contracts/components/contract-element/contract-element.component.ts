import { Component, input, output } from '@angular/core';
import { Contract } from '../../interfaces/contract.interface';
import { RouterLink } from '@angular/router';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'contract-element',
  imports: [RouterLink, CurrencyPipe, DatePipe],
  templateUrl: './contract-element.component.html',
})
export class ContractElementComponent {
  contract = input.required<Contract>();

  delete = output<Contract>();

  onDeleteClick(contract: Contract){
    this.delete.emit(contract);
  }
}
