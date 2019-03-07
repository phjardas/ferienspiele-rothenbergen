import qs from 'query-string';
import React from 'react';
import { useRouter } from '../../api/router';
import H2 from '../H2';
import SignInForm from './SignInForm';

export default function SignIn() {
  const { location, history } = useRouter();
  const { from = '/' } = qs.parse(location.search);
  const onSignIn = () => history.push(from);

  return (
    <>
      <H2>Bitte melde dich an</H2>
      <SignInForm onSignIn={onSignIn} />
    </>
  );
}
