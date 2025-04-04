import { Component, computed, inject, input } from '@angular/core';
import { User } from '../../interfaces/user.interface';
import { RouterLink } from '@angular/router';
import { UsersService } from '../../services/user.service';

@Component({
  selector: 'user-element',
  imports: [RouterLink],
  templateUrl: './user-element.component.html',
})
export class UserElementComponent {
  user = input.required<User>();
  userService = inject(UsersService);

  roles = computed(() => {
    const rolesString = this.user().roles.map(element => element.name);
    return rolesString;
  })

  initials = computed(() => {
    return `${this.user().name[0]}${this.user().lastName[0]}`
  })

  onDelete(){
    
  }

  onDisable(id: string){
    this.userService.disableUser(id).subscribe( result => {
      console.log(result);
    });
  }
}
