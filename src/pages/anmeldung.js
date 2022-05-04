import qs from 'qs';
import React, { useCallback } from 'react';
import { useHistory, useLocation } from 'react-router';
import { storeRegistration } from '../api/firestore';
import Layout from '../components/Layout';
import Registration from '../components/registration';

function useParams() {
  const { search } = useLocation();
  return search && search.startsWith('?') && qs.parse(search.substring(1));
}

export default function Anmeldung() {
  const history = useHistory();
  const params = useParams();

  const onSubmit = useCallback(
    async (reg) => {
      const result = await storeRegistration(reg);
      history.push(`/anmeldung/${result.id}`);
    },
    [history]
  );

  return (
    <Layout back={{ to: '/' }}>
      <Registration onSubmit={onSubmit} initialValues={params} />
    </Layout>
  );
}
