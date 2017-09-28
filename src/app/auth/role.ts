export class Role {
  constructor(public id: string, public label: string, public description: string) {}

  static ADMIN = new Role('admin', 'Administration', 'Darf die Anwendung administrieren und Benutzer verwalten');
  static OFFICE = new Role('office', 'Anmeldungen', 'Darf Anmeldungen einsehen und bearbeiten');

  static values : Role[] = [Role.ADMIN, Role.OFFICE];

  static valueOf(id: string): Role {
    return Role.values.find(s => s.id === id);
  }
}
