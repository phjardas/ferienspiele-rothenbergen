import 'rxjs/add/operator/map';
import 'rxjs/add/observable/combineLatest';

import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { ConfigurationService } from '../configuration.service';
import { RegistrationService } from './registration.service';
import { Registration } from '../model';


@Component({ templateUrl: 'statistics.component.html' })
export class StatisticsComponent {
  private subscription: Subscription;
  charts = {
    gender: {
      chartType: 'PieChart',
      dataTable: null,
      options: {
        legend: 'none',
        colors: ['#007bff', '#e6007e'],
        chartArea: { left: 0, top: 0, width: '100%', height: '100%' },
      },
    },
    age: {
      chartType: 'ColumnChart',
      dataTable: null,
      options: {
        legend: 'none',
        xchartArea: { left: 10, top: 10, width: '90%', height: '90%' },
        vAxis: {
          format: '#',
          gridlines: {
            count: 2,
          }
        },
      },
    },
    vegetarian: {
      chartType: 'PieChart',
      dataTable: null,
      options: {
        legend: 'none',
        colors: ['#007bff', '#e6007e'],
        chartArea: { left: 0, top: 0, width: '100%', height: '100%' },
      },
    },
    city: {
      chartType: 'PieChart',
      dataTable: null,
      options: {
        legend: 'none',
        chartArea: { left: 0, top: 0, width: '100%', height: '100%' },
      },
    },
    payment: {
      chartType: 'PieChart',
      dataTable: null,
      options: {
        legend: 'none',
        colors: ['#007bff', '#e6007e'],
        chartArea: { left: 0, top: 0, width: '100%', height: '100%' },
      },
    },
    waiver: {
      chartType: 'PieChart',
      dataTable: null,
      options: {
        legend: 'none',
        colors: ['#007bff', '#e6007e'],
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
      this.updateCityData(regs);
      this.updatePaymentData(regs);
      this.updateWaiverData(regs);
    });

    this.subscription.add(Observable.combineLatest(registrations, config)
      .subscribe(values => this.updateAgeData(values[0], values[1].startDate)));
  }

  private updateGenderData(regs: Registration[]) {
    const header: any[] = ['Geschlecht', 'Anzahl'];
    const counts = regs.map(reg => reg.child.gender.label)
      .reduce((cnts, gender) => (cnts[gender] = (cnts[gender] || 0) + 1) && cnts, {});
    const data = Object.keys(counts).sort().map(gender => [gender, counts[gender]]);
    this.charts.gender.dataTable = [header].concat(data);
  }

  private updateAgeData(regs: Registration[], startDate: string) {
    const header: any[] = ['Alter', 'Anzahl'];
    const counts = regs.map(reg => reg.child.getAge(startDate))
      .reduce((cnts, age) => (cnts[age] = (cnts[age] || 0) + 1) && cnts, {});
    const data = Object.keys(counts).sort((a, b) => parseInt(a) - parseInt(b))
      .map(age => [`${age} J.`, counts[age]]);
    this.charts.age.dataTable = [header].concat(data);
  }

  private updateVegetarianData(regs: Registration[]) {
    const header: any[] = ['Vegetarisch', 'Anzahl'];
    const counts = regs.map(reg => reg.child.vegetarian ? 'ja' : 'nein')
      .reduce((cnts, val) => (cnts[val] = (cnts[val] || 0) + 1) && cnts, {});
    const data = Object.keys(counts).sort().map(val => [val, counts[val]]);
    this.charts.vegetarian.dataTable = [header].concat(data);
  }

  private updateCityData(regs: Registration[]) {
    const header: any[] = ['Wohnort', 'Anzahl'];
    const counts = regs.map(reg => reg.parent.city)
      .reduce((cnts, val) => (cnts[val] = (cnts[val] || 0) + 1) && cnts, {});
    const data = Object.keys(counts).sort().map(val => [val, counts[val]]);
    this.charts.city.dataTable = [header].concat(data);
  }

  private updatePaymentData(regs: Registration[]) {
    const header: any[] = ['Teilnahmebeitrag bezahlt', 'Anzahl'];
    const counts = regs.map(reg => reg.payment ? 'bezahlt' : 'nicht bezahlt')
      .reduce((cnts, val) => (cnts[val] = cnts[val] + 1) && cnts, { 'bezahlt': 0, 'nicht bezahlt': 0 });
    const data = Object.keys(counts).sort().map(val => [val, counts[val]]);
    this.charts.payment.dataTable = [header].concat(data);
  }

  private updateWaiverData(regs: Registration[]) {
    const header: any[] = ['Vegetarisch', 'Anzahl'];
    const counts = regs.map(reg => reg.waiver ? 'abgegeben' : 'nicht abgegeben')
      .reduce((cnts, val) => (cnts[val] = cnts[val] + 1) && cnts, { 'abgegeben': 0, 'nicht abgegeben': 0 });
    const data = Object.keys(counts).map(val => [val, counts[val]]);
    this.charts.waiver.dataTable = [header].concat(data);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
