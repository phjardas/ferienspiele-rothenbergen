import React from 'react';
import config from '../../api/config';
import Date from '../Date';
import H2 from '../H2';
import P from '../P';
import Infos from './Infos';
import RegistrationStatus from './RegistrationStatus';

export default function Dashboard() {
  const { title, startDate, endDate } = config;

  return (
    <>
      <H2>{title}</H2>
      <P>Ökumenische Ferienspiele in Rothenbergen</P>
      <P>
        Von <Date value={startDate} /> bis <Date value={endDate} />
      </P>
      <RegistrationStatus />
      <Infos />
    </>
  );
}
