import React from 'react';
import Datenschutz from '../components/Datenschutz';
import H2 from '../components/H2';
import Layout from '../components/Layout';

export default function DatenschutzPage() {
  return (
    <Layout title="Datenschutz" back={{ to: '/' }}>
      <H2>Datenschutz</H2>
      <Datenschutz />
    </Layout>
  );
}
