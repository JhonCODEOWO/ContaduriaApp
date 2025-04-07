import { Component, computed, inject, input, output } from '@angular/core';
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
  changed = output<User>(); //Property to emit a user element with new values.

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
      this.user().active = false; 
      this.changed.emit(this.user());
    });
  }

  onEnable(id: string){
    this.userService.enableUser(id).subscribe(result => {
      this.user().active = true; 
      this.changed.emit(this.user());
    })
  }
}
