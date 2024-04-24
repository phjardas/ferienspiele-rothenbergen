import { Typography } from "@mui/material";
import React from "react";
import Date from "../../Date";
import YesNoLabel from "../../YesNoLabel";

export default function KuchenInfo({ kuchen: { date, name } }) {
  let label;

  switch (date) {
    case "none":
      label = "Bring keinen Kuchen mit.";
      break;
    case "geschwister":
      label = "Bringt für ein Geschwisterkind einen Kuchen mit.";
      break;
    case "team":
      label = "Bringt als Mitarbeiter*in keinen Kuchen mit.";
      break;
    default:
      label = (
        <span>
          Bringt am{" "}
          <strong>
            <Date value={date} weekday="long" day="numeric" month="long" />
          </strong>{" "}
          eine(n) <strong>{name}</strong> mit.
        </span>
      );
  }

  return (
    <Typography>
      <YesNoLabel
        value={date !== "none" && date !== "geschwister"}
        label={label}
      />
    </Typography>
  );
}
