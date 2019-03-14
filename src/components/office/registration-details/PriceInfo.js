import { Card, CardActions, CardContent, CardHeader } from '@material-ui/core';
import { EuroSymbol as EuroIcon } from '@material-ui/icons';
import React from 'react';
import Alert from '../../Alert';
import Date from '../../Date';
import PriceTable from '../../registration/PriceTable';
import SpinningButton from '../../SpinningButton';

export default function PriceInfo({ price, payment, setPaymentReceived }) {
  return (
    <Card>
      <CardHeader avatar={<EuroIcon />} title="Teilnahmebeitrag" />
      <CardContent>
        {payment ? (
          <Alert color="info">
            Zahlung erhalten am <Date value={payment.receivedAt} />.
          </Alert>
        ) : (
          <Alert color="error">Noch nicht bezahlt.</Alert>
        )}
      </CardContent>
      <CardContent>
        <PriceTable price={price} />
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
