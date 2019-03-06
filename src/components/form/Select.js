import { MenuItem } from '@material-ui/core';
import React from 'react';
import Input from './Input';

export default function Select({ options, ...props }) {
  return (
    <Input {...props} select>
      {options.map(option => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </Input>
  );
}
