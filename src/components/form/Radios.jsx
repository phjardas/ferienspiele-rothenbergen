import {
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Radio,
} from "@mui/material";
import React from "react";
import { Field } from "react-final-form";

function Radios({ name, label, options, required, groupProps }) {
  return (
    <FormControl>
      {label && <FormLabel required={required}>{label}</FormLabel>}
      <FormGroup role="radiogroup" {...groupProps}>
        {options.map((option) => (
          <Field
            key={option.value}
            name={name}
            type="radio"
            value={option.value}
            label={option.label}
          >
            {({ input, ...rest }) => (
              <FormControlLabel control={<Radio />} {...input} {...rest} />
            )}
          </Field>
        ))}
      </FormGroup>
    </FormControl>
  );
}

export default Radios;
