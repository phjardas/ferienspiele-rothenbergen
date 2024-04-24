import { Box } from "@mui/material";

export default function Stack({ spacing = 2, direction = "column", children }) {
  return (
    <Box sx={{ display: "flex", flexDirection: direction, gap: spacing }}>
      {children}
    </Box>
  );
}
