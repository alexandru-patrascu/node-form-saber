import React from "react";
import { Outlet } from "react-router-dom";

import Box from "@mui/material/Box";

const Layout = () => {
  return (
    <Box
      component="main"
      sx={{
        height: "100vh",
        display: "flex",
        margin: "0 auto",
        maxWidth: "500px",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Outlet />
    </Box>
  );
};

export default Layout;
