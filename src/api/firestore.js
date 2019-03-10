import 'firebase/firestore';
import config from './config';
import { firebase, Firebase } from './firebase';

const firestore = firebase.firestore();
const registrationsColl = firestore.collection('registrations');

export async function storeRegistration(registration) {
  const doc = registrationsColl.doc();
  await doc.set({
    ...registration,
    year: config.year,
    registeredAt: Firebase.firestore.FieldValue.serverTimestamp(),
  });

  return toEntity(doc);
}

export function getRegistration(id, next) {
  return registrationsColl.doc(id).onSnapshot({
    next: snapshot => next(null, toEntity(snapshot)),
    error: next,
  });
}

function toEntity(doc) {
  console.log('doc:', doc);
  return doc && doc.exists ? { ...doc.data(), id: doc.id } : null;
}
