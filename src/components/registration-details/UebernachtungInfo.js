import { Typography } from '@material-ui/core';
import React from 'react';

export default function UebernachtungInfo({ child: { firstName }, uebernachtung: { type } }) {
  return type === 'uebernachtung' ? (
    <Typography>{firstName} nimmt an der Übernachtung von Donnerstag auf Freitag teil.</Typography>
  ) : (
    <Typography>{firstName} nimmt nicht an der Übernachtung teil und wird am Donnerstag zur gewohnten Uhrzeit abgeholt.</Typography>
  );
}
