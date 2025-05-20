import { Component, input, OnInit } from '@angular/core';

export interface ToastData {
  styleClass: StylesToast,
  txtToast: string
}

export enum StylesToast {
  'ERROR' = 'toast-error', 
  'SUCCESSFUL' = 'toast-successful', 
}

@Component({
  selector: 'app-toast',
  imports: [],
  templateUrl: './toast-component.component.html',
})
export class ToastComponent implements OnInit{
  styleToast = input.required<StylesToast>()
  txtToast = input.required<string>()


  ngOnInit(): void {
      
  }
}
