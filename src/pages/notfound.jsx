import React from "react";
import GlobalError from "../components/GlobalError";

export default function NotFound() {
  return (
    <GlobalError error={new Error("Seite nicht gefunden")} back={{ to: "/" }} />
  );
}
