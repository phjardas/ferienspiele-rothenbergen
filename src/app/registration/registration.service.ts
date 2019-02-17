import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import { ConfigurationService } from '../configuration.service';
import { createId } from '../id';
import { Registration, RegistrationCode } from '../model';
import { WaiverService } from './waiver.service';

function toData(obj: any): any {
  const data = typeof obj.toFirebase === 'function' ? obj.toFirebase() : JSON.parse(JSON.stringify(obj));
  Object.keys(data)
    .filter(key => typeof data[key] === 'undefined')
    .forEach(key => delete data[key]);
  return data;
}

@Injectable()
export class RegistrationService {
  constructor(private db: AngularFireDatabase, private config: ConfigurationService, private waiverService: WaiverService) {}

  getRegistration(id: string): Observable<Registration> {
    return this.db
      .object(`/registrations/${id}`)
      .valueChanges()
      .map(data => (data ? new Registration(data) : null));
  }

  submitRegistration(reg: Registration, code?: string): Observable<Registration> {
    const id = createId();
    const regData = {
      ...toData(reg),
      id,
      registeredAt: firebase.database.ServerValue.TIMESTAMP,
    };
    const promise: PromiseLike<void> = this.db.object(`/registrations/${regData.id}`).set(regData);
    const result = Observable.fromPromise(promise).mergeMap(_ => this.getRegistration(id).first());

    if (code) {
      result.subscribe(r => this.invalidateRegistrationCode(code, r));
    }

    return result;
  }

  getRegistrationCode(code: string): Observable<RegistrationCode> {
    return this.db
      .object(`/registrationCodes/${code}`)
      .valueChanges()
      .map(data => (data ? new RegistrationCode(data) : null));
  }

  invalidateRegistrationCode(code: string, reg: Registration) {
    console.log('invalidating code %s with', code, reg.id);
    this.db.object(`/registrationCodes/${code}`).update({
      used: true,
      usedAt: firebase.database.ServerValue.TIMESTAMP,
      usedBy: `${reg.child.firstName} ${reg.child.lastName}`,
      registrationId: reg.id,
    });
  }

  handlePaypalPayment(registrationId: string, payment: any) {
    this.db.object(`/registrations/${registrationId}/payment`).set({
      type: 'paypal',
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      paypal: {
        id: payment.id,
        timestamp: payment.create_time,
        cart: payment.cart,
        state: payment.state,
      },
    });
  }

  async getWaiver(reg: Registration): Promise<Blob> {
    const config = await this.config.config;
    return this.waiverService.createWaiver(reg, config);
  }
}
