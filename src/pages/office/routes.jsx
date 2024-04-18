import { Cake as CakeIcon, Person as PersonIcon } from "@mui/icons-material";
import React, { useMemo } from "react";
import { isAnmeldungUser, isKuchenUser } from "../../api/rules";
import Anmeldungen from "./anmeldungen";
import Kuchen from "./kuchen";

export function useOfficeRoutes() {
  return useMemo(
    () => [
      {
        label: "Anmeldungen",
        route: { path: "anmeldungen", allowed: isAnmeldungUser },
        component: Anmeldungen,
        icon: <PersonIcon />,
      },
      {
        label: "Kuchen",
        route: { path: "kuchen", allowed: isKuchenUser },
        component: Kuchen,
        icon: <CakeIcon />,
      },
    ],
    [],
  );
}
