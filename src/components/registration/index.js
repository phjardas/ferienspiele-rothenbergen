import React, { useState } from 'react';
import { Form } from 'react-final-form';
import { createTestData } from '../../api/testdata';
import Container from '../Container';
import Actions from './Actions';
import Child from './Child';
import Parents from './Parents';
import Welcome from './Welcome';

export default function Registration() {
  const [initialValues, setInitialValues] = useState(createTestData ? createTestData() : {});

  const updateTestData = createTestData && (() => setInitialValues(createTestData()));

  const submit = async data => {
    console.log('submit:', data);
    await new Promise(resolve => setTimeout(resolve, 3000));
  };

  return (
    <Form onSubmit={submit} initialValues={initialValues}>
      {({ handleSubmit, invalid, submitting, errors, values }) => (
        <Container>
          <form onSubmit={handleSubmit} noValidate>
            <Welcome createTestData={updateTestData} />
            <Child />
            <Parents />
            <Actions invalid={invalid} submitting={submitting} />
            <pre>{JSON.stringify(values, null, 2)}</pre>
            <pre>{JSON.stringify(errors, null, 2)}</pre>
          </form>
        </Container>
      )}
    </Form>
  );
}
