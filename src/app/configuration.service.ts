import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/publishBehavior';

import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

export class Configuration {
  public startDate: string;
  public endDate: string;
  public maxParticipants: number;
  public registrationDeadline: string;
  public waiverDeadline: string;
  public enableTestData: boolean;

  constructor(data: any) {
    this.startDate = data.startDate;
    this.endDate = data.endDate;
    this.maxParticipants = parseInt(data.maxParticipants);
    this.registrationDeadline = data.registrationDeadline;
    this.waiverDeadline = data.waiverDeadline;
    this.enableTestData = !!data.enableTestData;
  }
}

@Injectable()
export class ConfigurationService {
  public configuration: Observable<Configuration>;

  constructor(private db: AngularFireDatabase) {
    this.configuration = db
      .object('/config')
      .valueChanges()
      .map(data => new Configuration(data));
  }

  get config(): Promise<Configuration> {
    return this.db
      .object('/config')
      .valueChanges()
      .first()
      .map(data => new Configuration(data))
      .toPromise();
  }

  setConfiguration(key: string, value: any): Promise<any> {
    return this.db.object(`/config/${key}`).set(value);
  }
}
