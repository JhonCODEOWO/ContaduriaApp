import { Component, effect, inject, signal } from '@angular/core';
import { TitleComponent } from "../../../common/components/title/title.component";
import { UsersService } from '../../../users/services/user.service';
import { UserResponse } from '../../../users/interfaces/user-response.interface';
import { UsersListComponent } from "../../../users/components/users-list/users-list.component";
import { CreateBtnComponent } from "../../../common/components/crud/create-btn/create-btn.component";
import { LoaderComponent } from '../../../common/components/loader/loader.component';

@Component({
  selector: 'app-users-page',
  imports: [TitleComponent, UsersListComponent, CreateBtnComponent, LoaderComponent],
  templateUrl: './users-page.component.html',
})
export class UsersPageComponent {
  userService = inject(UsersService);
  userResponse = signal<UserResponse | null>(null);

  loadUsers = effect((onCleanUp)=> {
    const getUsers = this.getUsers();

    onCleanUp(()=> {
      getUsers.unsubscribe();
    })
  })

  getUsers() {
    return this.userService.getUsers().subscribe((data)=> {
      this.userResponse.set(data);
    })
  }
}
