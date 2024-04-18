import { Card, CardContent, CardHeader } from "@mui/material";
import React, { useCallback, useMemo } from "react";
import { useLocation, useNavigate } from "react-router";
import MiniLayout from "../components/MiniLayout";
import SignUpForm from "../components/auth/SignUpForm";

export default function SignUp() {
  const location = useLocation();
  const navigate = useNavigate();
  const from = useMemo(
    () => (location.state && location.state.from) || { pathname: "/" },
    [location],
  );
  const onSignUp = useCallback(() => navigate(from), [navigate, from]);

  return (
    <MiniLayout>
      <Card>
        <CardHeader
          title="Ferienspiele Rothenbergen"
          subheader="Neues Benutzerkonto anlegen"
        />
        <CardContent>
          <SignUpForm from={from} onSignUp={onSignUp} />
        </CardContent>
      </Card>
    </MiniLayout>
  );
}
