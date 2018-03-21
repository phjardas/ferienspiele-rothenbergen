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
import { AuthenticationService, User } from '../auth';
import { Registration, Approval, RegistrationCode } from '../model';
import { ExcelService } from './excel.service';

@Injectable()
export class RegistrationService {
  constructor(
    private base: BaseRegistrationService,
    private db: AngularFireDatabase,
    private auth: AuthenticationService,
    private excelService: ExcelService
  ) {}

  getRegistration(id: string): Observable<Registration> {
    return this.base.getRegistration(id);
  }

  getWaiver(reg: Registration): Promise<Blob> {
    return this.base.getWaiver(reg);
  }

  getRegistrations(): Observable<Registration[]> {
    return this.db
      .list('/registrations')
      .valueChanges()
      .map(datas => datas.map(data => new Registration(data)));
  }

  exportRegistrations(): Observable<Blob> {
    return this.getRegistrations().map(regs => this.excelService.exportRegistrations(regs));
  }

  getRegistrationCodes(): Observable<RegistrationCode[]> {
    return this.db
      .list('/registrationCodes')
      .valueChanges()
      .map(datas => datas.map(data => new RegistrationCode(data)));
  }

  createRegistrationCode(label: string): Promise<string> {
    const length = 8;
    const alphabet = '0123456789';
    let code = '';
    for (let i = 0; i < length; i++) {
      code += alphabet[Math.floor(Math.random() * alphabet.length)];
    }

    const ref = this.db.object(`/registrationCodes/${code}`);
    return ref.set(new RegistrationCode({ code, label }).toFirebase()).then(_ => code);
  }

  setPaymentReceived(id: string, type: string): Promise<any> {
    return this.setApproval(id, 'payment', true, { type });
  }

  setPaymentNotReceived(id: string): Promise<any> {
    return this.setApproval(id, 'payment', false);
  }

  setWaiverReceived(id: string, received: boolean): Promise<any> {
    return this.setApproval(id, 'waiver', received);
  }

  private setApproval(id: string, type: string, received: boolean, additionalData?: {}): Promise<any> {
    // FIXME validate permissions!
    const ref = this.db.object(`/registrations/${id}/${type}`);

    if (received) {
      return this.auth.user
        .filter(user => user != null)
        .first()
        .mergeMap(user => {
          const data = { timestamp: firebase.database.ServerValue.TIMESTAMP, user: user.label };
          if (additionalData) Object.assign(data, additionalData);
          return Observable.fromPromise(ref.set(data));
        })
        .toPromise();
    } else {
      return ref.set(null);
    }
  }
}
