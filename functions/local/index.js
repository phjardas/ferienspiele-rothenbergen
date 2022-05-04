const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://ferienspiele-rothenbergen-2.firebaseio.com',
  projectId: 'ferienspiele-rothenbergen-2',
  storageBucket: 'ferienspiele-rothenbergen-2.appspot.com',
  messagingSenderId: '527493473714',
});

const express = require('express');
const waiver = require('../build/getWaiver').default;

const app = express();
app.use('/waiver', waiver);
app.listen(3001, () => console.log('ready'));
