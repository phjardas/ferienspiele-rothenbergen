import * as firebase from 'firebase/app';

import { FirebaseModel } from '../model';


export class User implements FirebaseModel {
  public id: string;
  public email: string;
  public displayName: string;
  public registeredAt: Date;
  public roles: string[];

  constructor(data: any) {
    this.id = data.$key || data.id;
    this.email = data.email;
    this.displayName = data.displayName;
    this.registeredAt = data.registeredAt ? new Date(data.registeredAt) : null;
    this.roles = data.roles ? Object.keys(data.roles).filter(k => data.roles[k]) : [];
  }

  get label(): string {
    return this.displayName || this.email;
  }

  hasRole(role): boolean {
    return this.roles.indexOf(role) >= 0;
  }

  toFirebase(): any {
    return {
      email: this.email,
      displayName: this.displayName,
      registeredAt: this.registeredAt ? this.registeredAt.getTime() : firebase.database.ServerValue.TIMESTAMP,
      roles: this.roles.reduce((a, b) => a[b] = true && a, {}),
    };
  }
}
