import { Box, CardActions as MuiCardActions, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(({ spacing }) => ({
  root: {
    padding: `${spacing(1)}px ${spacing(3)}px ${spacing(3)}px`,
  },
}));

export default function CardActions({ className, ...props }) {
  const classes = useStyles();

  return <Box component={MuiCardActions} {...props} className={`${classes.root} ${className ?? ''}`} />;
}
