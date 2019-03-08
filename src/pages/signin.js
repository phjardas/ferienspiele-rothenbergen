import { Card, CardContent, CardHeader } from '@material-ui/core';
import React from 'react';
import { useRouter } from '../api/router';
import SignInForm from '../components/auth/SignInForm';
import MiniLayout from '../components/MiniLayout';

export default function SignIn() {
  const { location, history } = useRouter();
  const from = (location.state && location.state.from) || { pathname: '/' };
  const onSignIn = () => history.push(from);

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
