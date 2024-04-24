import qs from "qs";
import React from "react";
import { useLocation } from "react-router";
import Layout from "../components/Layout";
import Registration from "../components/registration";

function useParams() {
  const { search } = useLocation();
  return search && search.startsWith("?") ? qs.parse(search.substring(1)) : {};
}

export default function Anmeldung() {
  const { code, ...params } = useParams();

  return (
    <Layout back={{ to: "/" }}>
      <Registration code={code} initialValues={params} />
    </Layout>
  );
}
