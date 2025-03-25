import { Component, effect } from '@angular/core';
import { NavEmployeesComponent } from "../../components/nav-employees/nav-employees.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'employees-layout',
  imports: [NavEmployeesComponent, RouterOutlet],
  templateUrl: './employees-layout.component.html',
})
export class EmployeesLayoutComponent {
  setOverflow = effect((onCleanup) => {
    document.body.style.overflow = 'hidden';

    onCleanup(()=> {
      document.body.style.overflow = 'auto';
    })
  })
}
