import React, { useEffect, useState } from 'react';
import { getRegistration } from '../../api/firestore';
import { usePage } from '../../api/page';
import { useRouter } from '../../api/router';
import Alert from '../../components/Alert';
import GlobalLoader from '../../components/GlobalLoader';
import RegistrationDetails from '../../components/office/registration-details';

export default function AnmeldungDetails() {
  const {
    match: {
      params: { id },
    },
  } = useRouter();
  const { setPage } = usePage();

  const [{ loading, error, registration }, setState] = useState({ loading: true });

  useEffect(() => {
    setState({ loading: true });
    getRegistration(id, (error, registration) => {
      setState({ loading: false, error, registration });
      setPage({
        title: `${registration.child.firstName} ${registration.child.lastName}`,
        back: { to: '/office/anmeldungen' },
      });
    });
  }, [id]);

  if (loading) return <GlobalLoader />;
  if (error) return <Alert color="error">{error.message}</Alert>;
  if (!registration) return <Alert color="error">Ungültige Anmeldung-ID.</Alert>;

  return <RegistrationDetails registration={registration} />;
}
