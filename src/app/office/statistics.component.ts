import 'rxjs/add/operator/map';
import 'rxjs/add/observable/combineLatest';

import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { ConfigurationService } from '../configuration.service';
import { RegistrationService } from './registration.service';
import { Registration } from '../model';
import { environment } from '../../environments/environment';
import { UebernachtungType } from '../model/registration';

const colors = {
  blue: '#007bff',
  violet: '#7340FF',
  red: '#dc3545',
};

@Component({ templateUrl: 'statistics.component.html' })
export class StatisticsComponent {
  private subscription: Subscription;
  charts = {
    gender: {
      chartType: 'PieChart',
      dataTable: null,
      options: {
        legend: 'none',
        colors: [colors.blue, colors.red],
        chartArea: { left: 0, top: 0, width: '100%', height: '100%' },
      },
    },
    age: {
      chartType: 'ColumnChart',
      dataTable: null,
      options: {
        legend: 'none',
        colors: [colors.blue, colors.red],
        xchartArea: { left: 10, top: 10, width: '90%', height: '90%' },
        vAxis: {
          format: '#',
          gridlines: {
            count: 2,
          },
        },
      },
    },
    vegetarian: {
      chartType: 'PieChart',
      dataTable: null,
      options: {
        legend: 'none',
        colors: [colors.blue, colors.red],
        chartArea: { left: 0, top: 0, width: '100%', height: '100%' },
      },
    },
    uebernachtung: {
      chartType: 'PieChart',
      dataTable: null,
      options: {
        legend: 'none',
        colors: [colors.blue, colors.violet, colors.red],
        chartArea: { left: 0, top: 0, width: '100%', height: '100%' },
      },
    },
    paymentType: {
      chartType: 'PieChart',
      dataTable: null,
      options: {
        legend: 'none',
        colors: [colors.blue, colors.red],
        chartArea: { left: 0, top: 0, width: '100%', height: '100%' },
      },
    },
    payment: {
      chartType: 'PieChart',
      dataTable: null,
      options: {
        legend: 'none',
        colors: [colors.blue, colors.red],
        chartArea: { left: 0, top: 0, width: '100%', height: '100%' },
      },
    },
    waiver: {
      chartType: 'PieChart',
      dataTable: null,
      options: {
        legend: 'none',
        colors: [colors.blue, colors.red],
        chartArea: { left: 0, top: 0, width: '100%', height: '100%' },
      },
    },
  };

  constructor(registrationService: RegistrationService, configurationService: ConfigurationService) {
    const registrations = registrationService.getRegistrations();
    const config = configurationService.configuration;

    this.subscription = registrations.subscribe(regs => {
      this.updateGenderData(regs);
      this.updateVegetarianData(regs);
      this.updateUebernachtungData(regs);
      // this.updatePaymentTypeData(regs);
      this.updatePaymentData(regs);
      this.updateWaiverData(regs);
    });

    this.subscription.add(registrations.subscribe(registrations => this.updateAgeData(registrations, environment.startDate)));
  }

  private updateGenderData(regs: Registration[]) {
    const header: any[] = ['Geschlecht', 'Anzahl'];
    const counts = regs.map(reg => reg.child.gender.label).reduce((cnts, gender) => (cnts[gender] = (cnts[gender] || 0) + 1) && cnts, {});
    const data = Object.keys(counts)
      .sort()
      .map(gender => [gender, counts[gender]]);
    this.charts.gender.dataTable = [header].concat(data);
  }

  private updateAgeData(regs: Registration[], startDate: string) {
    const header: any[] = ['Alter', 'Anzahl'];
    const counts = regs.map(reg => reg.child.getAge(startDate)).reduce((cnts, age) => (cnts[age] = (cnts[age] || 0) + 1) && cnts, {});
    const data = Object.keys(counts)
      .sort((a, b) => parseInt(a) - parseInt(b))
      .map(age => [`${age} J.`, counts[age]]);
    this.charts.age.dataTable = [header].concat(data);
  }

  private updateVegetarianData(regs: Registration[]) {
    const header: any[] = ['Vegetarisch', 'Anzahl'];
    const counts = regs
      .map(reg => (reg.child.vegetarian ? 'ja' : 'nein'))
      .reduce((cnts, val) => (cnts[val] = (cnts[val] || 0) + 1) && cnts, {});
    const data = Object.keys(counts)
      .sort()
      .map(val => [val, counts[val]]);
    this.charts.vegetarian.dataTable = [header].concat(data);
  }

  private updateUebernachtungData(regs: Registration[]) {
    const header: any[] = ['Teilnahme', 'Anzahl'];
    const counts = regs
      .map(reg => {
        switch (reg.uebernachtung.type) {
          case 'uebernachtung':
            return 'Führung und Übernachtung';
          case 'fuehrung':
            return 'nur Führung';
          default:
            return 'keine';
        }
      })
      .reduce((cnts, val) => (cnts[val] = (cnts[val] || 0) + 1) && cnts, {});
    const data = Object.keys(counts)
      .sort()
      .map(val => [val, counts[val]]);
    this.charts.uebernachtung.dataTable = [header].concat(data);
  }

  private updatePaymentTypeData(regs: Registration[]) {
    const labels = { cash: 'Bar', transfer: 'Überweisung' };
    const header: any[] = ['Bezahlart', 'Anzahl'];
    const counts = regs
      .filter(reg => reg.payment)
      .map(reg => reg.payment.type)
      .reduce((cnts, val) => (cnts[val] = (cnts[val] || 0) + 1) && cnts, {});
    const data = Object.keys(counts)
      .sort()
      .map(val => [labels[val], counts[val]]);
    this.charts.paymentType.dataTable = [header].concat(data);
  }

  private updatePaymentData(regs: Registration[]) {
    const header: any[] = ['Teilnahmebeitrag bezahlt', 'Anzahl'];
    const counts = regs
      .map(reg => (reg.payment ? 'bezahlt' : 'nicht bezahlt'))
      .reduce((cnts, val) => (cnts[val] = cnts[val] + 1) && cnts, { bezahlt: 0, 'nicht bezahlt': 0 });
    const data = Object.keys(counts)
      .sort()
      .map(val => [val, counts[val]]);
    this.charts.payment.dataTable = [header].concat(data);
  }

  private updateWaiverData(regs: Registration[]) {
    const header: any[] = ['Vegetarisch', 'Anzahl'];
    const counts = regs
      .map(reg => (reg.waiver ? 'abgegeben' : 'nicht abgegeben'))
      .reduce((cnts, val) => (cnts[val] = cnts[val] + 1) && cnts, { abgegeben: 0, 'nicht abgegeben': 0 });
    const data = Object.keys(counts).map(val => [val, counts[val]]);
    this.charts.waiver.dataTable = [header].concat(data);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
