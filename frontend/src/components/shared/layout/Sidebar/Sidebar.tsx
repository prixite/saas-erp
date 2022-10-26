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
import vectorIcon from "@src/assets/svgs/24px.svg";
import userIcon from "@src/assets/svgs/3 User.svg";
import bagIcon from "@src/assets/svgs/Bag.svg";
import sideIcon from "@src/assets/svgs/Category.svg";
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
  const loc = useLocation();
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
            selected={loc.pathname === "/react/"}
            style={{
              backgroundColor: loc.pathname === "/react/" ? "danger" : "",
            }}
            onClick={() => {
              navigate("/react");
            }}
          >
            <ListItemIcon sx={{ ml: "8px" }}>
              <img src={sideIcon} />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
          <ListItemButton
            selected={loc.pathname === "/react/employee"}
            style={{
              backgroundColor:
                loc.pathname === "/react/employee" ? "danger" : "",
            }}
            onClick={() => {
              navigate("/react/employee");
            }}
            className="list-items-btn"
          >
            <ListItemIcon className="list-item-icon">
              <img src={workIcon} />
            </ListItemIcon>
            <ListItemText primary="Employees" />
          </ListItemButton>
          <ListItemButton
            selected={loc.pathname === "/react/users"}
            style={{
              backgroundColor: loc.pathname === "/react/users" ? "danger" : "",
            }}
            onClick={() => {
              navigate("/react/users");
            }}
            className="list-items-btn"
          >
            <ListItemIcon className="list-item-icon">
              <img src={userIcon} />
            </ListItemIcon>
            <ListItemText primary="Users" />
          </ListItemButton>
          <ListItemButton
            selected={loc.pathname === "/react/accounts"}
            style={{
              backgroundColor:
                loc.pathname === "/react/accounts" ? "danger" : "",
            }}
            onClick={() => {
              navigate("/react/accounts");
            }}
            className="list-items-btn"
          >
            <ListItemIcon className="list-item-icon">
              <img src={bagIcon} />
            </ListItemIcon>
            <ListItemText primary="Accounts" />
          </ListItemButton>
          <ListItemButton
            selected={loc.pathname === "/react/payroll"}
            style={{
              backgroundColor:
                loc.pathname === "/react/payroll" ? "danger" : undefined,
            }}
            onClick={() => {
              navigate("/react/payroll");
            }}
            className="list-items-btn"
          >
            <ListItemIcon className="list-item-icon">
              <img src={vectorIcon} />
            </ListItemIcon>
            <ListItemText primary="Payroll" />
          </ListItemButton>
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
