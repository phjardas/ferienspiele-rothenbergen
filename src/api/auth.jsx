import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword as firebaseSignInWithEmailAndPassword,
  signOut as firebaseSignOut,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import React, { createContext, useContext, useEffect, useState } from "react";
import { firebase } from "./firebase";
import { firestore } from "./firestore";

const auth = getAuth(firebase);
const usersColl = collection(firestore, "users");

const Context = createContext();

const providers = [
  {
    id: "google",
    label: "Google",
    get provider() {
      return new GoogleAuthProvider();
    },
  },
];

function signInWithEmailAndPassword(email, password) {
  return firebaseSignInWithEmailAndPassword(auth, email, password);
}

function signInWithProvider(providerId) {
  const provider = providers.find((p) => p.id === providerId);
  if (!provider) throw new Error(`Invalid sign in provider: ${providerId}`);
  return signInWithPopup(auth, provider.provider);
}

function signUp(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

function signOut() {
  return firebaseSignOut(auth);
}

async function getUser(fbUser) {
  const userDoc = doc(usersColl, fbUser.uid);
  const userData = await getDoc(userDoc);

  if (userData.exists) {
    return toUser(userData.id, userData.data());
  }

  const data = {
    displayName: fbUser.displayName,
    email: fbUser.email,
    photoURL: fbUser.photoURL,
    registeredAt: serverTimestamp(),
    roles: {},
  };

  await setDoc(userDoc, data);
  return toUser(fbUser.uid, data);
}

function toUser(id, data) {
  const roles = Object.keys(data.roles).filter((role) => data.roles[role]);

  return {
    ...data,
    id,
    roles,
    hasAnyRole(...candidates) {
      return candidates.some((cand) => this.roles.indexOf(cand) >= 0);
    },
  };
}

export function AuthProvider({ children }) {
  const [state, setState] = useState({ pending: true, authenticated: false });

  useEffect(
    () =>
      onAuthStateChanged(auth, async (fbUser) => {
        if (fbUser) {
          const user = await getUser(fbUser);
          setState({ pending: false, authenticated: true, user });
        } else {
          setState({ pending: false, authenticated: false });
        }
      }),
    [],
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
