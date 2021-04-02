import { Card, CardContent, CardHeader } from '@material-ui/core';
import React, { useCallback, useMemo } from 'react';
import { useHistory, useLocation } from 'react-router';
import SignInForm from '../components/auth/SignInForm';
import MiniLayout from '../components/MiniLayout';

export default function SignIn() {
  const location = useLocation();
  const history = useHistory();
  const from = useMemo(() => (location.state && location.state.from) || { pathname: '/' }, [location]);
  const onSignIn = useCallback(() => history.push(from), [history, from]);

  return (
    <MiniLayout>
      <Card>
        <CardHeader title="Ferienspiele Rothenbergen" subheader="Bitte melde dich an" />
        <CardContent>
          <SignInForm from={from} onSignIn={onSignIn} />
        </CardContent>
      </Card>
    </MiniLayout>
  );
}
