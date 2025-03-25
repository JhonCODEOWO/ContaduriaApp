import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'admin-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar-admin.component.html',
})
export class NavbarAdminComponent { }
