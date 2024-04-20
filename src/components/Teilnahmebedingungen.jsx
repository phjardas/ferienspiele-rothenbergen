import { Alert, LinearProgress, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { createWaiver } from "../api/waiver";

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

  if (loading) return <LinearProgress />;
  if (error) return <Alert severity="error">{error.message}</Alert>;

  return (
    <Typography component="div" dangerouslySetInnerHTML={{ __html: waiver }} />
  );
}
