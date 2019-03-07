import { Typography } from '@material-ui/core';
import React from 'react';

export default function P({ ...props }) {
  return <Typography paragraph {...props} />;
}
