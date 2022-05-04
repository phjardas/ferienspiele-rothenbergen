import { Box, CardContent as MuiCardContent, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(({ spacing }) => ({
  root: {
    padding: spacing(3),
  },
}));

export default function CardContent({ className, ...props }) {
  const classes = useStyles();

  return <Box component={MuiCardContent} {...props} className={`${classes.root} ${className ?? ''}`} />;
}
