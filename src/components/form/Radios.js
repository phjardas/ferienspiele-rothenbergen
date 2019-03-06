import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@material-ui/core';
import React from 'react';
import { Field } from 'react-final-form';

function Radios({ name, label, options, required, validate, type, ...props }) {
  return (
    <FormControl>
      <FormLabel required={required}>{label}</FormLabel>
      <RadioGroup {...props}>
        {options.map(option => (
          <Field name={name} type="radio" key={option.value} value={option.value} required={required} validate={validate}>
            {({ input }) => {
              console.log('input:', input);
              return <FormControlLabel control={<Radio />} {...input} label={option.label} />;
            }}
          </Field>
        ))}
      </RadioGroup>
    </FormControl>
  );
}

export default Radios;
