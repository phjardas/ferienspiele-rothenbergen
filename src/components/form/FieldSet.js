import { Box, Typography } from '@material-ui/core';
import React from 'react';

export default function FieldSet({ icon, title, subtitle, children }) {
  return (
    <Box sx={{ my: 3 }}>
      {title && (
        <Box sx={{ display: 'flex', mb: 1 }}>
          {icon && <Box sx={{ mr: 1, paddingTop: '2px' }}>{icon}</Box>}
          <Box>
            <Typography variant="h6">{title}</Typography>
            {subtitle && <Typography variant="subtitle1">{subtitle}</Typography>}
          </Box>
        </Box>
      )}
      <Box sx={{ py: 2 }}>{children}</Box>
    </Box>
  );
}
