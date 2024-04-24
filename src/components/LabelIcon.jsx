import { Box } from "@mui/material";
import React from "react";

export default function LabelIcon({ icon, label, sx, ...props }) {
  return (
    <Box
      component="span"
      sx={{ display: "inline-flex", alignItems: "center", gap: 0.5, ...sx }}
      {...props}
    >
      {icon}
      {label}
    </Box>
  );
}
