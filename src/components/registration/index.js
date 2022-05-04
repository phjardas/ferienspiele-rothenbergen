import { FORM_ERROR } from 'final-form';
import React, { useMemo, useState } from 'react';
import { Form } from 'react-final-form';
import { createTestData } from '../../api/testdata';
import Actions from './Actions';
import Child from './Child';
import Consent from './Consent';
import EmergencyContact from './EmergencyContact';
import Fruehbetreuung from './Fruehbetreuung';
import Kuchen from './Kuchen';
import Parents from './Parents';
import Price from './Price';
import { priceCalculator, withPrice } from './priceCalculator';
import Welcome from './Welcome';

const emptyValues = {
  child: {},
  parent: {},
  emergencyContact: {},
  uebernachtung: {},
  kuchen: {},
};

const enableTestData = process.env.NODE_ENV !== 'production';
const createInitialValues = enableTestData ? createTestData : () => emptyValues;
const decorators = [priceCalculator];

export default function Registration({ initialValues: originalValues, onSubmit }) {
  const [initialValues, setInitialValues] = useState(withPrice(originalValues ? originalValues : createInitialValues()));
  const updateTestData = useMemo(() => enableTestData && (() => setInitialValues(createInitialValues())), []);

  const submit = async (data) => {
    try {
      await onSubmit(data);
    } catch (error) {
      console.warn('Error submitting registration:', error);
      return { [FORM_ERROR]: error.message };
    }
  };

  return (
    <Form onSubmit={submit} initialValues={initialValues} decorators={decorators}>
      {({ handleSubmit, invalid, submitting, submitError }) => (
        <form onSubmit={handleSubmit} noValidate>
          <Welcome createTestData={updateTestData} geschwisterkind={!!originalValues} />
          <Child />
          <Parents />
          <EmergencyContact />
          <Fruehbetreuung />
          <Kuchen />
          <Price />
          <Consent />
          <Actions invalid={invalid} submitting={submitting} submitError={submitError} />
        </form>
      )}
    </Form>
  );
}
