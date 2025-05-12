import { Component, input } from '@angular/core';

@Component({
  selector: 'app-loader',
  imports: [],
  templateUrl: './loader.component.html',
})
export class LoaderComponent {
  textContent = input<string>('Cargando...');
}
