import { Typography } from "@mui/material";
import React from "react";

export default function H2({ variant = "h6", paragraph = true, ...props }) {
  return (
    <Typography
      component="h2"
      variant={variant}
      paragraph={paragraph}
      {...props}
    />
  );
}
