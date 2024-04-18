import { ArrowBack as BackIcon } from "@mui/icons-material";
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import React from "react";
import { useAuth } from "../api/auth";
import AuthenticatedMenu from "./AuthenticatedMenu";
import LinkBehavior from "./LinkBehavior";
import UnauthenticatedMenu from "./UnauthenticatedMenu";

export default function MainMenu({ title, back }) {
  const { pending, user } = useAuth();
  const Menu = user ? AuthenticatedMenu : UnauthenticatedMenu;

  return (
    <AppBar
      position="fixed"
      color="primary"
      elevation={0}
      sx={{ bgcolor: "primary.300" }}
    >
      <Toolbar>
        {back && (
          <IconButton
            component={LinkBehavior}
            {...back}
            color="inherit"
            edge="start"
          >
            <BackIcon />
          </IconButton>
        )}
        <Typography variant="h6" color="inherit">
          {title || "Ferienspiele"}
        </Typography>
        {!pending && (
          <Box sx={{ ml: "auto" }}>
            <Menu />
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}
