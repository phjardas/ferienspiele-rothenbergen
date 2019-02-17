import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute } from '@angular/router';

import { User, Role } from '../auth';
import { UsersService } from './users.service';

@Component({
  templateUrl: 'users.component.html',
})
export class UsersComponent {
  private subscription: Subscription;
  users: User[];
  roles = Role.values.sort((a, b) => a.label.localeCompare(b.label));
  highlightUserId: string;

  constructor(private usersService: UsersService, route: ActivatedRoute) {
    this.subscription = route.paramMap.subscribe(params => (this.highlightUserId = params.get('id')));
    this.subscription.add(
      usersService
        .getUsers()
        //.map(users => users.sort((a, b) => a.label.localeCompare(b.label)))
        .subscribe(users => (this.users = users))
    );
  }

  assignRole(user: User, role: Role) {
    this.usersService.assignRole(user, role);
  }

  revokeRole(user: User, role: Role) {
    this.usersService.revokeRole(user, role);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
