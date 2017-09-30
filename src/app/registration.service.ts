import 'rxjs/add/operator/first';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/observable/fromPromise';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';

import { ConfigurationService, Configuration } from './configuration.service';
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
  private registrationCount: Observable<number>;
  public registrationOpen: Observable<string>;
  public registrationDeadline: Observable<string>;
  public waiverDeadline: Observable<string>;

  constructor(
    private db: AngularFireDatabase,
    private config: ConfigurationService,
    private waiverService: WaiverService
  ) {
    this.registrationCount = db.object('/registrationCount').map(c => c.$value);
    this.registrationDeadline = config.configuration.map(c => c.registrationDeadline);
    this.waiverDeadline = config.configuration.map(c => c.waiverDeadline);
    this.registrationOpen = Observable.combineLatest(
      this.registrationDeadline.map(d => d >= new Date().toISOString().substring(0, 10)),
      config.configuration.map(c => c.maxParticipants).mergeMap(max => this.registrationCount.map(reg => reg < max)),
      (deadline, count) => {
        if (!deadline) return 'deadlineExpired';
        if (!count) return 'maxParticipants';
        return 'ok';
      }
    );
  }

  getRegistration(id: string): Observable<Registration> {
    return this.db.object(`/registrations/${id}`)
      .map(data => data.$exists() ? new Registration(data) : null);
  }

  submitRegistration(reg: Registration): Observable<Registration> {
    const regData = { ...toData(reg), registeredAt: firebase.database.ServerValue.TIMESTAMP };
    const promise: PromiseLike<string> = this.db.list('/registrations').push(regData).then(x => x.key);
    return Observable.fromPromise(promise).mergeMap(id => this.getRegistration(id));
  }

  handlePaypalPayment(registrationId: string, payment: any) {
    this.db.object(`/registrations/${registrationId}/payment`)
      .set({
        type: 'paypal',
        timestamp: firebase.database.ServerValue.TIMESTAMP,
        paypal: {
          id: payment.id,
          timestamp: payment.create_time,
          cart: payment.cart,
          state: payment.state,
        },
      })
  }

  getWaiver(reg: Registration): Promise<Blob> {
    try {
      return this.config.configuration.first()
        .map(config => this.waiverService.createWaiver(reg, config))
        .toPromise();
    } catch (err) {
      return Promise.reject(err);
    }
  }
}
