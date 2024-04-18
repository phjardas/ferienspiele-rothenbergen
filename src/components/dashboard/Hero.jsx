import { Box, Card, CardContent, Typography } from "@mui/material";
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
          xs: "linear-gradient(90deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(/hero.avif)",
          sm: "linear-gradient(90deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0)), url(/hero.avif)",
        },
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "top right",
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            color: "white",
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
        </Box>
      </CardContent>
    </Card>
  );
}
