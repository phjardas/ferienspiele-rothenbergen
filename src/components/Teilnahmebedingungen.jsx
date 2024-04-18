import { Alert, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { createWaiver } from "../api/waiver";
import GlobalLoader from "./GlobalLoader";

export default function Teilnahmebedingungen() {
  const [{ loading, error, waiver }, setState] = useState({ loading: true });

  const loadWaiver = async () => {
    try {
      const waiver = await (await createWaiver("default", "html")).text();
      setState({ loading: false, waiver });
    } catch (error) {
      setState({ loading: false, error });
    }
  };

  useEffect(() => {
    loadWaiver();
  }, []);

  if (loading) return <GlobalLoader noLayout />;
  if (error) return <Alert severity="error">{error.message}</Alert>;

  return (
    <Typography component="div" dangerouslySetInnerHTML={{ __html: waiver }} />
  );
}
