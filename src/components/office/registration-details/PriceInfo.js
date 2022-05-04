import { CardHeader } from '@material-ui/core';
import { EuroSymbol as EuroIcon } from '@material-ui/icons';
import React from 'react';
import Alert from '../../Alert';
import Card from '../../Card';
import CardActions from '../../CardActions';
import CardContent from '../../CardContent';
import Date from '../../Date';
import PriceTable from '../../registration/PriceTable';
import SpinningButton from '../../SpinningButton';
import Stack from '../../Stack';

export default function PriceInfo({ price, payment, setPaymentReceived }) {
  return (
    <Card>
      <CardHeader avatar={<EuroIcon />} title="Teilnahmebeitrag" />
      <CardContent>
        <Stack>
          {payment ? (
            <Alert color="info">
              Zahlung erhalten am <Date value={payment.receivedAt} />.
            </Alert>
          ) : (
            <Alert color="error">Noch nicht bezahlt.</Alert>
          )}
          <PriceTable price={price} />
        </Stack>
      </CardContent>
      <CardActions>
        {payment ? (
          <SpinningButton color="error" onClick={() => setPaymentReceived(false)}>
            Zahlung doch nicht erhalten
          </SpinningButton>
        ) : (
          <SpinningButton color="primary" variant="contained" onClick={() => setPaymentReceived(true)}>
            Zahlung erhalten
          </SpinningButton>
        )}
      </CardActions>
    </Card>
  );
}
