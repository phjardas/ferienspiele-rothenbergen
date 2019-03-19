const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://ferienspiele-rothenbergen-2.firebaseio.com',
});

const express = require('express');
const waiver = require('../build/getWaiver').default;

const app = express();
app.use('/waiver', waiver);
app.listen(3000);
