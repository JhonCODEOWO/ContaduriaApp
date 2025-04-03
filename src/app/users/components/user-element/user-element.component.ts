import { Component, input } from '@angular/core';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'user-element',
  imports: [],
  templateUrl: './user-element.component.html',
})
export class UserElementComponent {
  user = input.required<User>();
}
