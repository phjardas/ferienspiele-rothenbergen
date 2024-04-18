import { Box, CircularProgress } from "@mui/material";
import React from "react";
import Layout from "./Layout";

export default function GlobalLoader({ noLayout, ...props }) {
  const content = (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress size={80} color="secondary" />
    </Box>
  );

  return noLayout ? content : <Layout {...props}>{content}</Layout>;
}
