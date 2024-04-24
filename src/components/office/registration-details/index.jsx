import { Check, Clear, LightMode, Nightlight } from "@mui/icons-material";
import { Box, Card, CardContent, Chip, Typography } from "@mui/material";
import React from "react";
import { setPaymentReceived, setWaiverReceived } from "../../../api/firestore";
import Age from "../../Age";
import GenderIcon from "../../GenderIcon";
import ChildInfo from "./ChildInfo";
import PriceInfo from "./PriceInfo";
import WaiverInfo from "./WaiverInfo";

export default function RegistrationDetails({ registration }) {
  const doSetPaymentReceived = async (received) =>
    setPaymentReceived(registration.id, received);
  const doSetWaiverReceived = async (received) =>
    setWaiverReceived(registration.id, received);

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
        gap: 2,
      }}
    >
      <Card sx={{ gridColumn: "1 / -1" }}>
        <CardContent>
          <Typography variant="h5">
            {registration.child.firstName} {registration.child.lastName}
          </Typography>
          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mt: 1 }}>
            <Chip
              label={
                <>
                  <Age dateOfBirth={registration.child.dateOfBirth} /> Jahre
                </>
              }
            />
            <GenderIcon
              component={Chip}
              gender={registration.child.gender}
              label
            />
            {registration.child.sleepover && (
              <Chip icon={<Nightlight />} label="Übernachtung" />
            )}
            {registration.child.earlyCare && (
              <Chip icon={<LightMode />} label="Frühbetreuung" />
            )}
            <Chip
              label="Einverständnis"
              color={registration.waiver ? undefined : "error"}
              icon={registration.waiver ? <Check /> : <Clear />}
            />
            <Chip
              label="Bezahlung"
              color={registration.payment ? undefined : "error"}
              icon={registration.payment ? <Check /> : <Clear />}
            />
          </Box>
        </CardContent>
      </Card>
      <Box>
        <ChildInfo registration={registration} />
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <PriceInfo
          {...registration}
          setPaymentReceived={doSetPaymentReceived}
        />
        <WaiverInfo {...registration} setWaiverReceived={doSetWaiverReceived} />
      </Box>
    </Box>
  );
}
