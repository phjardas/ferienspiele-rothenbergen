import React from 'react';
import Registration from '../components/registration';
import { storeRegistration } from '../api/firestore';
import { useRouter } from '../api/router';

export default function Anmeldung() {
  const { history } = useRouter();

  const onSubmit = async reg => {
    const result = await storeRegistration(reg);
    history.push(`anmeldung/${result.id}`);
  };

  return <Registration onSubmit={onSubmit} />;
}
