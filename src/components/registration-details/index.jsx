import { Alert, Button, Grid, Typography } from "@mui/material";
import qs from "qs";
import React from "react";
import Date from "../Date";
import LinkBehavior from "../LinkBehavior";
import Stack from "../Stack";
import KuchenInfo from "./KuchenInfo";
import PriceInfo from "./PriceInfo";
import WaiverInfo from "./WaiverInfo";

function createSiblingRegistrationLink(reg) {
  const params = {
    child: { lastName: reg.child.lastName, nextChild: true },
    parent: reg.parent,
    emergencyContact: reg.emergencyContact,
    kuchen: { date: "geschwister" },
    uebernachtung: reg.uebernachtung,
  };

  return `/anmeldung?${qs.stringify(params)}`;
}

export default function RegistrationDetails({ registration }) {
  const { registeredAt, child, year } = registration;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h3" paragraph>
          Herzlich Willkommen, {child.firstName}!
        </Typography>
        <Typography paragraph>
          Sie haben {child.firstName} am <Date value={registeredAt} /> zu den
          Ferienspielen {year} angemeldet.
        </Typography>
        <Button
          component={LinkBehavior}
          href={createSiblingRegistrationLink(registration)}
          color="primary"
          variant="contained"
        >
          Geschwisterkind anmelden
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Alert severity="error">
          Die Anmeldung ist noch nicht abgeschlossen. Bitte beachten Sie die
          folgenden Hinweise.
        </Alert>
      </Grid>
      <Grid item xs={12} md={6}>
        <PriceInfo {...registration} />
      </Grid>
      <Grid item xs={12} md={6}>
        <Stack spacing={2}>
          <WaiverInfo {...registration} />
          <KuchenInfo {...registration} />
        </Stack>
      </Grid>
    </Grid>
  );
}
