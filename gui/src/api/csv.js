import config from './config';

export function exportRegistrations(regs) {
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
    'Übernachtung',
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
    getLabel(reg.child.gender, config.genders),
    reg.child.dateOfBirth,
    getLabel(reg.child.shirtSize, config.shirtSizes),
    reg.parent.email,
    reg.parent.phone,
    reg.parent.street,
    reg.parent.zip,
    reg.parent.city,
    reg.emergencyContact.name,
    reg.emergencyContact.phone,
    reg.child.miscellaneous,
    reg.child.vegetarian,
    toKuchenSelection(reg.kuchen.date),
    reg.kuchen.date !== 'none' && reg.kuchen.date !== 'geschwister' ? reg.kuchen.date : '',
    reg.kuchen.name,
    reg.uebernachtung.type === 'uebernachtung',
    reg.child.nextChild,
    reg.price.total,
    !!reg.waiver,
    !!reg.payment,
  ]);

  const data = [header, ...rows].map(encodeRow).join('\r\n');
  return new Blob([data], { type: 'text/csv' });
}

function encodeCell(value) {
  if (typeof value === 'string') {
    return '"' + value.replace(/\r?\n/, '\\r\\n').replace('"', '""') + '"';
  }

  if (typeof value === 'number') {
    return value.toString();
  }

  if (typeof value === 'boolean') {
    return value ? 'ja' : 'nein';
  }

  if (typeof value === 'object' && 'seconds' in value && 'nanoseconds' in value) {
    value = new Date(value.seconds * 1000);
  }

  if (value instanceof Date) {
    return value.toISOString();
  }

  return '';
}

function encodeRow(data) {
  return data.map(encodeCell).join(';');
}

function getLabel(value, options) {
  const option = options.find(g => g.value === value);
  return option ? option.label : '';
}

function toKuchenSelection(date) {
  switch (date) {
    case 'none':
      return 'kein Kuchen';
    case 'geschwister':
      return 'Geschwisterkind';
    default:
      return 'bringt mit';
  }
}
