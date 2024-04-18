import { Box } from "@mui/material";
import React from "react";
import Layout from "../Layout";
import Hero from "./Hero";
import Infos from "./Infos";

export default function Dashboard() {
  return (
    <Layout hideMenu>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Hero />
        <Infos />
      </Box>
    </Layout>
  );
}
