import { useState, useEffect } from "react";
import {
  Box,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import { useNavigate, useLocation } from "react-router-dom";
import CloseBtn from "@src/assets/images/back.png";
import OpenBtn from "@src/assets/images/forward.png";
// import vectorIcon from "@src/assets/svgs/24px.svg";
// import vectorIconRed from "@src/assets/svgs/24pxred.svg";
// import userIcon from "@src/assets/svgs/3 User.svg";
// import userIconRed from "@src/assets/svgs/3 Userred.svg";
// import bagIcon from "@src/assets/svgs/Bag.svg";
// import bagIconRed from "@src/assets/svgs/workred.svg";
import workIconRed from "@src/assets/svgs/bagred.svg";
import categoryIcon from "@src/assets/svgs/Category.svg";
import categoryIconRed from "@src/assets/svgs/Categoryred.svg";
import settingIcon from "@src/assets/svgs/Setting.svg";
import appIcon from "@src/assets/svgs/sidebar.svg";
import workIcon from "@src/assets/svgs/Work.svg";

import "@src/components/shared/layout/Sidebar/Sidebar.scss";

const drawerWidth = 240;

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    overflow: "hidden",
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
  const navigate = useNavigate();
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState("");
  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location]);

  return (
    <Box className="sidebar-cls">
      <Drawer
        className="drawer-cls"
        variant="permanent"
        open={open}
        sx={{ border: "none" }}
      >
        <Toolbar className="toolbar-cls">
          <ListItemButton className="app-icon-box">
            <ListItemIcon className="icon-btn-cls">
              <img src={appIcon} className="app logo" />
            </ListItemIcon>
          </ListItemButton>
        </Toolbar>

        <Divider sx={{ mt: "16px" }} />
        <List className="icon-lists" component="nav">
          <ListItemButton
            onClick={() => {
              navigate("/react/");
            }}
            className="list-items-btn"
          >
            <ListItemIcon className="list-item-icon">
              <img
                className="icon-img"
                src={currentPath === "/react/" ? categoryIconRed : categoryIcon}
              />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
          {/* <ListItemButton
            onClick={() => {
              navigate("/react/users/");
            }}
            // selected={loc.pathname === "/react/users"}
            className="list-items-btn"
          >
            <ListItemIcon className="list-item-icon">
              <img
                className="icon-img"
                src={currentPath === "/react/users/" ? userIconRed : userIcon}
              />
            </ListItemIcon>
            <ListItemText primary="Users" />
          </ListItemButton> */}
          <ListItemButton
            onClick={() => {
              navigate("/react/employees/");
            }}
            className="list-items-btn"
          >
            <ListItemIcon className="list-item-icon">
              <img
                className="icon-img"
                src={
                  currentPath === "/react/employees/" ? workIconRed : workIcon
                }
              />
            </ListItemIcon>
            <ListItemText primary="Employees" />
          </ListItemButton>
          {/* <ListItemButton
            onClick={() => {
              navigate("/react/accounts/");
            }}
            className="list-items-btn"
          >
            <ListItemIcon className="list-item-icon">
              <img
                className="icon-img"
                src={currentPath === "/react/accounts/" ? bagIconRed : bagIcon}
              />
            </ListItemIcon>
            <ListItemText primary="Accounts" />
          </ListItemButton> */}
          {/* <ListItemButton
            onClick={() => {
              navigate("/react/payroll/");
            }}
            className="list-items-btn"
          >
            <ListItemIcon className="list-item-icon">
              <img
                className="icon-img"
                src={
                  currentPath === "/react/payroll/" ? vectorIconRed : vectorIcon
                }
              />
            </ListItemIcon>
            <ListItemText primary="Payroll" />
          </ListItemButton> */}
          <ListItemButton onClick={toggleDrawer} className="drawer-arrow-btn">
            <ListItemIcon sx={{ ml: "8px" }}>
              {open ? <img src={CloseBtn} /> : <img src={OpenBtn} />}
            </ListItemIcon>
          </ListItemButton>
          <ListItemButton className="drawer-setting-btn">
            <ListItemIcon sx={{ ml: "8px" }}>
              <img src={settingIcon} />
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
