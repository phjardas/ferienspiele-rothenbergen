import { Card, CardContent, Typography } from "@mui/material";
import React from "react";
import Date from "../Date";
import H3 from "../H3";

export default function KuchenInfo(props) {
  if (props.kuchen.date === "team") return null;

  return (
    <Card>
      <CardContent>
        <H3>Kuchen</H3>
        <KuchenInfoData {...props} />
      </CardContent>
    </Card>
  );
}

function KuchenInfoData({ kuchen: { date, name } }) {
  if (date === "none")
    return <Typography>Sie bringen leider keinen Kuchen mit.</Typography>;

  if (date === "geschwister")
    return (
      <Typography>
        Sie bringen bereits für ein Geschwisterkind einen Kuchen mit.
      </Typography>
    );

  return (
    <Typography>
      Sie bringen am{" "}
      <strong>
        <Date value={date} weekday="long" day="numeric" month="long" />
      </strong>{" "}
      eine(n) <strong>{name}</strong> mit. Vielen Dank!
    </Typography>
  );
}
