import 'rxjs/add/operator/map';

import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { RegistrationService } from '../registration.service';
import { Registration } from '../model';


@Component({
  selector: 'office-dashboard',
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent {
  registrations: Observable<Registration[]>;

  constructor(registrationService: RegistrationService) {
    this.registrations = registrationService.getRegistrations().map(regs => regs.sort(this.compareRegistrations));
  }

  private compareRegistrations(a: Registration, b: Registration): number {
    let comp = a.child.lastName.localeCompare(b.child.lastName);
    if (comp == 0) comp = a.child.firstName.localeCompare(b.child.firstName);
    return comp;
  }

  export() {
    this.registrations
      .map(regs => this.renderRegistrationsCSV(regs))
      .first()
      .subscribe(blob => {
        const { document } = window;
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a');
        a.href = url;
        a.download = `Ferienspiele Rothenbergen Anmeldungen.csv`;
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      });
  }

  private renderRegistrationsCSV(regs: Registration[]): Blob {
    const toCSV: (Registration) => any[] = reg => [
      reg.id, reg.registeredAt.toISOString(),
      reg.child.lastName, reg.child.firstName, reg.child.gender.label, reg.child.dateOfBirth, reg.child.shirtSize.label,
      reg.parent.email, reg.parent.phone, reg.parent.street, reg.parent.zip, reg.parent.city,
      reg.child.miscellaneous || '', reg.child.vegetarian ? 'ja' : 'nein', reg.child.nextChild ? 'ja' : 'nein',
      reg.price.total, reg.waiver ? 'ja' : 'nein', reg.payment ? 'ja' : 'nein',
    ];

    const rows: any[][] = [[
      'ID', 'Registrierungs-Datum',
      'Nachname', 'Vorname', 'Geschlecht', 'Geburtsdatum', 'T-Shirt-Größe',
      'Email', 'Telefon', 'Straße', 'PLZ', 'Wohnort', 'Notfall Name', 'Notfall Telefon',
      'Besonderheiten', 'Vegetarisch', 'Geschwisterkind',
      'Betrag', 'Einverständnis', 'Bezahlung',
    ]];

    regs.map(toCSV).forEach(row => rows.push(row));
    const parts = rows.map(row => row.map(cell => typeof cell === 'string' ? `"${cell.replace(/"/g, '""')}"` : cell).join(',') + '\r\n');
    return new Blob(parts, { type: 'text/csv' });
  }
}
