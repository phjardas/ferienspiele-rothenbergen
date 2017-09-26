import 'rxjs/add/operator/first';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/fromPromise';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';

import { AuthenticationService, User } from './authentication.service';
import { Registration, Approval, ShirtSize } from './model';


function toData(obj: any): any {
  const data = typeof obj.toFirebase === 'function' ? obj.toFirebase() : JSON.parse(JSON.stringify(obj));
  Object.keys(data).filter(key => typeof data[key] === 'undefined').forEach(key => delete data[key]);
  return data;
}


function toPromise<T>(promise: firebase.Promise<T>): Promise<T> {
  return new Promise((resolve, reject) => promise.then(resolve).catch(reject));
}


@Injectable()
export class RegistrationService {
  constructor(private db: AngularFireDatabase, private auth: AuthenticationService) {}

  getRegistration(id: string): Observable<Registration> {
    return this.db.object(`/registrations/${id}`).map(data => new Registration(data));
  }

  submitRegistration(reg: Registration): Observable<Registration> {
    const regData = { ...toData(reg), registeredAt: firebase.database.ServerValue.TIMESTAMP };
    console.log('submit:', regData);

    const promise: PromiseLike<string> = this.db.list('/registrations').push(regData).then(x => x.key);
    return Observable.fromPromise(promise).mergeMap(id => this.getRegistration(id));
  }

  getRegistrations(): Observable<Registration[]> {
    return this.db.list('/registrations').map(datas => datas.map(data => new Registration(data)));
  }

  setPaymentReceived(id: string, received: boolean): Promise<any> {
    return this.setApproval(id, 'payment', received);
  }

  setWaiverReceived(id: string, received: boolean): Promise<any> {
    return this.setApproval(id, 'waiver', received);
  }

  private setApproval(id: string, type: string, received: boolean) {
    // FIXME validate permissions!
    const ref = this.db.object(`/registrations/${id}/${type}`);

    if (received) {
      return this.auth.user.first().mergeMap(user => Observable.fromPromise(ref.set({ timestamp: firebase.database.ServerValue.TIMESTAMP, user: user.label }))).toPromise();
    } else {
      return toPromise(ref.set(null));
    }
  }
}
