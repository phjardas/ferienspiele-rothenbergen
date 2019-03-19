import { Grid } from '@material-ui/core';
import { LocalHospital as HospitalIcon } from '@material-ui/icons';
import { TextField } from 'final-form-material-ui';
import React from 'react';
import { Field } from 'react-final-form';
import FieldSet from '../form/FieldSet';
import { required } from '../form/validation';

export default function EmergencyContact() {
  return (
    <FieldSet
      icon={<HospitalIcon />}
      title="Notfallkontakt"
      subtitle="Bitte geben Sie hier ein, wen wir im Falle eines Notfalles anrufen sollen."
    >
      <Grid container spacing={24}>
        <Grid item xs={12} md={6}>
          <Field name="emergencyContact.name" component={TextField} label="Name" required fullWidth validate={required} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Field name="emergencyContact.phone" component={TextField} type="tel" label="Telefon" required fullWidth validate={required} />
        </Grid>
      </Grid>
    </FieldSet>
  );
}
