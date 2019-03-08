import { Card, CardContent, CardHeader, withStyles } from '@material-ui/core';
import qs from 'query-string';
import React from 'react';
import { useRouter } from '../../api/router';
import SignInForm from './SignInForm';

function SignIn({ classes }) {
  const { location, history } = useRouter();
  const { from = '/' } = qs.parse(location.search);
  const onSignIn = () => history.push(from);

  return (
    <div className={classes.wrapper}>
      <Card>
        <CardHeader title="Ferienspiele Rothenbergen" subheader="Bitte melde dich an" />
        <CardContent>
          <SignInForm onSignIn={onSignIn} />
        </CardContent>
      </Card>
    </div>
  );
}

const styles = ({ spacing }) => ({
  wrapper: {
    minHeight: '100%',
    display: 'flex',
    flexDirection: 'column',
    padding: `${spacing.unit * 4}px 0`,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default withStyles(styles)(SignIn);
