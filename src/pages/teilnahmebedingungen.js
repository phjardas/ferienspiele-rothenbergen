import React from 'react';
import Card from '../components/Card';
import CardContent from '../components/CardContent';
import H2 from '../components/H2';
import Layout from '../components/Layout';
import Teilnahmebedingungen from '../components/Teilnahmebedingungen';

export default function TeilnahmebedingungenPage() {
  return (
    <Layout back={{ to: '/' }}>
      <Card>
        <CardContent>
          <H2>Teilnahmebedingungen</H2>
          <Teilnahmebedingungen />
        </CardContent>
      </Card>
    </Layout>
  );
}
