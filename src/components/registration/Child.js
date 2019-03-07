import { Grid, MenuItem } from '@material-ui/core';
import { ChildCare as ChildIcon } from '@material-ui/icons';
import { Select, TextField } from 'final-form-material-ui';
import React from 'react';
import { Field } from 'react-final-form';
import config from '../../api/config';
import FieldSet from '../form/FieldSet';
import Radios from '../form/Radios';
import Switch from '../form/Switch';
import { required } from '../form/validation';

export default function Child() {
  return (
    <FieldSet
      icon={<ChildIcon />}
      title="Ihr Kind"
      subtitle={
        <>
          Bitte geben Sie hier die persönlichen Daten <strong>Ihres Kindes</strong> ein.
        </>
      }
    >
      <Grid container spacing={24}>
        <Grid item xs={12} md={6}>
          <Field name="child.firstName" component={TextField} label="Vorname" required fullWidth validate={required} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Field name="child.lastName" component={TextField} label="Nachname" required fullWidth validate={required} />
        </Grid>

        <Grid item xs={12} md={6}>
          <Radios name="child.gender" label="Geschlecht" required validate={required} options={config.genders} groupProps={{ row: true }} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Field
            name="child.dateOfBirth"
            component={TextField}
            type="date"
            label="Geburtsdatum"
            required
            fullWidth
            validate={required}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <Field
            name="child.shirtSize"
            component={Select}
            label="T-Shirt-Größe"
            required
            formControlProps={{ fullWidth: true }}
            validate={required}
          >
            {config.shirtSizes.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Field>
        </Grid>

        <Grid item xs={12}>
          <Field
            name="child.miscellaneous"
            component={TextField}
            label="Besonderheiten"
            multiline
            fullWidth
            helperText="Muss Ihr Kind regelmäßig Medikamente zu sich nehmen? Gibt es Besonderheiten zu beachten? z.B. ADS, Allergien, Nahrungsunverträglichkeiten, religiöse Essensvorschriften, Einnässen etc."
          />
        </Grid>

        <Grid item xs={12}>
          <Field name="child.vegetarian" component={Switch} type="checkbox" label="Mein Kind soll vegetarisch essen" />
        </Grid>

        <Grid item xs={12}>
          <Field
            name="child.nextChild"
            component={Switch}
            type="checkbox"
            label="Wir haben bereits ein anderes Kind unserer Familie bei den Ferienspielen angemeldet"
          />
        </Grid>
      </Grid>
    </FieldSet>
  );
}
