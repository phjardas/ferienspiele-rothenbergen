import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';

import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';

import { ConfigurationService, Configuration } from './configuration.service';

export interface KuchenDetails {
  readonly registrationId: string;
  readonly kuchen: string;
}

export interface DailyKuchenStatus {
  readonly date: string;
  readonly required: number;
  readonly actual: number;
  readonly details: KuchenDetails[];
}

export interface KuchenStatus {
  readonly days: DailyKuchenStatus[];
}

@Injectable()
export class KuchenService {
  public stats: Observable<KuchenStatus>;

  constructor(db: AngularFireDatabase, config: ConfigurationService) {
    const actualKuchen = db
      .object<{ [date: string]: { amount: number; details: { [registrationId: string]: { kuchen: string } } } }>('kuchen')
      .valueChanges()
      .map(k => k || {});

    this.stats = Observable.combineLatest(config.configuration, actualKuchen).map(([cfg, actuals]) => {
      const { requiredKuchen } = cfg;
      const days = Object.keys(cfg.requiredKuchen)
        .sort((a, b) => a.localeCompare(b))
        .map(date => {
          const required = cfg.requiredKuchen[date];
          const actual = actuals[date] || { amount: 0, details: {} };
          const details = Object.keys(actual.details)
            .map(registrationId => ({ ...actual.details[registrationId], registrationId }))
            .sort((a, b) => a.kuchen.localeCompare(b.kuchen));
          return { date, required, actual: actual.amount, details };
        });
      return { days };
    });
  }
}
