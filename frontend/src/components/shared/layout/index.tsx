import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import PropTypes from "prop-types";
import { Outlet } from "react-router-dom";
import Drawers from "@src/components/shared/layout/Drawer/Drawers";
import Sidebar from "@src/components/shared/layout/Sidebar/Sidebar";
import Topbar from "@src/components/shared/layout/Topbar/Topbar";

const Layout = () => {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <Topbar open={open} />
      <Sidebar open={open} toggleDrawer={toggleDrawer} />
      <Drawers open={open} />

      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? "#FFFFFF"
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
          p: {
            xs: 1,
            md: 3,
            lg: 3,
          },
        }}
      >
        <Toolbar />

        <main>
          {" "}
          <Outlet />{" "}
        </main>
      </Box>
    </Box>
  );
};
Layout.propTypes = {
  children: PropTypes.node,
};
export default Layout;
