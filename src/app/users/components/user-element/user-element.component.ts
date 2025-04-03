import { Component, input } from '@angular/core';
import { User } from '../../interfaces/user.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'user-element',
  imports: [RouterLink],
  templateUrl: './user-element.component.html',
})
export class UserElementComponent {
  user = input.required<User>();
}
