import { EuroSymbol as EuroIcon } from "@mui/icons-material";
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
import Stack from "../../Stack";
import PriceTable from "../../registration/PriceTable";

export default function PriceInfo({ price, payment, setPaymentReceived }) {
  return (
    <Card>
      <CardHeader avatar={<EuroIcon />} title="Teilnahmebeitrag" />
      <CardContent>
        <Stack>
          {payment ? (
            <Alert severity="info">
              Zahlung erhalten am <Date value={payment.receivedAt} />.
            </Alert>
          ) : (
            <Alert severity="error">Noch nicht bezahlt.</Alert>
          )}
          <PriceTable price={price} />
        </Stack>
      </CardContent>
      <CardActions>
        {payment ? (
          <Button color="error" onClick={() => setPaymentReceived(false)}>
            Zahlung doch nicht erhalten
          </Button>
        ) : (
          <Button
            color="primary"
            variant="contained"
            onClick={() => setPaymentReceived(true)}
          >
            Zahlung erhalten
          </Button>
        )}
      </CardActions>
    </Card>
  );
}
