import 'rxjs/add/operator/first';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/fromPromise';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';

import { WaiverService } from './waiver.service';
import { Registration } from './model';


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
  constructor(
    private db: AngularFireDatabase,
    private waiverService: WaiverService
  ) {}

  getRegistration(id: string): Observable<Registration> {
    return this.db.object(`/registrations/${id}`).map(data => new Registration(data));
  }

  submitRegistration(reg: Registration): Observable<Registration> {
    const regData = { ...toData(reg), registeredAt: firebase.database.ServerValue.TIMESTAMP };
    console.log('submit:', regData);

    const promise: PromiseLike<string> = this.db.list('/registrations').push(regData).then(x => x.key);
    return Observable.fromPromise(promise).mergeMap(id => this.getRegistration(id));
  }

  getWaiver(reg: Registration): Promise<Blob> {
    try {
      return Promise.resolve(this.waiverService.createWaiver(reg));
    } catch (err) {
      return Promise.reject(err);
    }
  }
}
