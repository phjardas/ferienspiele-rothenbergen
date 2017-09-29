const functions = require('firebase-functions');

exports.updateRegistrationCount = functions.database.ref('/registrations/{id}').onWrite(event => {
  const registrationsRef = event.data.ref.parent;
  return registrationsRef.once('value')
    .then(data => data.numChildren())
    .then(count => registrationsRef.parent.child('/registrationCount').set(count));
});
