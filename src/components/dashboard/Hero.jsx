import { Card, CardContent, Typography } from "@mui/material";
import React from "react";
import config from "../../api/config";
import Date from "../Date";
import H2 from "../H2";
import RegistrationStatus from "./RegistrationStatus";

const { app, title, startDate, endDate } = config;

export default function Hero() {
  return (
    <Card
      sx={{
        backgroundImage: {
          xs: "linear-gradient(rgba(0, 0, 0, 0.0) 0% , rgba(0, 0, 0, 0.5) 50%, rgba(0, 0, 0, 0.5) 100%), url(/hero-2025.webp)",
          md: "linear-gradient(90deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0)), url(/hero-2025.webp)",
        },
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "85% 0%",
        minHeight: { xs: "50vh", md: undefined },
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardContent
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          gap: 2,
          color: "var(--mui-palette-md-inverse-on-surface)",
          width: { xs: "100%", md: "50%" },
        }}
      >
        <H2 component="h1" variant="h1" paragraph={false}>
          {title}
        </H2>
        <Typography variant="h5">{app}</Typography>
        <Typography>
          Von <Date value={startDate} /> bis <Date value={endDate} />
        </Typography>
        <RegistrationStatus />
      </CardContent>
    </Card>
  );
}
