import { Link, Typography } from "@mui/material";
import React from "react";
import { Link as RouterLink } from "react-router-dom";

export default function Footer() {
  return (
    <Typography
      component="footer"
      variant="caption"
      sx={{ mt: 2, px: 3, "& a": { color: "inherit" } }}
    >
      Eine Veranstaltung der{" "}
      <Link href="http://www.kirche-aufdemberg.de/kinder-und-jugend/ferienspiele/index.html">
        Ev. Kirchengemeinde "Auf dem Berg"
      </Link>
      , der{" "}
      <Link href="http://www.emk-rothenbergen.de/Ferienspiele/">
        Ev.-methodistischen Kirche Rothenbergen
      </Link>{" "}
      und der{" "}
      <Link href="http://kath-kirche-mhg.de/">
        Kath. Kirchengemeinde Christkönig
      </Link>{" "}
      –{" "}
      <Link component={RouterLink} to="/impressum">
        Impressum
      </Link>{" "}
      –{" "}
      <Link component={RouterLink} to="/datenschutz">
        Datenschutz
      </Link>
    </Typography>
  );
}
