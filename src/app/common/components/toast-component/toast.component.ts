import {
  AfterViewInit,
  Component,
  computed,
  effect,
  ElementRef,
  input,
  OnInit,
  output,
  signal,
  viewChild,
  ViewChild,
  ViewChildren,
} from '@angular/core';

export interface ToastData {
  styleClass: StylesToast;
  txtToast: string;
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
export class ToastComponent implements OnInit, AfterViewInit {
  closeToastIndex = output<number>();

  styleToast = input.required<StylesToast>();
  txtToast = input.required<string>();
  index = input.required<number>();
  heighToast = signal<number>(0); //Property to apply class bottom to each component
  multiplier = input<number>(0);

  bottomApplied = signal<number>(0);

  toast = viewChild<ElementRef<HTMLDivElement>>('toast');

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.heighToast.set(this.toast()?.nativeElement.clientHeight ?? 0); //Get height

    let bottomToApply = this.heighToast() * this.multiplier();
    this.bottomApplied.set(bottomToApply);
  }

  defineMargin(actualBottom: number){
    if(this.multiplier() === 0) return actualBottom + 5;
    return Math.round(actualBottom/6);
  }

  onCloseClick(index: number){
    this.closeToastIndex.emit(index);
  }
}
