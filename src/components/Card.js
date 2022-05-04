import { Box, Card as MuiCard, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(({ palette, shape }) => ({
  root: {
    background: palette.primary[50],
    boxShadow: 'none',
    borderRadius: shape.borderRadius * 4,
  },
}));

export default function Card({ className, ...props }) {
  const classes = useStyles();

  return <Box component={MuiCard} {...props} className={`${classes.root} ${className ?? ''}`} />;
}
