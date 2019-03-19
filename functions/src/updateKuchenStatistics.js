import admin from './admin';

const registrationsColl = admin.firestore().collection('registrations');
const kuchenDoc = admin
  .firestore()
  .collection('kuchen')
  .doc('kuchen');

export default async function updateKuchenStatistics() {
  const registrations = await registrationsColl.get();
  const kuchens = registrations.docs.map(doc => doc.get('kuchen'));
  console.log('Calculating kuchen statistics:', kuchens);

  const statistics = kuchens
    .filter(k => k.date !== 'none' && k.date !== 'geschwister')
    .reduce((acc, k) => ({ ...acc, [k.date]: [...(acc[k.date] || []), k.name] }), {});
  console.log('Updating kuchen statistics:', statistics);

  await kuchenDoc.set(statistics);
}
