import React from 'react';
import { Form } from 'react-final-form';
import { Container, Form as BSForm } from 'reactstrap';
import Actions from './Actions';
import Child from './Child';
import Welcome from './Welcome';

export default function Registration() {
  const submit = async data => {
    console.log('submit:', data);
    await new Promise(resolve => setTimeout(resolve, 3000));
  };

  return (
    <Form onSubmit={submit}>
      {({ handleSubmit, invalid, submitting }) => (
        <BSForm onSubmit={handleSubmit} noValidate>
          <Welcome />
          <Container className="mt-3 mb-3">
            <Child />
            <Actions invalid={invalid} submitting={submitting} />
          </Container>
        </BSForm>
      )}
    </Form>
  );
}
