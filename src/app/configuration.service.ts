import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publishBehavior';
import { Observable } from 'rxjs/Observable';

export class Configuration {
  public maxParticipants: number;
  public registrationDeadline: string;
  public waiverDeadline: string;
  public enableTestData: boolean;
  public requiredKuchen: { [date: string]: number };

  constructor(data: any) {
    this.maxParticipants = parseInt(data.maxParticipants);
    this.registrationDeadline = data.registrationDeadline;
    this.waiverDeadline = data.waiverDeadline;
    this.enableTestData = !!data.enableTestData;
    this.requiredKuchen = data.requiredKuchen || {};
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
