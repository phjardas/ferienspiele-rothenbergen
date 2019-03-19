import { Typography } from '@material-ui/core';
import React from 'react';
import YesNoLabel from '../../YesNoLabel';

export default function UebernachtungInfo({ uebernachtung: { type } }) {
  return (
    <Typography>
      <YesNoLabel value={type === 'uebernachtung'} label={`Nimmt ${type === 'uebernachtung' ? '' : 'nicht '}an der Übernachtung teil.`} />
    </Typography>
  );
}
