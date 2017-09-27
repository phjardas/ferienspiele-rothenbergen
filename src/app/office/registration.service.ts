import 'rxjs/add/operator/first';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/fromPromise';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';

import { RegistrationService as BaseRegistrationService } from '../registration.service';
import { AuthenticationService, User } from '../auth/authentication.service';
import { Registration, Approval } from '../model';


function toPromise<T>(promise: firebase.Promise<T>): Promise<T> {
  return new Promise((resolve, reject) => promise.then(resolve).catch(reject));
}


@Injectable()
export class RegistrationService {
  constructor(
    private base: BaseRegistrationService,
    private db: AngularFireDatabase,
    private auth: AuthenticationService
  ) {}

  getRegistration(id: string): Observable<Registration> {
    return this.base.getRegistration(id);
  }

  getWaiver(reg: Registration): Promise<Blob> {
    return this.base.getWaiver(reg);
  }

  getRegistrations(): Observable<Registration[]> {
    return this.db.list('/registrations')
      .map(datas => datas.map(data => new Registration(data)));
  }

  setPaymentReceived(id: string, received: boolean): Promise<any> {
    return this.setApproval(id, 'payment', received);
  }

  setWaiverReceived(id: string, received: boolean): Promise<any> {
    return this.setApproval(id, 'waiver', received);
  }

  private setApproval(id: string, type: string, received: boolean): Promise<any> {
    // FIXME validate permissions!
    const ref = this.db.object(`/registrations/${id}/${type}`);

    if (received) {
      return this.auth.user
        .filter(user => user != null)
        .first()
        .mergeMap(user => Observable.fromPromise(ref.set({ timestamp: firebase.database.ServerValue.TIMESTAMP, user: user.label })))
        .toPromise();
    } else {
      return toPromise(ref.set(null));
    }
  }
}
