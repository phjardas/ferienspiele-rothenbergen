export class Gender {
  constructor(public id: string, public label: string) {}

  static values: Gender[] = [new Gender('w', 'weiblich'), new Gender('m', 'männlich')];

  static valueOf(id: string): Gender {
    return Gender.values.find(s => s.id === id);
  }
}
