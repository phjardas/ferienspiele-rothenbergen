import React, { useEffect } from 'react';
import Anmeldungen from '../../components/office/Anmeldungen';
import { usePage } from '../../api/page';

export default function OfficeAnmeldungen() {
  const { setPage } = usePage();

  useEffect(() => {
    setPage({ title: 'Anmeldungen' });
  }, []);

  return <Anmeldungen />;
}
