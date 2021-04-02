import React from 'react';
import Alert from './Alert';
import Layout from './Layout';

export default function GlobalError({ error, ...props }) {
  return (
    <Layout {...props}>
      <Alert color="error">{error.message}</Alert>
    </Layout>
  );
}
