import Firebase from 'firebase/app';
import React, { createContext, useContext } from 'react';

const config = {
  apiKey: 'AIzaSyC4_vhhtoQRWFRHgcNT-P1TJAykd-bmUxs',
  authDomain: 'ferienspiele-rothenbergen-2.firebaseapp.com',
  databaseURL: 'https://ferienspiele-rothenbergen-2.firebaseio.com',
  projectId: 'ferienspiele-rothenbergen-2',
  storageBucket: '',
  messagingSenderId: '527493473714',
};

const app = Firebase.initializeApp(config);

const Context = createContext();

export function FirebaseProvider({ children }) {
  return <Context.Provider value={app}>{children}</Context.Provider>;
}

export function useFirebase() {
  return useContext(Context);
}
