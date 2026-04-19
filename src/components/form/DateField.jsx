import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

export default function DateFieldWrapper({
  input: { name, onChange, value, ...restInput },
  helperText,
  meta,
  ...rest
}) {
  const showError =
    ((meta.submitError && !meta.dirtySinceLastSubmit) || meta.error) &&
    meta.touched;

  return (
    <DatePicker
      {...rest}
      name={name}
      helperText={showError ? meta.error || meta.submitError : helperText}
      error={showError}
      inputProps={restInput}
      onChange={onChange}
      value={value ? dayjs(value) : null}
      sx={{ width: "100%" }}
    />
  );
}
