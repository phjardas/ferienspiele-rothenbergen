import admin from 'firebase-admin';
import * as functions from 'firebase-functions';

admin.initializeApp(functions.config().firebase);

export const sendRegistrationMail = require('./sendRegistrationMail').sendRegistrationMail;
