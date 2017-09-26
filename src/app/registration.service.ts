import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/fromPromise';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';

import { Registration, ShirtSize } from './model';


function toData(obj: any): any {
  const data = typeof obj.toFirebase === 'function' ? obj.toFirebase() : JSON.parse(JSON.stringify(obj));
  Object.keys(data).filter(key => typeof data[key] === 'undefined').forEach(key => delete data[key]);
  return data;
}


@Injectable()
export class RegistrationService {
  constructor(private db: AngularFireDatabase) {}

  getRegistration(id: string): Observable<Registration> {
    return this.db.object(`/registrations/${id}`).map(data => new Registration(data));
  }

  submitRegistration(reg: Registration): Observable<Registration> {
    const regData = { ...toData(reg), registeredAt: firebase.database.ServerValue.TIMESTAMP };
    console.log('submit:', regData);

    const promise: PromiseLike<string> = this.db.list('/registrations').push(regData).then(x => x.key);
    return Observable.fromPromise(promise).mergeMap(id => this.getRegistration(id));
  }
}
