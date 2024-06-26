import {
  addDoc,
  collection,
  deleteDoc,
  deleteField,
  doc,
  getDoc,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { useCallback, useEffect, useMemo, useState } from "react";
import config from "./config";
import { firebase } from "./firebase";

export const firestore = getFirestore(firebase);
const configDoc = doc(firestore, "config/config");
const kuchenDoc = doc(firestore, "kuchen/kuchen");
const registrationsColl = collection(firestore, "registrations");
const invitationsColl = collection(firestore, "invitations");

export function useRegistrationStatus() {
  return useDoc(configDoc);
}

export function useKuchenStatistics() {
  return useDoc(kuchenDoc);
}

export function useInvitation(code) {
  const ref = useMemo(() => code && doc(invitationsColl, code), [code]);
  return useDoc(ref);
}

export function useInvitations() {
  const [state, setState] = useState({ loading: true });

  useEffect(() => {
    onSnapshot(
      query(invitationsColl, orderBy("note")),
      (snap) =>
        setState({
          loading: false,
          data: snap.docs.map((doc) => ({ ...doc.data(), id: doc.id })),
        }),
      (error) => setState({ loading: false, error }),
    );
  }, []);

  return state;
}

export function useCreateInvitation() {
  return useCallback(async (data) => {
    const ref = await addDoc(invitationsColl, {
      ...data,
      createdAt: serverTimestamp(),
    });
    return { ...data, id: ref.id };
  }, []);
}

export function useDeleteInvitation() {
  return useCallback(async (id) => {
    await deleteDoc(doc(invitationsColl, id));
  }, []);
}

function useDoc(doc) {
  const [state, setState] = useState({ loading: true });

  useEffect(() => {
    if (doc) {
      return onSnapshot(
        doc,
        (snap) => setState({ loading: false, data: snap.data() }),
        (error) => setState({ loading: false, error }),
      );
    } else {
      setState({ loading: false });
    }
  }, [doc]);

  return state;
}

export async function storeRegistration(registration, code) {
  const ref = doc(registrationsColl);
  await setDoc(
    ref,
    removeUndefinedFields({
      ...registration,
      code,
      year: config.year,
      registeredAt: serverTimestamp(),
    }),
  );

  return toEntity(await getDoc(ref));
}

export function getRegistration(id, next) {
  return onSnapshot(
    doc(registrationsColl, id),
    (snapshot) => next(null, toEntity(snapshot)),
    next,
  );
}

export function getRegistrations({ sortField, sortDirection }, next) {
  const search =
    sortField && sortDirection
      ? query(registrationsColl, orderBy(sortField, sortDirection))
      : registrationsColl;

  return onSnapshot(
    search,
    (snapshot) => next(null, snapshot.docs.map(toEntity)),
    next,
  );
}

export async function setPaymentReceived(registrationId, received) {
  await updateDoc(doc(registrationsColl, registrationId), {
    payment: received
      ? {
          receivedAt: serverTimestamp(),
        }
      : deleteField(),
  });
}

export async function setWaiverReceived(registrationId, received) {
  await updateDoc(doc(registrationsColl, registrationId), {
    waiver: received
      ? {
          receivedAt: serverTimestamp(),
        }
      : deleteField(),
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
