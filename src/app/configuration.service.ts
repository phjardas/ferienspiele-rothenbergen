import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';


export class Configuration {
  public year: number;
  public startDate: string;
  public endDate: string;
  public maxParticipants: number;
  public registrationDeadline: string;
  public waiverDeadline: string;
  public paymentDeadline: string;

  constructor(data: any) {
    this.year = parseInt(data.year);
    this.startDate = data.startDate;
    this.endDate = data.endDate;
    this.maxParticipants = parseInt(data.maxParticipants);
    this.registrationDeadline = data.registrationDeadline;
    this.waiverDeadline = data.waiverDeadline;
    this.paymentDeadline = data.paymentDeadline;
  }
}


@Injectable()
export class ConfigurationService {
  public configuration: Observable<Configuration>;

  constructor(db: AngularFireDatabase) {
    this.configuration = db.object('/config').map(data => new Configuration(data));
  }
}
