import * as functions from 'firebase-functions';
import sendRegistrationMail from './sendRegistrationMail';
import updateRegistrationStatus from './updateRegistrationStatus';
import updateKuchenStatistics from './updateKuchenStatistics';

async function handleRegistration(snapshot) {
  const id = snapshot.id;
  const reg = { ...snapshot.data(), id };

  return Promise.all([sendRegistrationMail(reg), updateRegistrationStatus(reg), updateKuchenStatistics(reg)]);
}

export default functions.firestore.document('/registrations/{id}').onCreate(handleRegistration);
