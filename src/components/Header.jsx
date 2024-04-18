import Helmet from "react-helmet";
import React from "react";
import { usePage } from "../api/page";

export default function Header() {
  const { title, site } = usePage();

  return (
    <Helmet titleTemplate={`%s - ${site}`} title={title} defaultTitle={site} />
  );
}
