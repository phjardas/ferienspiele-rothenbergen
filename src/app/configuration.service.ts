import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';


export class Configuration {
  public year: number;
  public title: string;
  public startDate: string;
  public endDate: string;
  public maxParticipants: number;
  public registrationDeadline: string;
  public waiverDeadline: string;
  public enableTestData: boolean;

  constructor(data: any) {
    this.year = parseInt(data.year);
    this.title = data.title;
    this.startDate = data.startDate;
    this.endDate = data.endDate;
    this.maxParticipants = parseInt(data.maxParticipants);
    this.registrationDeadline = data.registrationDeadline;
    this.waiverDeadline = data.waiverDeadline;
    this.enableTestData = !!data.enableTestData;
  }
}


function toPromise<T>(promise: firebase.Promise<T>): Promise<T> {
  return new Promise((resolve, reject) => promise.then(resolve).catch(reject));
}


@Injectable()
export class ConfigurationService {
  public configuration: Observable<Configuration>;

  constructor(private db: AngularFireDatabase) {
    this.configuration = db.object('/config').map(data => new Configuration(data));
  }

  setConfiguration(key: string, value: any): Promise<any> {
    return toPromise(this.db.object(`/config/${key}`).set(value));
  }
}
