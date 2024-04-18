import { ChildCare as ChildIcon } from "@mui/icons-material";
import { Grid, MenuItem } from "@mui/material";
import React from "react";
import { Field } from "react-final-form";
import config from "../../api/config";
import FieldSet from "../form/FieldSet";
import Radios from "../form/Radios";
import Select from "../form/Select";
import Switch from "../form/Switch";
import TextField from "../form/TextField";
import { required } from "../form/validation";

export default function Child() {
  return (
    <FieldSet
      icon={<ChildIcon />}
      title="Ihr Kind"
      subtitle={
        <>
          Bitte geben Sie hier die persönlichen Daten{" "}
          <strong>Ihres Kindes</strong> ein.
        </>
      }
    >
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Field
            name="child.firstName"
            component={TextField}
            label="Vorname"
            required
            fullWidth
            validate={required}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Field
            name="child.lastName"
            component={TextField}
            label="Nachname"
            required
            fullWidth
            validate={required}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Radios
            name="child.gender"
            label="Geschlecht"
            required
            validate={required}
            options={config.genders}
            groupProps={{ row: true }}
          />
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
            {config.shirtSizes.map((option) => (
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
          <Field
            name="child.friends"
            component={TextField}
            label="Freunde"
            multiline
            fullWidth
            helperText="Wir bemühen uns, bei der Gruppeneinteilung wenigstens einen Freundeswunsch zu erfüllen, können aber keine Garantie abgeben. Danke für Ihr Verständnis!"
          />
        </Grid>

        <Grid item xs={12}>
          <Field
            name="child.foodPreference"
            component={Select}
            label="Verpflegung"
            required
            formControlProps={{ fullWidth: true }}
            validate={required}
          >
            {config.foodPreferences.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Field>
        </Grid>

        <Grid item xs={12}>
          <Field
            name="child.nextChild"
            component={Switch}
            type="checkbox"
            label="Wir haben bereits ein Geschwisterkind bei den Ferienspielen angemeldet"
          />
        </Grid>

        <Grid item xs={12}>
          <Field
            name="child.sleepover"
            component={Switch}
            type="checkbox"
            label="Mein Kind nimmt an der Übernachtung von Donnerstag auf Freitag in der evangelisch-methodistischen Friedenskirche in Rothenbergen teil."
          />
        </Grid>

        <Grid item xs={12}>
          <Field
            name="child.authorizedFetchers"
            component={TextField}
            label="Diese Personen sind berechtigt, mein Kind nach Programmende abzuholen"
            multiline
            fullWidth
            helperText="Bitte eine Zeile pro Person mit vollständigen Namen und, falls bekannt, Geburtsdatum."
          />
        </Grid>

        <Grid item xs={12}>
          <Field
            name="child.walkHome"
            component={Switch}
            type="checkbox"
            label="Mein Kind darf alleine nach Hause gehen."
          />
        </Grid>
      </Grid>
    </FieldSet>
  );
}
