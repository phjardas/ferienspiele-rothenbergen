import React, { useState } from 'react';
import { Form } from 'react-final-form';
import { createTestData } from '../../api/testdata';
import Actions from './Actions';
import Child from './Child';
import EmergencyContact from './EmergencyContact';
import Kuchen from './Kuchen';
import Parents from './Parents';
import Price from './Price';
import { priceCalculator, withPrice } from './priceCalculator';
import Uebernachtung from './Uebernachtung';
import Welcome from './Welcome';

const emptyValues = {
  child: {},
  parent: {},
  emergencyContact: {},
  uebernachtung: {},
  kuchen: {},
};

export default function Registration() {
  const [initialValues, setInitialValues] = useState(withPrice(createTestData ? createTestData() : emptyValues));
  const updateTestData = createTestData && (() => setInitialValues(createTestData()));

  const submit = async data => {
    console.log('submit:', data);
    await new Promise(resolve => setTimeout(resolve, 3000));
  };

  return (
    <Form onSubmit={submit} initialValues={initialValues} decorators={[priceCalculator]}>
      {({ handleSubmit, invalid, submitting }) => (
        <form onSubmit={handleSubmit} noValidate>
          <Welcome createTestData={updateTestData} />
          <Child />
          <Parents />
          <EmergencyContact />
          <Uebernachtung />
          <Kuchen />
          <Price />
          <Actions invalid={invalid} submitting={submitting} />
        </form>
      )}
    </Form>
  );
}
