import { Box } from "@mui/material";
import React from "react";

export default function LabelIcon({ icon, label, ...props }) {
  const Icon = icon;

  return (
    <Box
      component="span"
      {...props}
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: 0.5,
        ...props.sx,
      }}
    >
      <Icon />
      {label}
    </Box>
  );
}
