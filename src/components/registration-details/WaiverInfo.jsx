import {
  Alert,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import React from "react";
import config from "../../api/config";
import Date from "../Date";
import H3 from "../H3";
import PrintWaiverButton from "../PrintWaiverButton";
import Stack from "../Stack";

export default function WaiverInfo(registration) {
  return (
    <Card>
      <CardContent>
        <Stack>
          <H3>Einverständniserklärung</H3>
          <Alert severity="error">
            Sie haben die Einverständniserklärung noch nicht abgegeben.
          </Alert>
          <Typography>
            Bitte drucken Sie jetzt die Einverständniserklärung aus und schicken
            Sie sie{" "}
            <strong>
              bis zum <Date value={config.waiverDeadline} />
            </strong>{" "}
            unterschrieben an uns zurück oder bringen Sie sie im Gemeindebüro
            der ev. Kirche (Paul-Gerhardt Str.2 in Gründau-Lieblos) vorbei.
          </Typography>
        </Stack>
      </CardContent>
      <CardActions>
        <PrintWaiverButton
          registration={registration}
          color="primary"
          variant="contained"
        >
          Einverständniserklärung drucken
        </PrintWaiverButton>
      </CardActions>
    </Card>
  );
}
