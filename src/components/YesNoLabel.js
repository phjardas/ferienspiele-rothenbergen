import { Check as CheckIcon, Clear as MissingIcon } from '@material-ui/icons';
import React from 'react';
import LabelIcon from './LabelIcon';
import { withStyles } from '@material-ui/core';

function YesNoLabel({
  value,
  yesIcon = CheckIcon,
  yesColor = 'yes',
  noIcon = MissingIcon,
  noColor = 'grey',
  label,
  classes,
  className,
  ...props
}) {
  const Icon = value ? yesIcon : noIcon;

  return <LabelIcon icon={Icon} label={label} className={`${classes[value ? yesColor : noColor]} ${className || ''}`} {...props} />;
}

const styles = ({ palette }) => ({
  grey: {
    color: palette.text.hint,
  },
  error: {
    color: palette.error.dark,
  },
});

export default withStyles(styles)(YesNoLabel);
