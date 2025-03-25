import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'employees-nav',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav-employees.component.html',
})
export class NavEmployeesComponent { }
