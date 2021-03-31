import Firebase from 'firebase/app';

const config = {
  apiKey: 'AIzaSyC4_vhhtoQRWFRHgcNT-P1TJAykd-bmUxs',
  authDomain: 'ferienspiele-rothenbergen-2.firebaseapp.com',
  databaseURL: 'https://ferienspiele-rothenbergen-2.firebaseio.com',
  projectId: 'ferienspiele-rothenbergen-2',
  storageBucket: 'ferienspiele-rothenbergen-2.appspot.com',
  messagingSenderId: '527493473714',
};

export const firebase = Firebase.initializeApp(config);
export { Firebase };
