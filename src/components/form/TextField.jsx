import { TextField } from "@mui/material";

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
      slotProps={{ input: restInput }}
      onChange={onChange}
      value={value}
    />
  );
}
