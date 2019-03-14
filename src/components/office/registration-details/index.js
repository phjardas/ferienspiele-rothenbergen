import { Grid } from '@material-ui/core';
import React, { useEffect } from 'react';
import { setPaymentReceived, setWaiverReceived } from '../../../api/firestore';
import { usePage } from '../../../api/page';
import ChildInfo from './ChildInfo';
import PriceInfo from './PriceInfo';
import WaiverInfo from './WaiverInfo';

export default function RegistrationDetails({ registration }) {
  const { setPage } = usePage();

  useEffect(
    () =>
      setPage({
        title: `${registration.child.firstName} ${registration.child.lastName}`,
        back: { to: '/office/anmeldungen' },
      }),
    [registration]
  );

  const doSetPaymentReceived = async received => setPaymentReceived(registration.id, received);
  const doSetWaiverReceived = async received => setWaiverReceived(registration.id, received);

  return (
    <Grid container spacing={24}>
      <Grid item xs={12} lg={6}>
        <Grid container spacing={24}>
          <ChildInfo registration={registration} />
        </Grid>
      </Grid>
      <Grid item xs={12} lg={6}>
        <Grid container spacing={24}>
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
