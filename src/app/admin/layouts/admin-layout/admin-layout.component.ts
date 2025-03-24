import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'admin-layout',
  imports: [RouterLink, RouterOutlet],
  templateUrl: './admin-layout.component.html',
})
export class AdminLayoutComponent { }
