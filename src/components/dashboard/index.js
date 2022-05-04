import { Box } from '@material-ui/core';
import React from 'react';
import Layout from '../Layout';
import Hero from './Hero';
import Infos from './Infos';

export default function Dashboard() {
  return (
    <Layout hideMenu>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <Hero />
        <Infos />
      </Box>
    </Layout>
  );
}
