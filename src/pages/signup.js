import { Card, CardContent, CardHeader } from '@material-ui/core';
import React from 'react';
import { useRouter } from '../api/router';
import SignUpForm from '../components/auth/SignUpForm';
import MiniLayout from '../components/MiniLayout';

export default function SignUp() {
  const { location, history } = useRouter();
  const from = (location.state && location.state.from) || { pathname: '/' };
  const onSignUp = () => history.push(from);

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
