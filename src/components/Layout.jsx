import { Box } from "@mui/material";
import React from "react";
import { Helmet } from "react-helmet-async";
import { useAuth } from "../api/auth";
import config from "../api/config";
import Footer from "./Footer";
import MainMenu from "./MainMenu";

export default function Layout({ title, back, hideMenu, children }) {
  const auth = useAuth();
  const hasMenu = hideMenu ? auth.authenticated : true;

  return (
    <>
      <Helmet
        title={
          title
            ? `${title} - ${config.title} - ${config.app}`
            : `${config.title} - ${config.app}`
        }
      />
      {hasMenu && <MainMenu title={title} back={back} />}
      <Box sx={{ p: 2 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "80rem",
            mx: "auto",
            pt: hasMenu ? 8 : 0,
          }}
        >
          {children}
          <Footer />
        </Box>
      </Box>
    </>
  );
}
