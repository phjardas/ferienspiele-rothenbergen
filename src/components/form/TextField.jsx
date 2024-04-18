import { TextField } from "@mui/material";
import * as React from "react";

export default function TextFieldWrapper({
  input: { name, onChange, value, ...restInput },
  helperText,
  meta,
  ...rest
}) {
  const showError =
    ((meta.submitError && !meta.dirtySinceLastSubmit) || meta.error) &&
    meta.touched;

  return (
    <TextField
      {...rest}
      name={name}
      helperText={showError ? meta.error || meta.submitError : helperText}
      error={showError}
      inputProps={restInput}
      onChange={onChange}
      value={value}
      variant="outlined"
    />
  );
}
