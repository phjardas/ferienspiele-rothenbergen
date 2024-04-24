import React from "react";
import LabelIcon from "./LabelIcon";
import GenderDiverse from "./icons/GenderDiverse";
import GenderFemale from "./icons/GenderFemale";
import GenderMale from "./icons/GenderMale";

const icons = {
  m: GenderMale,
  f: GenderFemale,
  d: GenderDiverse,
};

const labels = {
  m: "männlich",
  f: "weiblich",
  d: "divers",
};

export default function GenderIcon({
  gender,
  label,
  component: Comp = LabelIcon,
  ...props
}) {
  const Icon = icons[gender];
  if (!Icon) {
    console.error(`Invalid gender: ${gender}`);
    return null;
  }
  return <Comp icon={<Icon />} label={label && labels[gender]} {...props} />;
}
