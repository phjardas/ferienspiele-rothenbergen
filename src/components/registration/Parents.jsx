import { Person as PersonIcon } from "@mui/icons-material";
import { Grid } from "@mui/material";
import React from "react";
import { Field } from "react-final-form";
import FieldSet from "../form/FieldSet";
import TextField from "../form/TextField";
import { required } from "../form/validation";

export default function Parents() {
  return (
    <FieldSet
      icon={<PersonIcon />}
      title="Erziehungsberechtigte(r)"
      subtitle={
        <>
          Bitte geben Sie hier <strong>Ihre eigenen Daten</strong> als
          Erziehungsberechtigte(r) des Kindes ein.
        </>
      }
    >
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Field
            name="parent.phone"
            component={TextField}
            type="tel"
            label="Telefon"
            required
            fullWidth
            validate={required}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Field
            name="parent.email"
            component={TextField}
            type="email"
            label="E-Mail-Adresse"
            required
            fullWidth
            validate={required}
          />
        </Grid>
        <Grid item xs={12}>
          <Field
            name="parent.street"
            component={TextField}
            type="street"
            label="Straße"
            required
            fullWidth
            validate={required}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Field
            name="parent.zip"
            component={TextField}
            type="zip"
            label="PLZ"
            required
            fullWidth
            validate={required}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Field
            name="parent.city"
            component={TextField}
            type="city"
            label="Ort"
            required
            fullWidth
            validate={required}
          />
        </Grid>
      </Grid>
    </FieldSet>
  );
}
