import { Tab, Tabs } from "@mui/material";
import React from "react";
import { useMatches } from "react-router";
import { useAuth } from "../../api/auth";
import LinkBehavior from "../../components/LinkBehavior";
import { useOfficeRoutes } from "./routes";

export default function OfficeNav() {
  const auth = useAuth();
  const routes = useOfficeRoutes();

  const matches = useMatches();
  const tab = matches[matches.length - 1].pathname.split("/").pop();

  return (
    <Tabs
      value={tab}
      indicatorColor="primary"
      textColor="primary"
      centered
      sx={{
        mb: 3,
        borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
      }}
    >
      {routes
        .filter((route) => route.route.allowed(auth))
        .map((route) => (
          <Tab
            key={route.route.path}
            value={route.route.path}
            component={LinkBehavior}
            to={`/office/${route.route.path}`}
            label={route.label}
            icon={route.icon}
          />
        ))}
    </Tabs>
  );
}
