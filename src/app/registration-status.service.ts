import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import 'rxjs/add/observable/combineLatest';
import { Observable } from 'rxjs/Observable';
import { ConfigurationService } from './configuration.service';

export interface RegistrationStatus {
  readonly status: 'open' | 'deadlineExpired' | 'maxParticipants';
  readonly registrationDeadline: string;
  readonly waiverDeadline: string;
}

@Injectable()
export class RegistrationStatusService {
  public status: Observable<RegistrationStatus>;

  constructor(db: AngularFireDatabase, config: ConfigurationService) {
    const status = db.object<string>('/registrationStatus').valueChanges();
    this.status = Observable.combineLatest(status, config.configuration).map(([status, config]) => ({
      status: status as any,
      registrationDeadline: config.registrationDeadline,
      waiverDeadline: config.waiverDeadline,
    }));
  }
}
