const config = {
  baseUrl: "https://ferienspiele-rothenbergen.de",
  waiverUrl: "https://waiver-ch3dktibga-ew.a.run.app",
  app: "Ökumenische Ferienspiele für Niedergründau und Rothenbergen",
  title: "Echte Helden (brauchen kein Cape)",
  year: 2025,
  startDate: new Date("2025-07-07"),
  endDate: new Date("2025-07-11"),
  registrationStart: new Date("2025-05-01T06:00:00Z"),
  registrationDeadline: new Date("2025-05-31"),
  waiverDeadline: new Date("2025-05-31"),
  maxParticipants: 66,
  earlyCarePlaces: 15,
  minAge: 7,
  prices: {
    base: 45,
    sibling: -15,
    noCake: 10,
  },
  kuchen: [
    { date: "2025-07-07", amount: 10 },
    { date: "2025-07-08", amount: 10 },
    { date: "2025-07-09", amount: 10 },
    { date: "2025-07-10", amount: 10 },
  ],
  genders: [
    { value: "m", label: "männlich" },
    { value: "f", label: "weiblich" },
    { value: "d", label: "divers" },
  ],
  shirtSizes: [
    { value: "CHILDREN_S", label: "Kinder 7-8 Jahre (122/128)" },
    { value: "CHILDREN_M", label: "Kinder 9-11 Jahre (134/146)" },
    { value: "CHILDREN_L", label: "Kinder 12-14 Jahre (152/164)" },
    { value: "XXS", label: "XXS" },
    { value: "XS", label: "XS" },
    { value: "S", label: "S" },
    { value: "M", label: "M" },
    { value: "L", label: "L" },
    { value: "XL", label: "XL" },
    { value: "XXL", label: "XXL" },
    { value: "3XL", label: "3XL" },
    { value: "4XL", label: "4XL" },
  ],
  foodPreferences: [
    { value: "omnivore", label: "Mein Kind isst Fleisch" },
    { value: "vegetarian", label: "Mein Kind isst vegetarisch" },
    { value: "vegan", label: "Mein Kind isst vegan" },
  ],
};

export default config;
