import React from 'react';
import Layout from '../../components/Layout';
import Anmeldungen from '../../components/office/Anmeldungen';
import OfficeNav from './OfficeNav';

export default function OfficeAnmeldungen() {
  return (
    <Layout title="Anmeldungen">
      <OfficeNav />
      <Anmeldungen />
    </Layout>
  );
}
