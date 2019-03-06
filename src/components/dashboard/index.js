import React from 'react';
import config from '../../api/config';
import Date from '../Date';
import Infos from './Infos';
import RegistrationStatus from './RegistrationStatus';

export default function Dashboard() {
  return (
    <>
      <h2>{config.title}</h2>
      <p>Ökumenische Ferienspiele in Rothenbergen</p>
      <p>
        Von <Date value={config.startDate} /> bis <Date value={config.endDate} />
      </p>
      <RegistrationStatus registrationDeadline={config.registrationDeadline} />
      <Infos startDate={config.startDate} endDate={config.endDate} prices={config.prices} />
    </>
  );
}
