import { Alert } from "@mui/material";
import React from "react";
import Layout from "./Layout";

export default function GlobalError({ error, ...props }) {
  return (
    <Layout {...props}>
      <Alert severity="error">{error.message}</Alert>
    </Layout>
  );
}
