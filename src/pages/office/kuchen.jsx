import React from "react";
import Layout from "../../components/Layout";
import Kuchen from "../../components/office/Kuchen";
import OfficeNav from "./OfficeNav";

export default function KuchenPage() {
  return (
    <Layout title="Kuchen" back={{ to: "/" }}>
      <OfficeNav />
      <Kuchen />
    </Layout>
  );
}
