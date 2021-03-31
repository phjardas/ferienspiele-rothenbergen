import React, { useEffect } from 'react';
import { storeRegistration } from '../api/firestore';
import { usePage } from '../api/page';
import { useRouter } from '../api/router';
import Registration from '../components/registration';
import qs from 'qs';

function parseParams({ search }) {
  return search && search.startsWith('?') && qs.parse(search.substring(1));
}

export default function Anmeldung() {
  const { location, history } = useRouter();
  const { setPage } = usePage();
  const params = parseParams(location);

  useEffect(() => {
    setPage({ title: 'Anmeldung' });
  }, [setPage]);

  const onSubmit = async reg => {
    const result = await storeRegistration(reg);
    history.push(`/anmeldung/${result.id}`);
  };

  return <Registration onSubmit={onSubmit} initialValues={params} />;
}
