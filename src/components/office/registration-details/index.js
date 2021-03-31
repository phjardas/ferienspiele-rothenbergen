import { Grid } from '@material-ui/core';
import React from 'react';
import { setPaymentReceived, setWaiverReceived } from '../../../api/firestore';
import ChildInfo from './ChildInfo';
import PriceInfo from './PriceInfo';
import WaiverInfo from './WaiverInfo';

export default function RegistrationDetails({ registration }) {
  const doSetPaymentReceived = async received => setPaymentReceived(registration.id, received);
  const doSetWaiverReceived = async received => setWaiverReceived(registration.id, received);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} lg={6}>
        <Grid container spacing={2}>
          <ChildInfo registration={registration} />
        </Grid>
      </Grid>
      <Grid item xs={12} lg={6}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <PriceInfo {...registration} setPaymentReceived={doSetPaymentReceived} />
          </Grid>
          <Grid item xs={12}>
            <WaiverInfo {...registration} setWaiverReceived={doSetWaiverReceived} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
