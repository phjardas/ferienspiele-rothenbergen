import { Box } from '@material-ui/core';

export default function Stack({ children }) {
  return <Box sx={{ display: 'flex', flexDirection: 'column', gap: 8 }}>{children}</Box>;
}
