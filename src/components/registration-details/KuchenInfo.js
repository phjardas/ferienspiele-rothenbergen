import { Typography } from '@material-ui/core';
import React from 'react';
import Date from '../Date';

export default function KuchenInfo({ kuchen: { date, name } }) {
  if (date === 'none') return <Typography>Sie bringen leider keinen Kuchen mit.</Typography>;
  if (date === 'geschwister') return <Typography>Sie bringen bereits für ein Geschwisterkind einen Kuchen mit.</Typography>;

  return (
    <Typography>
      Sie bringen am{' '}
      <strong>
        <Date value={date} weekday="long" day="numeric" month="long" />
      </strong>{' '}
      eine(n) <strong>{name}</strong> mit. Vielen Dank!
    </Typography>
  );
}
