import { Box } from "@mui/material";
import Confetti from "react-confetti";
import Layout from "../Layout";
import Hero from "./Hero";
import Infos from "./Infos";

export default function Dashboard() {
  return (
    <Layout hideMenu>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          canvas: {
            "@media (prefers-reduced-motion: reduce)": {
              display: "none",
            },
          },
        }}
      >
        <Confetti />
        <Hero />
        <Infos />
      </Box>
    </Layout>
  );
}
