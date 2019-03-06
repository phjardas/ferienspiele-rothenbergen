import { TextField } from '@material-ui/core';
import React from 'react';

export default function Input({ input, meta, helpText, ...props }) {
  return (
    <TextField
      id={input.name}
      {...input}
      error={meta.touched && !!meta.error}
      helperText={meta.touched && meta.error ? meta.error : helpText}
      {...props}
    />
  );
}
