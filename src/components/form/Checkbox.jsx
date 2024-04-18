import {
  FormControlLabel,
  FormGroup,
  FormHelperText,
  Checkbox as MuiCheckbox,
} from "@mui/material";
import React from "react";

function Checkbox({ input, meta, label, ...props }) {
  return (
    <FormGroup>
      <FormControlLabel
        control={<MuiCheckbox {...input} {...props} />}
        label={label}
      />
      {meta.error && <FormHelperText error>{meta.error}</FormHelperText>}
    </FormGroup>
  );
}

export default Checkbox;
