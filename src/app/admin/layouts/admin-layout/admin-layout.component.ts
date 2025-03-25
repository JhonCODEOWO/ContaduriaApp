import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NavbarAdminComponent } from "../../components/navbar-admin/navbar-admin.component";

@Component({
  selector: 'admin-layout',
  imports: [RouterOutlet, NavbarAdminComponent],
  templateUrl: './admin-layout.component.html',
})
export class AdminLayoutComponent { }
