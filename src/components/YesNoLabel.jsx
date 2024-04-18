import { Check as CheckIcon, Clear as MissingIcon } from "@mui/icons-material";
import React from "react";
import LabelIcon from "./LabelIcon";

export default function YesNoLabel({
  value,
  yesIcon = CheckIcon,
  yesColor = "yes",
  noIcon = MissingIcon,
  noColor = "grey",
  label,
  ...props
}) {
  const Icon = value ? yesIcon : noIcon;

  return (
    <LabelIcon
      icon={Icon}
      label={label}
      {...props}
      sx={{ color: value ? "text.hint" : "error.dark", ...props.sx }}
    />
  );
}
