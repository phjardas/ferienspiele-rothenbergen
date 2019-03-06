import { Card, CardContent, CardHeader, withStyles } from '@material-ui/core';
import React from 'react';

function FieldSet({ icon, title, subtitle, children, classes }) {
  return (
    <Card className={classes.root}>
      <CardHeader avatar={icon} title={title} subheader={subtitle} />
      <CardContent>{children}</CardContent>
    </Card>
  );
}

const styles = ({ spacing }) => ({
  root: {
    marginTop: spacing.unit * 2,
  },
});

export default withStyles(styles)(FieldSet);
