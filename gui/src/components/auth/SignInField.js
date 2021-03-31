import { withStyles } from '@material-ui/core';
import React from 'react';
import { Field } from 'react-final-form';
import TextField from '../form/TextField';
import { required as validateRequired } from '../form/validation';

function SignInField({ required, classes, ...props }) {
  return (
    <Field
      {...props}
      component={TextField}
      required={required}
      validate={required && validateRequired}
      fullWidth
      margin="dense"
      FormHelperTextProps={{ className: classes.hidden }}
    />
  );
}

const styles = {
  hidden: {
    display: 'none',
  },
};

export default withStyles(styles)(SignInField);
