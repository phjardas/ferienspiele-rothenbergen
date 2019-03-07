import 'firebase/auth';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { firebase, Firebase } from './firebase';

const auth = firebase.auth();

const Context = createContext();

const providers = [
  {
    id: 'google',
    label: 'Google',
    icon: 'google',
    get provider() {
      return new Firebase.auth.GoogleAuthProvider();
    },
  },
];

const signInWithEmailAndPassword = (email, password) => auth.signInWithEmailAndPassword(email, password);

const signInWithProvider = providerId => {
  const provider = providers.find(p => p.id === providerId);
  if (!provider) throw new Error(`Invalid sign in provider: ${providerId}`);
  return auth.signInWithPopup(provider.provider);
};

const signOut = () => auth.signOut();

export function AuthProvider({ children }) {
  const [state, setState] = useState({ pending: true, authenticated: false });

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      console.info('[auth] current user:', user);
      setState({ pending: false, authenticated: !!user, user });
    });
  }, []);

  const context = {
    ...state,
    providers,
    signInWithEmailAndPassword,
    signInWithProvider,
    signOut,
  };

  return <Context.Provider value={context}>{children}</Context.Provider>;
}

export function useAuth() {
  return useContext(Context);
}
