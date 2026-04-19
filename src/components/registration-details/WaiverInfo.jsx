import { Card, CardActions, CardContent, Typography } from "@mui/material";
import config from "../../api/config";
import Date from "../Date";
import H3 from "../H3";
import PrintWaiverButton from "../PrintWaiverButton";
import Stack from "../Stack";

export default function WaiverInfo(registration) {
  return (
    <Card>
      <CardContent>
        <H3>Einverständniserklärung</H3>
        <Stack>
          <Typography>
            Bitte drucken Sie jetzt die Einverständniserklärung aus und schicken
            Sie sie{" "}
            <strong>
              bis zum <Date value={config.waiverDeadline} />
            </strong>{" "}
            unterschrieben an uns zurück oder werfen Sie sie bei Pfarrerin
            Ligaya Jardas (Schieferbergstraße 33 in Niedergründau) ein.
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
