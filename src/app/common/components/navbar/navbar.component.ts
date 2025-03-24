import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { UserSession } from '../../../auth/interfaces/user-session.interface';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  authService = inject(AuthService);
  user = computed(() => this.authService.getUserLogged);

  logout() {
    this.authService.logout();
  }
}
