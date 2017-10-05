import 'rxjs/add/operator/first';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/fromPromise';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';

import { User } from './user';


export interface AuthenticationProvider {
  id: String,
  label: String,
  icon: String,
  providerFactory: () => firebase.auth.AuthProvider,
}


function toPromise<T>(promise: firebase.Promise<T>): Promise<T> {
  return new Promise((resolve, reject) => promise.then(resolve).catch(reject));
}


@Injectable()
export class AuthenticationService {
  public user: Observable<User>;
  public providers : AuthenticationProvider[] = [
    {
      id: 'google',
      label: 'Google',
      icon: 'google',
      providerFactory: () => new firebase.auth.GoogleAuthProvider(),
    },
  ];

  constructor(private db: AngularFireDatabase, private auth: AngularFireAuth) {
    this.user = auth.authState.mergeMap(user => user ? this.loadDetails(user) : Observable.of(null));
  }

  private maybeCreateUser(fb: firebase.User, usr: any): Observable<User> {
    let data: any = {
      $key: fb.uid,
      email: fb.email,
      displayName: fb.displayName,
    };

    if (usr.$exists()) {
      Object.assign(data, usr);
      return Observable.of(new User(data));
    }

    const user = new User(data);
    return Observable.fromPromise(this.db.object(`/users/${fb.uid}`).set(user.toFirebase())).map(_=> user);
  }

  private loadDetails(user: firebase.User): Observable<User> {
    return this.db.object(`/users/${user.uid}`)
      .first()
      .mergeMap(usr => this.maybeCreateUser(user, usr));
  }

  private getSigninProvider(type: string): firebase.auth.AuthProvider {
    const match = this.providers.find(provider => provider.id === type);
    if (!match) throw new Error(`Invalid authentication provider: ${type}`);
    return match.providerFactory();
  }

  signinWithEmail(email: string, password: string): Promise<any> {
    return toPromise(this.auth.auth.signInWithEmailAndPassword(email, password));
  }

  createUserWithEmail(email: string, password: string): Promise<any> {
    return toPromise(this.auth.auth.createUserWithEmailAndPassword(email, password));
  }

  sendPasswordResetEmail(email: string): Promise<any> {
    return toPromise(this.auth.auth.sendPasswordResetEmail(email));
  }

  confirmPasswordReset(code: string, password: string): Promise<any> {
    return toPromise(this.auth.auth.confirmPasswordReset(code, password));
  }

  signinWithProvider(type: string): Promise<any> {
    const provider = this.getSigninProvider(type);
    return toPromise(this.auth.auth.signInWithPopup(provider));
  }

  signout() {
    this.auth.auth.signOut();
  }
}
