import { Box, useTheme } from '@material-ui/core';

export default function Stack({ spacing = 1, direction = 'column', children }) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: direction,
        gap: theme.spacing(spacing),
      }}
    >
      {children}
    </Box>
  );
}
