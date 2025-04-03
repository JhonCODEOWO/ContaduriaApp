import { Component, input } from '@angular/core';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'app-user-page',
  imports: [],
  templateUrl: './user-page.component.html',
})
export class UserPageComponent {
  user = input.required<User>();
}
