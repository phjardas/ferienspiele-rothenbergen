import { Cake as CakeIcon } from "@mui/icons-material";
import {
  Alert,
  Box,
  Chip,
  Grid,
  LinearProgress,
  Typography,
} from "@mui/material";
import React from "react";
import { Field } from "react-final-form";
import config from "../../api/config";
import { useKuchenStatistics } from "../../api/firestore";
import Date from "../Date";
import Condition from "../form/Condition";
import FieldSet from "../form/FieldSet";
import Radios from "../form/Radios";
import TextField from "../form/TextField";
import { required } from "../form/validation";

function isKuchenSelected(date) {
  return date && date !== "none" && date !== "geschwister";
}

function KuchenDate({ value }) {
  return <Date value={value} weekday="long" day="numeric" month="long" />;
}

function KuchenInfo({ date }) {
  const { loading, error, data } = useKuchenStatistics();
  if (loading) return <LinearProgress />;
  if (error) return <Alert severity="error">{error.message}</Alert>;

  const kuchen = data?.[date];
  if (!kuchen || !kuchen.length) return null;
  return (
    <>
      <Typography paragraph>
        Wir haben schon Zusagen für folgende Kuchen am{" "}
        <KuchenDate value={date} />:
      </Typography>
      <Box sx={{ display: "flex", gap: 8 }}>
        {kuchen.sort().map((k, i) => (
          <Chip key={i} variant="outlined" label={k} />
        ))}
      </Box>
    </>
  );
}

export default function Kuchen() {
  return (
    <FieldSet icon={<CakeIcon />} title="Kuchen">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography>
            Um die Ferienspiele lecker und abwechslungsreich zu gestalten, sind
            auch Sie gefragt! Wir benötigen insgesamt über 50 Kuchen von den
            Eltern. Damit wir gut planen können, bitten wir Sie hier um Ihren
            Eintrag. Vielen Dank!
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Radios
            name="kuchen.date"
            required
            options={[
              ...config.kuchen.map(({ date }) => ({
                value: date,
                label: (
                  <>
                    Ich bringe am{" "}
                    <strong>
                      <KuchenDate value={date} />
                    </strong>{" "}
                    einen Kuchen mit.
                  </>
                ),
              })),
              {
                value: "none",
                label: `Ich kann leider an keinem der Tage einen Kuchen mitbringen. (zzgl. € ${config.prices.noCake})`,
              },
              {
                value: "geschwister",
                label:
                  "Ich bringe bereits für ein Geschwisterkind einen Kuchen mit.",
              },
            ]}
          />
        </Grid>

        <Condition when="kuchen.date" is={isKuchenSelected}>
          {(date) => (
            <>
              <Grid item xs={12} lg={6}>
                <Field
                  name="kuchen.name"
                  component={TextField}
                  label="Name des Kuchens"
                  required
                  fullWidth
                  validate={required}
                  helperText="Bitte bringen Sie nur halbwegs trockene Rührkuchen mit, keine Torten oder Kuchen mit Sahne."
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <KuchenInfo date={date} />
              </Grid>
            </>
          )}
        </Condition>
      </Grid>
    </FieldSet>
  );
}
