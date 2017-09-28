import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { User, Role } from '../auth';
import { UsersService } from './users.service';


@Component({
  templateUrl: 'users.component.html'
})
export class UsersComponent {
  users: Observable<User[]>;
  roles = Role.values.sort((a, b) => a.label.localeCompare(b.label));

  constructor(private usersService: UsersService) {
    this.users = usersService.getUsers().map(users => users.sort((a, b) => a.label.localeCompare(b.label)));
  }

  assignRole(user: User, role: Role) {
    this.usersService.assignRole(user, role);
  }

  revokeRole(user: User, role: Role) {
    this.usersService.revokeRole(user, role);
  }
}
