import { ArrowBack as BackIcon } from "@mui/icons-material";
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import { useAuth } from "../api/auth";
import config from "../api/config";
import AuthenticatedMenu from "./AuthenticatedMenu";
import LinkBehavior from "./LinkBehavior";
import UnauthenticatedMenu from "./UnauthenticatedMenu";

export default function MainMenu({ title, back }) {
  const { pending, user } = useAuth();
  const Menu = user ? AuthenticatedMenu : UnauthenticatedMenu;

  return (
    <AppBar position="fixed" color="primary" elevation={0}>
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
          {title || config.app}
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
