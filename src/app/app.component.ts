import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./common/components/navbar/navbar.component";
import { ToastService } from './common/components/toast-component/service/toast.service';
import { ToastComponent } from './common/components/toast-component/toast.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, ToastComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ContaduriaApp';
  toastService = inject(ToastService);
}
