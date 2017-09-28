import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';

import { User, Role } from '../auth';


@Injectable()
export class UsersService {
  constructor(private db: AngularFireDatabase) {}

  getUsers(): Observable<User[]> {
    return this.db.list('/users')
      .map(users => users.map(user => new User(user)));
  }

  assignRole(user: User, role: Role) {
    this.db.object(`/users/${user.id}/roles/${role.id}`).set(true);
  }

  revokeRole(user: User, role: Role) {
    this.db.object(`/users/${user.id}/roles/${role.id}`).set(null);
  }
}
