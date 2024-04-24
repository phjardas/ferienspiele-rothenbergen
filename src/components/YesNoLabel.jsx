import { Check as CheckIcon, Clear as MissingIcon } from "@mui/icons-material";
import React from "react";
import LabelIcon from "./LabelIcon";

export default function YesNoLabel({
  value,
  yesIcon = <CheckIcon />,
  noIcon = <MissingIcon />,
  label,
  ...props
}) {
  return <LabelIcon icon={value ? yesIcon : noIcon} label={label} {...props} />;
}
