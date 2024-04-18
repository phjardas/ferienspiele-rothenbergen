import { Card, CardContent, CardHeader } from "@mui/material";
import React, { useCallback, useMemo } from "react";
import { useLocation, useNavigate } from "react-router";
import MiniLayout from "../components/MiniLayout";
import SignInForm from "../components/auth/SignInForm";

export default function SignIn() {
  const location = useLocation();
  const navigate = useNavigate();
  const from = useMemo(
    () => (location.state && location.state.from) || { pathname: "/" },
    [location],
  );
  const onSignIn = useCallback(() => navigate(from), [navigate, from]);

  return (
    <MiniLayout>
      <Card>
        <CardHeader
          title="Ferienspiele Rothenbergen"
          subheader="Bitte melde dich an"
        />
        <CardContent>
          <SignInForm from={from} onSignIn={onSignIn} />
        </CardContent>
      </Card>
    </MiniLayout>
  );
}
