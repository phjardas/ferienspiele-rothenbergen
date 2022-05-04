import { Box, CardHeader } from '@material-ui/core';
import React from 'react';

export default function FieldSet({ icon, title, subtitle, children }) {
  return (
    <Box sx={{ my: 3 }}>
      {title && <CardHeader avatar={icon} title={title} subheader={subtitle} />}
      <Box sx={{ py: 2 }}>{children}</Box>
    </Box>
  );
}
