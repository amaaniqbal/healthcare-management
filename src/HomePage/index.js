import React from "react";
import Box from "@material-ui/core/Box";
import Navbar from "../components/Navbar";
import Viewport from "./Viewport";

export default function HomePage() {
  return (
    <Box>
      <Navbar />
      <Viewport />
    </Box>
  );
}
