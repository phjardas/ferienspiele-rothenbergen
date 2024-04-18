import React from "react";
import { Field } from "react-final-form";
import TextField from "../form/TextField";
import { required as validateRequired } from "../form/validation";

export default function SignInField({ required, ...props }) {
  return (
    <Field
      {...props}
      component={TextField}
      required={required}
      validate={required && validateRequired}
      fullWidth
      FormHelperTextProps={{ sx: { display: "none" } }}
    />
  );
}
