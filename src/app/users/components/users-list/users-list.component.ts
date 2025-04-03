import { Component, input } from '@angular/core';
import { User } from '../../interfaces/user.interface';
import { UserElementComponent } from '../user-element/user-element.component';

@Component({
  selector: 'users-list',
  imports: [UserElementComponent],
  templateUrl: './users-list.component.html',
})
export class UsersListComponent {
  users = input.required<User[]>()
}
