import { FormControlLabel, FormGroup, FormHelperText, Switch as MuiSwitch } from '@material-ui/core';
import React from 'react';

function Switch({ input, meta, label, type, helperText, ...props }) {
  return (
    <FormGroup row>
      <FormControlLabel control={<MuiSwitch {...input} {...props} />} label={label} />
      {(meta.error || helperText) && <FormHelperText error>{meta.error || helperText}</FormHelperText>}
    </FormGroup>
  );
}

export default Switch;
