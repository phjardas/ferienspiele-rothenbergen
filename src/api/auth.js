import 'firebase/auth';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { firebase, Firebase } from './firebase';
import { firestore } from './firestore';

const auth = firebase.auth();
const usersColl = firestore.collection('users');

const Context = createContext();

const providers = [
  {
    id: 'google',
    label: 'Google',
    get provider() {
      return new Firebase.auth.GoogleAuthProvider();
    },
  },
];

function signInWithEmailAndPassword(email, password) {
  auth.signInWithEmailAndPassword(email, password);
}

function signInWithProvider(providerId) {
  const provider = providers.find(p => p.id === providerId);
  if (!provider) throw new Error(`Invalid sign in provider: ${providerId}`);
  return auth.signInWithPopup(provider.provider);
}

function signUp(email, password) {
  auth.createUserWithEmailAndPassword(email, password);
}

function signOut() {
  auth.signOut();
}

async function getUser(fbUser) {
  const userDoc = usersColl.doc(fbUser.uid);
  const userData = await userDoc.get();

  if (userData.exists) {
    return toUser(userData.id, userData.data());
  }

  const data = {
    displayName: fbUser.displayName,
    email: fbUser.email,
    photoURL: fbUser.photoURL,
    registeredAt: Firebase.firestore.FieldValue.serverTimestamp(),
    roles: {},
  };

  await userDoc.set(data);
  return toUser(fbUser.uid, data);
}

function toUser(id, data) {
  const roles = Object.keys(data.roles).filter(role => data.roles[role]);

  return {
    ...data,
    id,
    roles,
    hasAnyRole(...candidates) {
      return candidates.some(cand => this.roles.indexOf(cand) >= 0);
    },
  };
}

export function AuthProvider({ children }) {
  const [state, setState] = useState({ pending: true, authenticated: false });

  useEffect(
    () =>
      auth.onAuthStateChanged(async fbUser => {
        if (fbUser) {
          const user = await getUser(fbUser);
          setState({ pending: false, authenticated: true, user });
        } else {
          setState({ pending: false, authenticated: false });
        }
      }),
    []
  );

  const context = {
    ...state,
    providers,
    signInWithEmailAndPassword,
    signInWithProvider,
    signOut,
    signUp,
  };

  return <Context.Provider value={context}>{children}</Context.Provider>;
}

export function useAuth() {
  return useContext(Context);
}
