import { ShirtSize } from '../model';

// Exported from http://www.vorname.com/beliebte_vornamen,0.html
// JSON.stringify([...document.querySelectorAll('.cpink.fz20')[0].parentNode.querySelectorAll('a.ellipsis')].map(el => el.text).slice(0, 20))
const femaleNames = ["Laura","Julia","Emilia","Lea","Lina","Anna","Lena","Lara","Sarah","Elena","Amelie","Sophie","Vanessa","Alina","Luca","Juna","Mia","Nina","Mila","Lisa"];
// JSON.stringify([...document.querySelectorAll('.cblau.fz20')[0].parentNode.querySelectorAll('a.ellipsis')].map(el => el.text).slice(0, 20))
const maleNames = ["Liam","Milan","Jonas","Elias","Julian","Levi","Tim","Michael","Linus","Luca","Daniel","David","Alexander","Samuel","Lukas","Jan","Noah","Marcel","Leon","Maria"];
const allNames = [...femaleNames, ...maleNames];

// https://de.wikipedia.org/wiki/Liste_der_h%C3%A4ufigsten_Familiennamen_in_Deutschland
const lastNames = ['Müller', 'Schmidt', 'Schneier', 'Fischer'. 'Weber', 'Meyer', 'Wagner', 'Becker', 'Schulz', 'Hoffmann', 'Schäfer', 'Koch', 'Bauer', 'Richter', 'Klein', 'Wolf', 'Schröder'];
const cities = ['Niedergründau', 'Rothenbergen', 'Langenselbold', 'Büdingen', 'Gründau-Lieblos', 'Mittel-Gründau', 'Hain-Gründau'];


function randomBoolean(): boolean {
  return Math.random() < .5;
}

function randomElement<T>(candidates: T[]): T {
  return candidates[Math.floor(Math.random() * candidates.length)];
}

function randomDateOfBirth() {
  const currentYear = new Date().getFullYear();
  const years = [6, 7, 8, 9, 10, 11, 12].map(age => currentYear - age);
  const months = Array.from(Array(12).keys());
  const days = Array.from(Array(27).keys()).map(i => i+1);

  const year = randomElement(years);
  const month = randomElement(months);
  const day = randomElement(days);
  return new Date(year, month, day).toISOString().substring(0, 10);
}


export function createTestData(): any {
  const male = randomBoolean();
  const lastName = randomElement(lastNames);

  return {
    child: {
      firstName: randomElement(male ? maleNames : femaleNames),
      lastName,
      gender: male ? 'm': 'w',
      dateOfBirth: randomDateOfBirth(),
      shirtSize: randomElement(ShirtSize.values).id,
      vegetarian: randomBoolean(),
      nextChild: randomBoolean(),
    },
    parent: {
      phone: '01234-567890',
      email: 'ferienspiele-rothenbergen@mailinator.com',
      street: 'Mustergasse 12',
      zip: '67890',
      city: 'Musterhausen',
    },
    emergencyContact: {
      name: `${randomElement(allNames)} ${lastName}`,
      phone: '01234-567890',
    },
  };
}
