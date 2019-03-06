import { Grid } from '@material-ui/core';
import { Person as PersonIcon } from '@material-ui/icons';
import React from 'react';
import { Field } from 'react-final-form';
import FieldSet from '../form/FieldSet';
import Input from '../form/Input';
import { required } from '../form/validation';

export default function Parents() {
  return (
    <FieldSet
      icon={<PersonIcon />}
      title="Erziehungsberechtigte(r)"
      subtitle={
        <>
          Bitte geben Sie hier <strong>Ihre eigenen Daten</strong> als Erziehungsberechtigte(r) des Kindes ein.
        </>
      }
    >
      <Grid container spacing={24}>
        <Grid item xs={12} md={6}>
          <Field name="parent.phone" component={Input} type="tel" label="Telefon" required fullWidth validate={required} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Field name="parent.email" component={Input} type="email" label="E-Mail-Adresse" required fullWidth validate={required} />
        </Grid>
      </Grid>
    </FieldSet>
  );
}
