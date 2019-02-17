import React from 'react';
import { Field } from 'react-final-form';
import { Row } from 'reactstrap';
import Input from '../form/Input';
import { required } from '../form/validation';
import Icon from '../Icon';

export default function Child() {
  return (
    <fieldset className="mt-5">
      <legend>
        <Icon icon="child" className="mr-1" /> Ihr Kind
      </legend>
      <p>
        Bitte geben Sie hier die persönlichen Daten <strong>Ihres Kindes</strong> ein.
      </p>
      <Row form>
        <Field name="child.firstName" component={Input} label="Vorname" required validate={required} className="col-md-6" />
        <Field name="child.lastName" component={Input} label="Nachname" required validate={required} className="col-md-6" />
      </Row>
    </fieldset>
  );
}
