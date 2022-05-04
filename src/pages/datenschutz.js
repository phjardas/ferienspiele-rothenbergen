import React from 'react';
import Card from '../components/Card';
import CardContent from '../components/CardContent';
import Datenschutz from '../components/Datenschutz';
import H2 from '../components/H2';
import Layout from '../components/Layout';

export default function DatenschutzPage() {
  return (
    <Layout back={{ to: '/' }}>
      <Card>
        <CardContent>
          <H2>Datenschutz</H2>
          <Datenschutz />
        </CardContent>
      </Card>
    </Layout>
  );
}
