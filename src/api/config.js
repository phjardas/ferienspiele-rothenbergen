const config = {
  baseUrl: 'https://ferienspiele-rothenbergen.de',
  apiUrl: 'https://us-central1-ferienspiele-rothenbergen-2.cloudfunctions.net',
  app: 'Ökumenische Ferienspiele für Niedergründau und Rothenbergen',
  title: 'Ein Fest für die Sinne',
  year: 2022,
  startDate: new Date('2022-07-25'),
  endDate: new Date('2022-07-29'),
  registrationStart: new Date('2022-05-07'),
  registrationDeadline: new Date('2022-06-27'),
  waiverDeadline: new Date('2022-06-27'),
  maxParticipants: 55,
  earlyCarePlaces: 20,
  prices: {
    base: 40,
    sibling: -15,
    noCake: 10,
  },
  kuchen: [
    { date: '2022-07-25', amount: 8 },
    { date: '2022-07-26', amount: 8 },
    { date: '2022-07-27', amount: 8 },
    { date: '2022-07-28', amount: 8 },
  ],
  genders: [
    { value: 'm', label: 'männlich' },
    { value: 'f', label: 'weiblich' },
    { value: 'd', label: 'divers' },
  ],
  shirtSizes: [
    { value: 'WOMEN_XS', label: 'Damen XS' },
    { value: 'WOMEN_S', label: 'Damen S' },
    { value: 'WOMEN_M', label: 'Damen M' },
    { value: 'WOMEN_L', label: 'Damen L' },
    { value: 'WOMEN_XL', label: 'Damen XL' },
    { value: 'WOMEN_XXL', label: 'Damen XXL' },
    { value: 'MEN_XS', label: 'Herren XS' },
    { value: 'MEN_S', label: 'Herren S' },
    { value: 'MEN_M', label: 'Herren M' },
    { value: 'MEN_L', label: 'Herren L' },
    { value: 'MEN_XL', label: 'Herren XL' },
    { value: 'MEN_XXL', label: 'Herren XXL' },
    { value: 'MEN_XXXL', label: 'Herren XXXL falls verfügbar, sonst XXL' },
    { value: 'CHILDREN_S', label: 'Kinder 7-8 Jahre (122/128)' },
    { value: 'CHILDREN_M', label: 'Kinder 9-11 Jahre (134/146)' },
    { value: 'CHILDREN_L', label: 'Kinder 12-14 Jahre (152/164)' },
  ],
  foodPreferences: [
    { value: 'omnivore', label: 'Mein Kind isst Fleisch' },
    { value: 'vegetarian', label: 'Mein Kind isst vegetarisch' },
    { value: 'vegan', label: 'Mein Kind isst vegan' },
  ],
};

export default config;
