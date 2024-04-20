import React from "react";
import Layout from "../../components/Layout";
import Einladungen from "../../components/office/Einladungen";
import OfficeNav from "./OfficeNav";

export default function OfficeEinladungen() {
  return (
    <Layout title="Einladungen" back={{ to: "/" }}>
      <OfficeNav />
      <Einladungen />
    </Layout>
  );
}
