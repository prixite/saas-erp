import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import PeopleIcon from "@mui/icons-material/People";
import SettingsIcon from "@mui/icons-material/Settings";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import { Box } from "@mui/material";
import Divider from "@mui/material/Divider";
import MuiDrawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { styled } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";

import PropTypes from "prop-types";
import "@src/components/shared/layout/Sidebar/Sidebar.scss";

const drawerWidth = 240;

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("xs")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const Sidebar = (props) => {
  const { open, toggleDrawer } = props;
  return (
    <Box className="sidebar-cls">
      <Drawer
        className="drawer-cls"
        variant="permanent"
        open={open}
        sx={{ border: "none" }}
      >
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
          className="toolbar-cls"
        >
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <List className="icon-lists" component="nav">
          <ListItemButton>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Users" />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <BusinessCenterIcon />
            </ListItemIcon>
            <ListItemText primary="Employees" />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <WorkOutlineIcon />
            </ListItemIcon>
            <ListItemText primary="Payrool" />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <LocalAtmIcon />
            </ListItemIcon>
            <ListItemText primary="Accounts" />
          </ListItemButton>
          <ListItemButton className="drawer-setting-btn">
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
          </ListItemButton>
        </List>
      </Drawer>
    </Box>
  );
};
Sidebar.propTypes = {
  open: PropTypes.bool,
  toggleDrawer: PropTypes.func,
};
export default Sidebar;
