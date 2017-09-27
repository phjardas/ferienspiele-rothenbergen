import 'rxjs/add/operator/first';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/of';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';


export interface AuthenticationProvider {
  id: String,
  label: String,
  icon: String,
  providerFactory: () => firebase.auth.AuthProvider,
}

export class User {
  constructor(public id: string, public email: string, public displayName: string, public roles: string[]) {}

  get label(): string {
    return this.displayName || this.email;
  }

  hasRole(role): boolean {
    return this.roles.indexOf(role) >= 0;
  }
}


function toPromise<T>(promise: firebase.Promise<T>): Promise<T> {
  return new Promise((resolve, reject) => promise.then(resolve).catch(reject));
}


@Injectable()
export class AuthenticationService {
  public user = new BehaviorSubject<User>(null);
  public providers : AuthenticationProvider[] = [
    {
      id: 'google',
      label: 'Google',
      icon: 'google',
      providerFactory: () => new firebase.auth.GoogleAuthProvider(),
    },
  ];

  constructor(private db: AngularFireDatabase, private auth: AngularFireAuth) {
    auth.authState.mergeMap(user => this.loadDetails(user)).subscribe(this.user.next.bind(this.user));
  }

  private loadDetails(user: firebase.User): Observable<User> {
    return (user !== null ? this.db.object(`/users/${user.uid}`).first() : Observable.of(null))
      .map(usr => {
        const roles = usr && usr.roles ? Object.keys(usr.roles).filter(role => usr.roles[role]) : [];
        return new User(user.uid, user.email, user.displayName, roles);
      });
  }

  private getSigninProvider(type: string): firebase.auth.AuthProvider {
    const match = this.providers.find(provider => provider.id === type);
    if (!match) throw new Error(`Invalid authentication provider: ${type}`);
    return match.providerFactory();
  }

  signinWithEmail(email, password): Promise<any> {
    return toPromise(this.auth.auth.signInWithEmailAndPassword(email, password));
  }

  createUserWithEmail(email, password): Promise<any> {
    return toPromise(this.auth.auth.createUserWithEmailAndPassword(email, password));
  }

  signinWithProvider(type): Promise<any> {
    const provider = this.getSigninProvider(type);
    return toPromise(this.auth.auth.signInWithPopup(provider));
  }

  signout() {
    this.auth.auth.signOut();
  }
}
