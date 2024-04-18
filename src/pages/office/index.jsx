import React, { lazy, useMemo } from "react";
import { Navigate, Outlet } from "react-router";
import { useAuth } from "../../api/auth";
import { isAnmeldungUser } from "../../api/rules";
import GlobalLoader from "../../components/GlobalLoader";
import { useOfficeRoutes as useOfficeTabs } from "./routes";

const AnmeldungDetails = lazy(() => import("./anmeldung-details"));
const NotFound = lazy(() => import("../notfound"));

export function useOfficeRoutes() {
  const tabs = useOfficeTabs();

  return useMemo(
    () => [
      {
        path: "office",
        element: <OfficeWrapper />,
        children: [
          {
            index: true,
            element: <OfficeIndex />,
          },
          ...tabs.map((tab) => ({
            path: tab.route.path,
            element: <tab.component />,
          })),
          { path: "anmeldungen/:id", element: <AnmeldungDetails /> },
        ],
      },
    ],
    [tabs],
  );
}

function OfficeWrapper() {
  const auth = useAuth();
  if (auth.pending) return <GlobalLoader />;
  if (isAnmeldungUser(auth)) return <Outlet />;
  return <NotFound />;
}

function OfficeIndex() {
  const auth = useAuth();
  if (auth.pending) return <GlobalLoader />;
  return (
    <Navigate to={isAnmeldungUser(auth) ? "anmeldungen" : "kuchen"} replace />
  );
}
