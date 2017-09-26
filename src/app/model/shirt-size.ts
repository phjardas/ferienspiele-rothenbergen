export class ShirtSize {
  constructor(public id: string, public label: string) {}

  static values : ShirtSize[] = [
    new ShirtSize('WOMEN_XS', 'Damen XS'),
    new ShirtSize('WOMEN_S', 'Damen S'),
    new ShirtSize('WOMEN_M', 'Damen M'),
    new ShirtSize('WOMEN_L', 'Damen L'),
    new ShirtSize('WOMEN_XL', 'Damen XL'),
    new ShirtSize('WOMEN_XXL', 'Damen XXL'),
    new ShirtSize('MEN_XS', 'Herren XS'),
    new ShirtSize('MEN_S', 'Herren S'),
    new ShirtSize('MEN_M', 'Herren M'),
    new ShirtSize('MEN_L', 'Herren L'),
    new ShirtSize('MEN_XL', 'Herren XL'),
    new ShirtSize('MEN_XXL', 'Herren XXL'),
    new ShirtSize('MEN_XXXL', 'Herren XXXL falls verfügbar, sonst XXL'),
    new ShirtSize('CHILDREN_S', 'Kinder 7-8 Jahre (122/128)'),
    new ShirtSize('CHILDREN_M', 'Kinder 9-11 Jahre (134/146)'),
    new ShirtSize('CHILDREN_L', 'Kinder 12-14 Jahre (152/164)'),
  ];

  static valueOf(id: string): ShirtSize {
    return ShirtSize.values.find(s => s.id === id);
  }
}
