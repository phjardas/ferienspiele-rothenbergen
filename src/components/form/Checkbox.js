import { Checkbox as MuiCheckbox, FormControlLabel, FormGroup, FormHelperText } from '@material-ui/core';
import React from 'react';

function Checkbox({ input, meta, label, ...props }) {
  return (
    <FormGroup>
      <FormControlLabel control={<MuiCheckbox {...input} {...props} />} label={label} />
      {meta.error && <FormHelperText error>{meta.error}</FormHelperText>}
    </FormGroup>
  );
}

export default Checkbox;
