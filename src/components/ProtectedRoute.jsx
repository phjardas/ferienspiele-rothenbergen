import React from "react";
import { Redirect, Route } from "react-router";
import { useAuth } from "../api/auth";
import GlobalLoader from "./GlobalLoader";

export default function ProtectedRoute({ component, allowed, ...rest }) {
  const auth = useAuth();
  const Component = component;

  return (
    <Route
      {...rest}
      render={(props) => {
        if (auth.pending) return <GlobalLoader />;
        if (allowed(auth)) return <Component {...props} />;
        return (
          <Redirect
            to={{ pathname: "/signin", state: { from: props.location } }}
          />
        );
      }}
    />
  );
}
