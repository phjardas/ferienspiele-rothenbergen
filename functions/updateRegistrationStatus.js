const functions = require('firebase-functions');

/**
 * @returns Promise<{ maxParticipants, registrationDeadline }>
 */
function getConfiguration(rootRef) {
  return rootRef.child('config').once('value')
  .then(snapshot => {
    const data = snapshot.val();
    return {
      maxParticipants: parseInt(data.maxParticipants),
      registrationDeadline: data.registrationDeadline
    };
  });
}

/**
 * @returns Promise<number>
 */
function getRegistrationCount(rootRef) {
  return rootRef.child('registrations').once('value').then(data => data.numChildren());
}

function getConfigurationStatus(registrationCount, maxParticipants, registrationDeadline) {
  console.log('calculating registration status:', { registrationCount, maxParticipants, registrationDeadline });
  if (registrationDeadline < new Date().toISOString().substring(0, 10)) return 'deadlineExpired';
  if (registrationCount >= maxParticipants) return 'maxParticipants';
  return 'open';
}

function updateRegistrationStatus(event) {
  const rootRef = event.data.adminRef.root;
  return Promise.all([ getConfiguration(rootRef), getRegistrationCount(rootRef) ])
  .then(results => {
    const [ config, registrationCount ] = results;
    return getConfigurationStatus(registrationCount, config.maxParticipants, config.registrationDeadline);
  })
  .then(status => {
    console.log('setting registration status:', status);
    return rootRef.child('registrationStatus').set(status);
  });
}

exports.updateRegistrationStatusOnConfigChange = functions.database.ref('/config').onWrite(updateRegistrationStatus);
exports.updateRegistrationStatusOnRegistration = functions.database.ref('/registrations/{id}').onWrite(updateRegistrationStatus);
