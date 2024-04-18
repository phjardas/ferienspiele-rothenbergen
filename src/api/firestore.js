import "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import config from "./config";
import { Firebase, firebase } from "./firebase";

export const firestore = firebase.firestore();
const configDoc = firestore.collection("config").doc("config");
const kuchenDoc = firestore.collection("kuchen").doc("kuchen");
const registrationsColl = firestore.collection("registrations");
const invitationsColl = firestore.collection("invitations");

export function useRegistrationStatus() {
  return useDoc(configDoc);
}

export function useKuchenStatistics() {
  return useDoc(kuchenDoc);
}

export function useInvitation(code) {
  return useDoc(firestore.collection("invitations").doc(code));
}

export function useInvitations() {
  const [state, setState] = useState({ loading: true });

  useEffect(() => {
    invitationsColl.onSnapshot(
      (snap) => setState({ loading: false, data: snap.docs.map(doc => ({ ...doc.data(), id: doc.id })) }),
      (error) => setState({ loading: false, error }),
    );
  }, []);

  return state;
}

export function useCreateInvitation() {
  return useCallback(async (data) => {
    const doc = await invitationsColl.add({
      ...data,
      createdAt: Firebase.firestore.FieldValue.serverTimestamp()
    })
    return { ...data, id: doc.id }
  }, [])
}

export function useDeleteInvitation() {
  return useCallback(async (id) => {
    await invitationsColl.doc(id).delete()
  }, [])
}

function useDoc(doc) {
  const [state, setState] = useState({ loading: true });

  useEffect(() => {
    doc.onSnapshot(
      (snap) => setState({ loading: false, data: snap.data() }),
      (error) => setState({ loading: false, error }),
    );
  }, [doc]);

  return state;
}

export async function storeRegistration(registration, code) {
  const doc = registrationsColl.doc();
  await doc.set(removeUndefinedFields({
    ...registration,
    code,
    year: config.year,
    registeredAt: Firebase.firestore.FieldValue.serverTimestamp(),
  }));

  return toEntity(await doc.get());
}

export function getRegistration(id, next) {
  return registrationsColl.doc(id).onSnapshot({
    next: (snapshot) => next(null, toEntity(snapshot)),
    error: next,
  });
}

export function getRegistrations({ sortField, sortDirection }, next) {
  let query = registrationsColl;
  if (sortField && sortDirection) {
    query = query.orderBy(sortField, sortDirection);
  }

  return query.onSnapshot({
    next: (snapshot) => next(null, snapshot.docs.map(toEntity)),
    error: next,
  });
}

export async function setPaymentReceived(registrationId, received) {
  await registrationsColl.doc(registrationId).update({
    payment: received
      ? {
        receivedAt: Firebase.firestore.FieldValue.serverTimestamp(),
      }
      : Firebase.firestore.FieldValue.delete(),
  });
}

export async function setWaiverReceived(registrationId, received) {
  await registrationsColl.doc(registrationId).update({
    waiver: received
      ? {
        receivedAt: Firebase.firestore.FieldValue.serverTimestamp(),
      }
      : Firebase.firestore.FieldValue.delete(),
  });
}

function toEntity(doc) {
  return doc && doc.exists ? { ...doc.data(), id: doc.id } : null;
}

function removeUndefinedFields(obj) {
  Object.keys(obj).forEach((key) => {
    const type = typeof obj[key];
    if (type === "undefined") {
      delete obj[key];
    } else if (type === "object") {
      removeUndefinedFields(obj[key]);
    }
  });

  return obj;
}
