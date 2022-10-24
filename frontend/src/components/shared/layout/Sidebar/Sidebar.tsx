import { Box } from "@mui/material";
import Divider from "@mui/material/Divider";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { styled } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import PropTypes from "prop-types";
import CloseBtn from "@src/assets/images/back.png";
import OpenBtn from "@src/assets/images/forward.png";
import sideIcon from "@src/assets/svgs/24px.svg";
import userIcon from "@src/assets/svgs/3 User.svg";
import bagIcon from "@src/assets/svgs/Bag.svg";
import settingIcon from "@src/assets/svgs/Setting.svg";
import appIcon from "@src/assets/svgs/sidebar.svg";
import vectorIcon from "@src/assets/svgs/Vector.svg";
import workIcon from "@src/assets/svgs/Work.svg";

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
          <ListItemButton className="app-icon-box">
            <ListItemIcon className="icon-btn-cls">
              <img src={appIcon} className="app logo" />
            </ListItemIcon>
          </ListItemButton>
        </Toolbar>

        <Divider sx={{ mt: "16px" }} />
        <List className="icon-lists" component="nav">
          <ListItemButton>
            <ListItemIcon sx={{ ml: "8px" }}>
              <img src={sideIcon} className="app logo" />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
          <ListItemButton className="list-item-btn">
            <ListItemIcon className="list-item-icon">
              <img src={bagIcon} className="app logo" />
            </ListItemIcon>
            <ListItemText primary="Users" />
          </ListItemButton>
          <ListItemButton className="list-item-btn">
            <ListItemIcon className="list-item-icon">
              <img src={userIcon} className="app logo" />
            </ListItemIcon>
            <ListItemText primary="Employees" />
          </ListItemButton>
          <ListItemButton className="list-item-btn">
            <ListItemIcon className="list-item-icon">
              <img src={workIcon} className="app logo" />
            </ListItemIcon>
            <ListItemText primary="Payrool" />
          </ListItemButton>
          <ListItemButton className="list-item-btn">
            <ListItemIcon className="list-item-icon">
              <img src={vectorIcon} className="app logo" />
            </ListItemIcon>
            <ListItemText primary="Accounts" />
          </ListItemButton>
          <ListItemButton
            onClick={toggleDrawer}
            className="drawer-arrow-btn open-btn"
          >
            <ListItemIcon sx={{ ml: "8px" }}>
              {open ? <img src={CloseBtn} /> : <img src={OpenBtn} />}
            </ListItemIcon>
          </ListItemButton>
          <ListItemButton className="drawer-setting-btn">
            <ListItemIcon sx={{ ml: "8px" }}>
              <img src={settingIcon} className="app logo" />
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
