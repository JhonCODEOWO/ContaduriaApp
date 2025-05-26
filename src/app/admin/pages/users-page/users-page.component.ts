import { Component, effect, inject, signal } from '@angular/core';
import { TitleComponent } from "../../../common/components/title/title.component";
import { UsersService } from '../../../users/services/user.service';
import { UserResponse } from '../../../users/interfaces/user-response.interface';
import { UsersListComponent } from "../../../users/components/users-list/users-list.component";
import { CreateBtnComponent } from "../../../common/components/crud/create-btn/create-btn.component";
import { LoaderComponent } from '../../../common/components/loader/loader.component';
import { PaginationComponentComponent } from "../../../common/components/pagination-component/pagination-component.component";
import { PaginationService } from '../../../common/components/pagination-component/pagination.service';

@Component({
  selector: 'app-users-page',
  imports: [TitleComponent, UsersListComponent, CreateBtnComponent, LoaderComponent, PaginationComponentComponent],
  templateUrl: './users-page.component.html',
})
export class UsersPageComponent {
  userService = inject(UsersService);
  userResponse = signal<UserResponse | null>(null);
  currentPage = inject(PaginationService);

  loadUsers = effect((onCleanUp)=> {
    this.userResponse.set(null);
    const getUsers = this.getUsers((this.currentPage.pageInUrl() - 1) * 8);

    onCleanUp(()=> {
      getUsers.unsubscribe();
    })
  })

  getUsers(offset: number) {
    return this.userService.getUsers({offset}).subscribe((data)=> {
      this.userResponse.set(data);
    })
  }

  handlePageSelected(page: number) {
    
  }
}
