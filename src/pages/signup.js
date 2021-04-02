import { Card, CardContent, CardHeader } from '@material-ui/core';
import React, { useCallback, useMemo } from 'react';
import { useHistory, useLocation } from 'react-router';
import SignUpForm from '../components/auth/SignUpForm';
import MiniLayout from '../components/MiniLayout';

export default function SignUp() {
  const location = useLocation();
  const history = useHistory();
  const from = useMemo(() => (location.state && location.state.from) || { pathname: '/' }, [location]);
  const onSignUp = useCallback(() => history.push(from), [history, from]);

  return (
    <MiniLayout>
      <Card>
        <CardHeader title="Ferienspiele Rothenbergen" subheader="Neues Benutzerkonto anlegen" />
        <CardContent>
          <SignUpForm from={from} onSignUp={onSignUp} />
        </CardContent>
      </Card>
    </MiniLayout>
  );
}
