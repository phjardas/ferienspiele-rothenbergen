import 'rxjs/add/observable/combineLatest';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';

import { ConfigurationService, Configuration } from './configuration.service';

export interface RegistrationStatus {
  readonly status: 'open' | 'deadlineExpired' | 'maxParticipants';
  readonly registrationDeadline: string;
  readonly waiverDeadline: string;
}

@Injectable()
export class RegistrationStatusService {
  public status: Observable<RegistrationStatus>;

  constructor(private db: AngularFireDatabase, private config: ConfigurationService) {
    const status = db.object<string>('/registrationStatus').valueChanges();
    this.status = Observable.combineLatest(status, config.configuration).map(([status, config]) => ({
      status: status as any,
      registrationDeadline: config.registrationDeadline,
      waiverDeadline: config.waiverDeadline,
    }));
  }
}
