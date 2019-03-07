import 'firebase/firestore';
import { firebase, Firebase } from './firebase';
import config from './config';

const firestore = firebase.firestore();
const registrationsColl = firestore.collection('registration');

export async function storeRegistration(registration) {
  const doc = registrationsColl.doc();
  const reg = await doc.set({
    ...registration,
    year: config.year,
    registeredAt: Firebase.firestore.FieldValue.serverTimestamp(),
  });

  return toEntity(reg);
}

export async function getRegistration(id) {
  const doc = registrationsColl.doc(id);
  const reg = await doc.get();
  if (!reg.exists) throw new Error(`Anmeldung nicht gefunden: ${id}`);
  return toEntity(reg);
}

function toEntity(doc) {
  return { ...doc.data(), id: doc.id };
}
