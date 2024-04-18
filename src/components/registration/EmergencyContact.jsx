import { LocalHospital as HospitalIcon } from "@mui/icons-material";
import { Grid } from "@mui/material";
import React from "react";
import { Field } from "react-final-form";
import FieldSet from "../form/FieldSet";
import TextField from "../form/TextField";
import { required } from "../form/validation";

export default function EmergencyContact() {
  return (
    <FieldSet
      icon={<HospitalIcon />}
      title="Notfallkontakt"
      subtitle="Bitte geben Sie hier ein, wen wir im Falle eines Notfalles anrufen sollen."
    >
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Field
            name="emergencyContact.name"
            component={TextField}
            label="Name"
            required
            fullWidth
            validate={required}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Field
            name="emergencyContact.phone"
            component={TextField}
            type="tel"
            label="Telefon"
            required
            fullWidth
            validate={required}
          />
        </Grid>
      </Grid>
    </FieldSet>
  );
}
