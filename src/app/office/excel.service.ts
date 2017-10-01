import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';

import { Registration } from '../model';


class Worksheet implements XLSX.WorkSheet {
  private _data: { [key: string]: any } = {};

  get data(): { [key: string]: any } { return this._data; }

  setMeta(key: string, value: any) {
    this._data[`!${key}`] = value;
  }

  setCell(row: number, col: number, cell: XLSX.CellObject) {
    this._data[XLSX.utils.encode_cell({ r: row, c: col })] = cell;
  }

  addRow(row: number, data: any[]) {
    data.forEach((value, col) => {
      const cell: XLSX.CellObject = { t: 's', v: value };
      if (typeof value === 'number') {
        cell.t = 'n';
      } else if (typeof value === 'number') {
        cell.t = 'b';
      } else if (value instanceof Date) {
        cell.t = 'n';
        cell.z = XLSX.SSF._table[14];
        cell.v = this.datenum(value);
      }
      this.setCell(row, col, cell);
    });
  }

  private datenum(v: Date): number {
    const epoch = v.getTime();
    const base = new Date(Date.UTC(1899, 11, 30)).getTime();
    return (epoch - base) / (24 * 60 * 60 * 1000);
  }
}

class Workbook implements XLSX.WorkBook {
  private _sheetNames: string[] = [];
  private _sheets: { [key: string]: any } = {};

  get SheetNames() { return this._sheetNames; }
  get Sheets() { return this._sheets; }
  addSheet(name: string, sheet: Worksheet) {
    this._sheetNames.push(name);
    this._sheets[name] = sheet.data;
  }
}


@Injectable()
export class ExcelService {
  exportRegistrations(regs: Registration[]): Blob {
    const header = [
      'ID', 'Registrierungs-Datum',
      'Nachname', 'Vorname', 'Geschlecht', 'Geburtsdatum', 'T-Shirt-Größe',
      'Email', 'Telefon', 'Straße', 'PLZ', 'Wohnort', 'Notfall Name', 'Notfall Telefon',
      'Besonderheiten', 'Vegetarisch', 'Geschwisterkind',
      'Betrag', 'Einverständnis', 'Bezahlung',
    ];

    const sheet = new Worksheet();
    sheet.setMeta('ref', XLSX.utils.encode_range({ s: { r: 0, c: 0}, e: { r: regs.length, c: header.length - 1 }}));
    sheet.addRow(0, header);
    regs.forEach((reg, index) => sheet.addRow(index + 1, [
      reg.id, reg.registeredAt,
      reg.child.lastName, reg.child.firstName, reg.child.gender.label, reg.child.dateOfBirth, reg.child.shirtSize.label,
      reg.parent.email, reg.parent.phone, reg.parent.street, reg.parent.zip, reg.parent.city,
      reg.emergencyContact.name, reg.emergencyContact.phone,
      reg.child.miscellaneous || '', reg.child.vegetarian ? 'ja' : 'nein', reg.child.nextChild ? 'ja' : 'nein',
      reg.price.total, reg.waiver ? 'ja' : 'nein', reg.payment ? 'ja' : 'nein',
    ]));

    const workbook = new Workbook();
    workbook.addSheet('Anmeldungen', sheet);
    console.log('sheets:', workbook.Sheets);

    const data = XLSX.write(workbook, { bookType: 'xlsx', bookSST: true, type: 'buffer' });
    return new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  }
}