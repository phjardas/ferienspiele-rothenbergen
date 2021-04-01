import admin from './admin';
import config from './config';

const { maxParticipants, registrationDeadline } = config;
const configDoc = admin.firestore().collection('config').doc('config');
const registrationsColl = admin.firestore().collection('registrations');

async function getRegistrationCount() {
  const documents = await registrationsColl.get();
  return documents.size;
}

function getConfigurationStatus(registrationCount) {
  if (Date.now() > registrationDeadline.getTime()) return { registrationStatus: 'deadlineExpired', spotsLeft: 0 };
  if (registrationCount >= maxParticipants) return { registrationStatus: 'maxParticipants', spotsLeft: 0 };
  return { registrationStatus: 'open', spotsLeft: maxParticipants - registrationCount };
}

async function setRegistrationStatus({ registrationStatus, spotsLeft }) {
  const doc = await configDoc.get();
  if (doc.exists) {
    await configDoc.update({ registrationStatus, spotsLeft });
  } else {
    await configDoc.set({ registrationStatus, spotsLeft });
  }
}

export default async function updateRegistrationStatus() {
  const registrationCount = await getRegistrationCount();
  const status = getConfigurationStatus(registrationCount);
  await setRegistrationStatus(status);
}
