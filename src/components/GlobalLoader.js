import { CircularProgress, makeStyles } from '@material-ui/core';
import React from 'react';
import Layout from './Layout';

const useStyles = makeStyles(() => ({
  root: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

export default function GlobalLoader({ noLayout, ...props }) {
  const classes = useStyles();
  const content = (
    <div className={classes.root}>
      <CircularProgress size={80} color="secondary" />
    </div>
  );

  return noLayout ? content : <Layout {...props}>{content}</Layout>;
}
