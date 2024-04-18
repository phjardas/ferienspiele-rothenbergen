import {
  ArrowForward,
  Cake as CakeIcon,
  ChildCare as ChildIcon,
  LocalHospital as HospitalIcon,
  Person as PersonIcon,
} from "@mui/icons-material";
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import React from "react";
import Stack from "../../../components/Stack";
import Age from "../../Age";
import Date from "../../Date";
import GenderIcon from "../../GenderIcon";
import ShirtSize from "../../ShirtSize";
import YesNoLabel from "../../YesNoLabel";
import KuchenInfo from "./KuchenInfo";

export default function ChildInfo({ registration }) {
  return (
    <>
      <Grid item xs={12}>
        <Card>
          <CardHeader
            avatar={<ChildIcon />}
            title={`${registration.child.firstName} ${registration.child.lastName}`}
          />
          <CardContent>
            <Stack>
              <Typography>
                Geschlecht:{" "}
                <GenderIcon gender={registration.child.gender} label />
              </Typography>
              <Typography>
                Geburtstag: <Date value={registration.child.dateOfBirth} />
              </Typography>
              <Typography>
                Alter: <Age dateOfBirth={registration.child.dateOfBirth} />{" "}
                Jahre bei Beginn der Ferienspiele
              </Typography>
              <Typography>
                T-Shirt: <ShirtSize shirtSize={registration.child.shirtSize} />
              </Typography>
              <Typography>{registration.child.foodPreference}</Typography>
              {registration.child.miscellaneous && (
                <Typography whiteSpace="pre-line">
                  Besonderheiten:
                  <br />
                  {registration.child.miscellaneous}
                </Typography>
              )}
              {registration.child.friends && (
                <Typography whiteSpace="pre-line">
                  Freunde:
                  <br />
                  {registration.child.friends}
                </Typography>
              )}
            </Stack>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardHeader avatar={<PersonIcon />} title="Eltern" />
          <CardContent>
            <Stack>
              <Typography>
                Telefon:{" "}
                <Link href={`tel:${registration.parent.phone}`}>
                  {registration.parent.phone}
                </Link>
              </Typography>
              <Typography>
                E-Mail:{" "}
                <Link href={`mailto:${registration.parent.email}`}>
                  {registration.parent.email}
                </Link>
              </Typography>
              <Typography>
                {registration.parent.street}
                <br />
                {registration.parent.plz} {registration.parent.city}
              </Typography>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardHeader avatar={<HospitalIcon />} title="Notfallkontakt" />
          <CardContent>
            <Typography>
              {registration.emergencyContact.name}:{" "}
              <Link href={`tel:${registration.emergencyContact.phone}`}>
                {registration.emergencyContact.phone}
              </Link>
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardHeader avatar={<ArrowForward />} title="Abholung" />
          <CardContent>
            <Stack>
              {registration.child.authorizedFetchers && (
                <Typography className={classes.pre}>
                  Abholer:
                  <br />
                  {registration.child.authorizedFetchers}
                </Typography>
              )}
              <Typography>
                <YesNoLabel
                  value={registration.child.walkHome}
                  label={
                    registration.child.walkHome
                      ? "Darf alleine laufen"
                      : "Darf nicht alleine laufen"
                  }
                />
              </Typography>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardHeader avatar={<CakeIcon />} title="Optionen" />
          <CardContent>
            <Stack>
              <KuchenInfo kuchen={registration.kuchen} />
              <Typography>
                <YesNoLabel
                  value={registration.child.sleepover}
                  label="Übernachtung"
                />
              </Typography>
              <Typography>
                <YesNoLabel
                  value={registration.child.earlyCare}
                  label="Frühbetreuung"
                />
              </Typography>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
}
