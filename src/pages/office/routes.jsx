import {
  Cake as CakeIcon,
  Send as InvitationIcon,
  Person as PersonIcon,
} from "@mui/icons-material";
import React, { useMemo } from "react";
import { isAnmeldungUser, isKuchenUser } from "../../api/rules";
import Anmeldungen from "./anmeldungen";
import Einladungen from "./einladungen";
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
        label: "Einladungen",
        route: { path: "einladungen", allowed: isAnmeldungUser },
        component: Einladungen,
        icon: <InvitationIcon />,
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
