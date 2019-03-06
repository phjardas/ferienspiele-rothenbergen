import { FormControlLabel, FormGroup, FormHelperText, Switch as MuiSwitch } from '@material-ui/core';
import React from 'react';

function Switch({ input, meta, label, type, ...props }) {
  return (
    <FormGroup row>
      <FormControlLabel control={<MuiSwitch {...input} {...props} />} label={label} />
      {meta.error && <FormHelperText error>{meta.error}</FormHelperText>}
    </FormGroup>
  );
}

export default Switch;
