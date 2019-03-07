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
    providerFactory: () => new Firebase.auth.GoogleAuthProvider(),
  },
];

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
  };

  return <Context.Provider value={context}>{children}</Context.Provider>;
}

export function useAuth() {
  return useContext(Context);
}
