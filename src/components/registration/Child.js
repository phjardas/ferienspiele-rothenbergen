import { Grid } from '@material-ui/core';
import { ChildCare as ChildIcon } from '@material-ui/icons';
import React from 'react';
import { Field } from 'react-final-form';
import config from '../../api/config';
import FieldSet from '../form/FieldSet';
import Input from '../form/Input';
import Radios from '../form/Radios';
import Select from '../form/Select';
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
          <Field name="child.firstName" component={Input} label="Vorname" required fullWidth validate={required} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Field name="child.lastName" component={Input} label="Nachname" required fullWidth validate={required} />
        </Grid>

        <Grid item xs={12} md={6}>
          <Radios
            name="child.gender"
            label="Geschlecht"
            required
            validate={required}
            options={[{ value: 'm', label: 'männlich' }, { value: 'f', label: 'weiblich' }, { value: 'd', label: 'divers' }]}
            row
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Field
            name="child.dateOfBirth"
            component={Input}
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
            fullWidth
            validate={required}
            options={config.shirtSizes}
          />
        </Grid>

        <Grid item xs={12}>
          <Field
            name="child.miscellaneous"
            component={Input}
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
