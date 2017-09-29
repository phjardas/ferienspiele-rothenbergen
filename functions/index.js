const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

function registerFunctions(name) {
  const obj = require(`./${name}`);
  Object.keys(obj)
    .filter(key => typeof obj[key] === 'function')
    .forEach(key => exports[key] = obj[key]);
}

registerFunctions('updateRegistrationCount');
registerFunctions('sendRegistrationMail');
