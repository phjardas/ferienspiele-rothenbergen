import React, { useEffect, useState } from 'react';
import { getRegistration } from '../api/firestore';
import { useRouter } from '../api/router';
import Alert from '../components/Alert';
import GlobalLoader from '../components/GlobalLoader';
import RegistrationDetails from '../components/registration-details';

async function loadRegistration(id, set) {
  try {
    set({ loading: true });
    const registration = await getRegistration(id);
    set({ loading: false, registration });
  } catch (error) {
    set({ loading: false, error });
  }
}

export default function AnmeldungDetails() {
  const [{ loading, error, registration }, setRegistration] = useState({ loading: true });

  const {
    match: {
      params: { id },
    },
  } = useRouter();

  useEffect(() => {
    loadRegistration(id, setRegistration);
  }, [id]);

  if (loading) return <GlobalLoader />;
  if (error) return <Alert color="error">{error.message}</Alert>;
  return <RegistrationDetails registration={registration} />;
}
