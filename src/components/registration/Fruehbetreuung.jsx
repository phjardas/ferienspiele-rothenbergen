import { NightsStay as EarlyIcon } from "@mui/icons-material";
import { Alert, Grid, LinearProgress, Typography } from "@mui/material";
import React from "react";
import { Field } from "react-final-form";
import config from "../../api/config";
import { useRegistrationStatus } from "../../api/firestore";
import FieldSet from "../form/FieldSet";
import Switch from "../form/Switch";

export default function Fruehbetreuung() {
  return (
    <FieldSet icon={<EarlyIcon />} title="Früh(not)betreuung">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography>
            Bitte beachten Sie, dass die Ferienspiele jeden Tag regulär um 9.00
            Uhr (Einlass auf das Gelände) beginnen und das Frühbetreuungsangebot
            nur für Familien bestimmt ist, die keine andere Möglichkeit haben,
            Ihr Kind zu dieser früheren Uhrzeit zu betreuen (max.{" "}
            {config.earlyCarePlaces} Plätze). Danke für Ihr Verständnis!
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <FruehbetreuungSelect />
        </Grid>
      </Grid>
    </FieldSet>
  );
}

function FruehbetreuungSelect() {
  const { loading, data } = useRegistrationStatus();

  if (loading) return <LinearProgress />;

  if (!data.earlySpotsLeft) {
    return (
      <Alert severity="info">
        Leider sind alle Plätze der Frühbetreuung bereits belegt.
      </Alert>
    );
  }

  return (
    <Field
      name="child.earlyCare"
      component={Switch}
      type="checkbox"
      label="Ich benötige für mein Kind einen Frühbetreuungsplatz von 8.00 Uhr bis 9.00 Uhr."
    />
  );
}
