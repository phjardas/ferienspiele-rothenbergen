import React, { lazy, Suspense, useMemo } from "react";
import { RouterProvider } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import GlobalLoader from "../components/GlobalLoader";
import { useOfficeRoutes } from "./office";

const Home = lazy(() => import("./Home"));
const Impressum = lazy(() => import("./impressum"));
const Datenschutz = lazy(() => import("./datenschutz"));
const Teilnahmebedingungen = lazy(() => import("./teilnahmebedingungen"));
const Anmeldung = lazy(() => import("./anmeldung"));
const AnmeldungDetails = lazy(() => import("./anmeldung-details"));
const SignIn = lazy(() => import("./signin"));
const SignUp = lazy(() => import("./signup"));
const NotFound = lazy(() => import("./notfound"));

function useRouter() {
  const office = useOfficeRoutes();

  return useMemo(() => {
    const routes = [
      { index: true, element: <Home /> },
      { path: "signin", element: <SignIn /> },
      { path: "signup", element: <SignUp /> },
      {
        path: "anmeldung",
        children: [
          { index: true, element: <Anmeldung /> },
          { path: ":id", element: <AnmeldungDetails /> },
        ],
      },
      { path: "impressum", element: <Impressum /> },
      { path: "datenschutz", element: <Datenschutz /> },
      { path: "teilnahmebedingungen", element: <Teilnahmebedingungen /> },
      ...office,
      { path: "*", element: <NotFound /> },
    ];

    return createBrowserRouter(routes);
  }, [office]);
}

export default function Pages() {
  return (
    <Suspense fallback={<GlobalLoader noLayout />}>
      <RouterProvider router={useRouter()} />
    </Suspense>
  );
}
