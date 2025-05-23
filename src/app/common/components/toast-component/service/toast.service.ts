import { Injectable, signal } from '@angular/core';
import { ToastData } from '../toast.component';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toast = signal<ToastData[] | null>(null);

  saveToast(data: ToastData){
    this.toast.update(toasts => [...toasts ?? [], data]);
  }

  deleteToast(index: number){
    this.toast.update(toasts => {
      if(!toasts) return null;

      toasts.splice(index, 1)
      return toasts;
    });
  }

  deleteAllToasts(){
    
  }

  get getToast(){
    if(this.toast()) return this.toast();
    return null;
  }

  get hasToast(){
    return (this.toast())? true: false;
  }
}
