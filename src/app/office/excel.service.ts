import { Injectable } from '@angular/core';
import { Registration } from '../model';
import { KuchenSelection } from '../model/registration';

function encodeCell(value: any): string {
  if (typeof value === 'string') {
    return '"' + value.replace(/\r?\n/, '\\r\\n').replace('"', '""') + '"';
  }

  if (typeof value === 'number') {
    value.toString();
  }

  if (typeof value === 'boolean') {
    return value ? 'ja' : 'nein';
  }

  if (value instanceof Date) {
    return value.toISOString();
  }

  return '';
}

function encodeRow(data: any[]): string {
  return data.map(encodeCell).join(';');
}

function toKuchenSelection(type: KuchenSelection) {
  switch (type) {
    case 'none':
      return 'kein Kuchen';
    case 'geschwister':
      return 'Geschwisterkind';
    case 'kuchen':
      return 'bringt mit';
  }
}

@Injectable()
export class ExcelService {
  exportRegistrations(regs: Registration[]): Blob {
    const header = [
      'ID',
      'Registrierungs-Datum',
      'Nachname',
      'Vorname',
      'Geschlecht',
      'Geburtsdatum',
      'T-Shirt-Größe',
      'Email',
      'Telefon',
      'Straße',
      'PLZ',
      'Wohnort',
      'Notfall Name',
      'Notfall Telefon',
      'Besonderheiten',
      'Vegetarisch',
      'Kuchen Typ',
      'Kuchen Datum',
      'Kuchen Name',
      'Führung',
      'Übernachtung',
      'Bringt Zelt mit',
      'Geschwisterkind',
      'Betrag',
      'Einverständnis',
      'Bezahlung',
    ];

    const rows = regs.map(reg => [
      reg.id,
      reg.registeredAt,
      reg.child.lastName,
      reg.child.firstName,
      reg.child.gender.label,
      reg.child.dateOfBirth,
      reg.child.shirtSize.label,
      reg.parent.email,
      reg.parent.phone,
      reg.parent.street,
      reg.parent.zip,
      reg.parent.city,
      reg.emergencyContact.name,
      reg.emergencyContact.phone,
      reg.child.miscellaneous,
      reg.child.vegetarian,
      toKuchenSelection(reg.kuchen.selection),
      reg.kuchen.date,
      reg.kuchen.name,
      reg.uebernachtung.type === 'uebernachtung' || reg.uebernachtung.type === 'fuehrung',
      reg.uebernachtung.type === 'uebernachtung',
      reg.uebernachtung.tent,
      reg.child.nextChild,
      reg.price.total,
      reg.waiver,
      reg.payment,
    ]);

    const data = [header, ...rows].map(encodeRow).join('\r\n');
    return new Blob([data], { type: 'text/csv' });
  }
}
