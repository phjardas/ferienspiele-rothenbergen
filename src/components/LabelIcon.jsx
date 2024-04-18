import { Box } from "@mui/material";
import React from "react";

export default function LabelIcon({ icon, label, ...props }) {
  const Icon = icon;

  return (
    <Box
      {...props}
      sx={{ display: "inline-flex", alignItems: "center", ...props.sx }}
    >
      <Icon sx={label ? { marginRight: 1 } : {}} />
      {label}
    </Box>
  );
}
