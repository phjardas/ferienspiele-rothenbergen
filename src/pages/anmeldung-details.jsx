import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getRegistration } from "../api/firestore";
import GlobalError from "../components/GlobalError";
import GlobalLoader from "../components/GlobalLoader";
import Layout from "../components/Layout";
import RegistrationDetails from "../components/registration-details";

export default function AnmeldungDetails() {
  const { id } = useParams();
  const [{ loading, error, registration }, setState] = useState({
    loading: true,
  });
  useEffect(() => {
    setState({ loading: true });
    getRegistration(id, (error, registration) =>
      setState({ loading: false, error, registration }),
    );
  }, [id]);

  if (loading) return <GlobalLoader back={{ to: "/" }} />;
  if (error) return <GlobalError error={error} back={{ to: "/" }} />;
  if (!registration)
    return (
      <GlobalError
        error={new Error("Ungültige Anmeldung-ID")}
        back={{ to: "/" }}
      />
    );
  return (
    <Layout back={{ to: "/" }}>
      <RegistrationDetails registration={registration} />
    </Layout>
  );
}
