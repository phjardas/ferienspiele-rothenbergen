import { Box, useTheme } from "@mui/material";

export default function Stack({ spacing = 2, direction = "column", children }) {
  const theme = useTheme();

  return (
    <Box sx={{ display: "flex", flexDirection: direction, gap: spacing }}>
      {children}
    </Box>
  );
}
