import { Card, CardContent, CardHeader, withStyles } from '@material-ui/core';
import React from 'react';

function FieldSet({ icon, title, subtitle, children, classes }) {
  return (
    <Card className={classes.root}>
      {title && <CardHeader avatar={icon} title={title} subheader={subtitle} />}
      <CardContent>{children}</CardContent>
    </Card>
  );
}

const styles = ({ spacing }) => ({
  root: {
    marginTop: spacing.unit * 3,
    marginBottom: spacing.unit * 3,
  },
});

export default withStyles(styles)(FieldSet);
