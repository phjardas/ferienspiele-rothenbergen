import config from "./config";

// Exported from http://www.vorname.com/beliebte_vornamen,0.html
// JSON.stringify([...document.querySelectorAll('.cpink.fz20')[0].parentNode.querySelectorAll('a.ellipsis')].map(el => el.text).slice(0, 20))
const names = {
  f: [
    "Laura",
    "Julia",
    "Emilia",
    "Lea",
    "Lina",
    "Anna",
    "Lena",
    "Lara",
    "Sarah",
    "Elena",
    "Amelie",
    "Sophie",
    "Vanessa",
    "Alina",
    "Luca",
    "Juna",
    "Mia",
    "Nina",
    "Mila",
    "Lisa",
  ],
  m: [
    "Liam",
    "Milan",
    "Jonas",
    "Elias",
    "Julian",
    "Levi",
    "Tim",
    "Michael",
    "Linus",
    "Luca",
    "Daniel",
    "David",
    "Alexander",
    "Samuel",
    "Lukas",
    "Jan",
    "Noah",
    "Marcel",
    "Leon",
    "Maria",
  ],
};

names.d = [...names.f, ...names.m];

// https://de.wikipedia.org/wiki/Liste_der_h%C3%A4ufigsten_Familiennamen_in_Deutschland
const lastNames = [
  "Müller",
  "Schmidt",
  "Schneier",
  "Fischer",
  "Weber",
  "Meyer",
  "Wagner",
  "Becker",
  "Schulz",
  "Hoffmann",
  "Schäfer",
  "Koch",
  "Bauer",
  "Richter",
  "Klein",
  "Wolf",
  "Schröder",
];

const streets = ["Mustergasse", "Sackgasse", "Teststraße", "Hauptstraße"];
const cities = [
  "Niedergründau",
  "Rothenbergen",
  "Langenselbold",
  "Büdingen",
  "Gründau-Lieblos",
  "Mittel-Gründau",
  "Hain-Gründau",
];
const kuchen = [
  "Marmorkuchen",
  "Sandkuchen",
  "Rüeblitorte",
  "Schwarzwälder Kirschtorte",
  "Matschkuchen",
  "Wölkchenkuchen",
];

function randomBoolean() {
  return Math.random() < 0.5;
}

function randomNumber(min, max) {
  return min + Math.floor(Math.random() * (max - min));
}

function randomElement(candidates) {
  return candidates[Math.floor(Math.random() * candidates.length)];
}

function randomPhone() {
  return `0${randomNumber(1, 10000)}-${randomNumber(1, 1000000)}`;
}

function randomDateOfBirth() {
  const currentYear = new Date().getFullYear();
  const years = [6, 7, 8, 9, 10, 11, 12].map((age) => currentYear - age);
  const months = Array.from(Array(12).keys());
  const days = Array.from(Array(27).keys()).map((i) => i + 1);

  const year = randomElement(years);
  const month = randomElement(months);
  const day = randomElement(days);
  return new Date(year, month, day).toISOString().substring(0, 10);
}

export function createTestData() {
  const gender = randomElement(config.genders).value;
  const lastName = randomElement(lastNames);
  const kuchenDate = randomElement([
    ...config.kuchen.map((k) => k.date),
    "geschwister",
    "none",
  ]);

  return {
    child: {
      firstName: randomElement(names[gender]),
      lastName,
      gender,
      dateOfBirth: randomDateOfBirth(),
      shirtSize: randomElement(config.shirtSizes).value,
      foodPreference: randomElement(config.foodPreferences).value,
      vegetarian: randomBoolean(),
      nextChild: randomBoolean(),
      earlyCare: randomBoolean(),
      sleepover: randomBoolean(),
      walkHome: randomBoolean(),
    },
    parent: {
      phone: randomPhone(),
      email: "ferienspiele-rothenbergen@mailinator.com",
      street: `${randomElement(streets)} ${randomNumber(1, 100)}`,
      zip: `6${randomNumber(1, 10000)}`,
      city: randomElement(cities),
    },
    emergencyContact: {
      name: `${randomElement(names.d)} ${lastName}`,
      phone: randomPhone(),
    },
    kuchen: {
      date: kuchenDate,
      name:
        kuchenDate !== "none" && kuchenDate !== "geschwister"
          ? randomElement(kuchen)
          : undefined,
    },
  };
}
