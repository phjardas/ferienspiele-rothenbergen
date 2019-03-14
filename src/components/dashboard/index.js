import React from 'react';
import Layout from '../Layout';
import Hero from './Hero';
import Infos from './Infos';
import titleImage from './title.jpg';

export default function Dashboard() {
  return (
    <Layout heroImage={titleImage} hero={<Hero />}>
      <Infos />
    </Layout>
  );
}
