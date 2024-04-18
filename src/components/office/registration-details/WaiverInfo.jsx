import { Assignment as AssignmentIcon } from "@mui/icons-material";
import {
  Alert,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
} from "@mui/material";
import React from "react";
import Date from "../../Date";
import PrintWaiverButton from "../../PrintWaiverButton";

export default function WaiverInfo({ setWaiverReceived, ...registration }) {
  return (
    <Card>
      <CardHeader avatar={<AssignmentIcon />} title="Einverständniserklärung" />
      <CardContent>
        {registration.waiver ? (
          <Alert severity="info">
            Einverständniserklärung erhalten am{" "}
            <Date value={registration.waiver.receivedAt} />.
          </Alert>
        ) : (
          <Alert severity="error">Noch nicht abgegeben.</Alert>
        )}
      </CardContent>
      <CardActions>
        {registration.waiver ? (
          <Button color="error" onClick={() => setWaiverReceived(false)}>
            Einverständnis doch nicht erhalten
          </Button>
        ) : (
          <Button
            color="primary"
            variant="contained"
            onClick={() => setWaiverReceived(true)}
          >
            Einverständnis erhalten
          </Button>
        )}
        <PrintWaiverButton color="primary" registration={registration}>
          drucken
        </PrintWaiverButton>
      </CardActions>
    </Card>
  );
}
