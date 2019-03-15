import React, { useEffect } from 'react';
import { usePage } from '../../api/page';
import Kuchen from '../../components/office/Kuchen';

export default function KuchenPage() {
  const { setPage } = usePage();

  useEffect(() => {
    setPage({ title: 'Kuchen' });
  }, []);

  return <Kuchen />;
}
