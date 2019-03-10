import 'firebase/firestore';
import config from './config';
import { firebase, Firebase } from './firebase';

const firestore = firebase.firestore();
const registrationsColl = firestore.collection('registrations');

export async function storeRegistration(registration) {
  const doc = registrationsColl.doc();
  await doc.set({
    ...removeUndefinedFields(registration),
    year: config.year,
    registeredAt: Firebase.firestore.FieldValue.serverTimestamp(),
  });

  return toEntity(await doc.get());
}

export function getRegistration(id, next) {
  return registrationsColl.doc(id).onSnapshot({
    next: snapshot => next(null, toEntity(snapshot)),
    error: next,
  });
}

export function getRegistrations({ sortField, sortDirection }, next) {
  return registrationsColl.orderBy(sortField, sortDirection).onSnapshot({
    next: snapshot => next(null, snapshot.docs.map(toEntity)),
    error: next,
  });
}

function toEntity(doc) {
  return doc && doc.exists ? { ...doc.data(), id: doc.id } : null;
}

function removeUndefinedFields(obj) {
  Object.keys(obj).forEach(key => {
    const type = typeof obj[key];
    if (type === 'undefined') {
      delete obj[key];
    } else if (type === 'object') {
      removeUndefinedFields(obj[key]);
    }
  });

  return obj;
}
