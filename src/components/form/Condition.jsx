import React from "react";
import { Field } from "react-final-form";

export default function Condition({ when, is, children }) {
  const test = typeof is === "function" ? is : (value) => value === is;

  return (
    <Field name={when} subscription={{ value: true }}>
      {({ input }) => test(input.value) && children(input.value)}
    </Field>
  );
}
