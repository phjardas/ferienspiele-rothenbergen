import { Box } from "@mui/material";
import React from "react";
import { Helmet } from "react-helmet-async";
import config from "../api/config";
import Footer from "./Footer";
import MainMenu from "./MainMenu";

export default function Layout({ title, back, hideMenu, children }) {
  return (
    <>
      <Helmet
        title={
          title
            ? `${title} - ${config.title} - ${config.app}`
            : `${config.title} - ${config.app}`
        }
      />
      {hideMenu ? null : <MainMenu title={title} back={back} />}
      <Box sx={{ p: 2 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "80rem",
            mx: "auto",
            pt: hideMenu ? 0 : 8,
          }}
        >
          {children}
          <Footer />
        </Box>
      </Box>
    </>
  );
}
