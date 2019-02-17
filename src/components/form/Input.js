import React from 'react';
import { FormGroup, FormText, Input as BSInput, Label } from 'reactstrap';

export default function Input({ input, meta, label, required, className }) {
  return (
    <FormGroup className={className}>
      <Label htmlFor={input.name}>{label}</Label>
      <BSInput {...input} id={input.name} required={required} invalid={meta.touched && !!meta.error} />
      {meta.touched && meta.error && <FormText color="danger">{meta.error}</FormText>}
    </FormGroup>
  );
}
