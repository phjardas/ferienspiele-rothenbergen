import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import * as React from 'react';

export default function SelectWrapper({
  input: { name, value, onChange, ...restInput },
  helperText,
  meta,
  label,
  formControlProps,
  ...rest
}) {
  const showError = ((meta.submitError && !meta.dirtySinceLastSubmit) || meta.error) && meta.touched;

  return (
    <FormControl {...formControlProps} error={showError} variant="outlined">
      <InputLabel htmlFor={name}>{label}</InputLabel>
      <Select {...rest} label={label} name={name} onChange={onChange} inputProps={restInput} value={value} />
      {(showError || helperText) && <FormHelperText>{meta.error || meta.submitError || helperText}</FormHelperText>}
    </FormControl>
  );
}
