import React from "react";
import GenderDiverse from "./icons/GenderDiverse";
import GenderFemale from "./icons/GenderFemale";
import GenderMale from "./icons/GenderMale";
import LabelIcon from "./LabelIcon";

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

export default function GenderIcon({ gender, label, ...props }) {
  const icon = icons[gender];
  if (!icon) {
    console.error(`Invalid gender: ${gender}`);
    return null;
  }
  return <LabelIcon icon={icon} label={label && labels[gender]} {...props} />;
}
