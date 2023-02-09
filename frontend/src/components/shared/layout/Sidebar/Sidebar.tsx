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
import vectorIcon from "@src/assets/svgs/24px.svg";
import vectorIconRed from "@src/assets/svgs/24pxred.svg";
import userIcon from "@src/assets/svgs/3 User.svg";
import userIconRed from "@src/assets/svgs/3 Userred.svg";
import attendanceIcon from "@src/assets/svgs/attendanceicon.svg";
import attendanceRedIcon from "@src/assets/svgs/attendancered.svg";
import bagIcon from "@src/assets/svgs/Bag.svg";
import workIconRed from "@src/assets/svgs/bagred.svg";
import categoryIcon from "@src/assets/svgs/Category.svg";
import categoryIconRed from "@src/assets/svgs/Categoryred.svg";
import leavesIcon from "@src/assets/svgs/Leave.svg";
import leavesRedIcon from "@src/assets/svgs/leaveRed.svg";
import settingIcon from "@src/assets/svgs/setting.svg";
import settingIconRed from "@src/assets/svgs/settingRed.svg";
import appIcon from "@src/assets/svgs/sidebar.svg";
import standupIcon from "@src/assets/svgs/standupicon.svg";
import standupRedIcon from "@src/assets/svgs/standupredicon.svg";
import teamsIcon from "@src/assets/svgs/teamicon.svg";
import teamsRedIcon from "@src/assets/svgs/teamred.svg";
import workIcon from "@src/assets/svgs/Work.svg";
import bagIconRed from "@src/assets/svgs/workred.svg";
import {
  useGetUserQuery,
  useGetFlagsQuery,
} from "@src/store/reducers/employees-api";

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
  const { data: Flags = [] } = useGetFlagsQuery();
  const navigate = useNavigate();
  const location = useLocation();
  const { data: userData } = useGetUserQuery();
  const [currentPath, setCurrentPath] = useState("");
  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location]);
  const allFlags = Object.assign({}, ...Flags);
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
              navigate("/");
            }}
            className="list-items-btn"
          >
            <ListItemIcon className="list-item-icon">
              <img
                className="icon-img"
                src={currentPath === "/" ? categoryIconRed : categoryIcon}
              />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
          {allFlags.show_users_module ? (
            userData?.allowed_modules.member_modules.includes("user") ||
            userData?.allowed_modules.admin_modules.includes("user") ||
            userData?.allowed_modules.owner_modules.includes("user") ? (
              <ListItemButton
                onClick={() => {
                  navigate("users/");
                }}
                className="list-items-btn"
              >
                <ListItemIcon className="list-item-icon">
                  <img
                    className="icon-img"
                    src={currentPath === "/users/" ? userIconRed : userIcon}
                  />
                </ListItemIcon>
                <ListItemText primary="Users" />
              </ListItemButton>
            ) : (
              ""
            )
          ) : (
            ""
          )}
          {allFlags.show_employees_module ? (
            userData?.allowed_modules.member_modules.includes("employees") ||
            userData?.allowed_modules.admin_modules.includes("employees") ||
            userData?.allowed_modules.owner_modules.includes("employees") ? (
              <ListItemButton
                onClick={() => {
                  navigate("employees/");
                }}
                className="list-items-btn"
              >
                <ListItemIcon className="list-item-icon">
                  <img
                    className="icon-img"
                    src={currentPath === "/employees/" ? workIconRed : workIcon}
                  />
                </ListItemIcon>
                <ListItemText primary="Employees" />
              </ListItemButton>
            ) : (
              ""
            )
          ) : (
            ""
          )}
          {allFlags.show_accounts_module ? (
            userData?.allowed_modules.member_modules.includes("inventory") ||
            userData?.allowed_modules.admin_modules.includes("inventory") ||
            userData?.allowed_modules.owner_modules.includes("inventory") ? (
              <ListItemButton
                onClick={() => {
                  navigate("accounts/");
                }}
                className="list-items-btn"
              >
                <ListItemIcon className="list-item-icon">
                  <img
                    className="icon-img"
                    src={currentPath === "/accounts/" ? bagIconRed : bagIcon}
                  />
                </ListItemIcon>
                <ListItemText primary="Accounts" />
              </ListItemButton>
            ) : (
              ""
            )
          ) : (
            ""
          )}
          {allFlags.show_payroll_module ? (
            userData?.allowed_modules.member_modules.includes("payroll") ||
            userData?.allowed_modules.admin_modules.includes("payroll") ||
            userData?.allowed_modules.owner_modules.includes("payroll") ? (
              <ListItemButton
                onClick={() => {
                  navigate("payroll/");
                }}
                className="list-items-btn"
              >
                <ListItemIcon className="list-item-icon">
                  <img
                    className="icon-img"
                    src={
                      currentPath === "/payroll/" ? vectorIconRed : vectorIcon
                    }
                  />
                </ListItemIcon>
                <ListItemText primary="Payroll" />
              </ListItemButton>
            ) : (
              ""
            )
          ) : (
            ""
          )}
          {userData?.allowed_modules.admin_modules.includes("leave") ||
          userData?.allowed_modules.owner_modules.includes("leave") ? (
            <ListItemButton
              onClick={() => {
                navigate("leaves/");
              }}
              className="list-items-btn"
            >
              <ListItemIcon className="list-item-icon">
                <img
                  className="icon-img"
                  src={currentPath === "/leaves/" ? leavesRedIcon : leavesIcon}
                />
              </ListItemIcon>
              <ListItemText primary="Leaves" />
            </ListItemButton>
          ) : (
            ""
          )}
          {userData?.allowed_modules.admin_modules.includes("standup") ||
          userData?.allowed_modules.owner_modules.includes("standup") ||
          userData?.allowed_modules.member_modules.includes("standup") ? (
            <ListItemButton
              onClick={() => {
                navigate("standups/");
              }}
              className="list-items-btn"
            >
              <ListItemIcon className="list-item-icon">
                <img
                  className="icon-img"
                  src={
                    currentPath === "/standups/" ? standupRedIcon : standupIcon
                  }
                />
              </ListItemIcon>
              <ListItemText primary="Standups" />
            </ListItemButton>
          ) : (
            ""
          )}
          {userData?.allowed_modules.admin_modules.includes("employees") ||
          userData?.allowed_modules.owner_modules.includes("employees") ? (
            <ListItemButton
              onClick={() => {
                navigate("attendance/");
              }}
              className="list-items-btn"
            >
              <ListItemIcon className="list-item-icon">
                <img
                  className="icon-img"
                  src={
                    currentPath === "/attendance/"
                      ? attendanceRedIcon
                      : attendanceIcon
                  }
                />
              </ListItemIcon>
              <ListItemText primary="Attendance" />
            </ListItemButton>
          ) : (
            ""
          )}
          {userData?.allowed_modules.admin_modules.includes("employees") ||
          userData?.allowed_modules.owner_modules.includes("employees") ? (
            <ListItemButton
              onClick={() => {
                navigate("teams/");
              }}
              className="list-items-btn"
            >
              <ListItemIcon className="list-item-icon">
                <img
                  className="icon-img"
                  src={currentPath === "/teams/" ? teamsRedIcon : teamsIcon}
                />
              </ListItemIcon>
              <ListItemText primary="Teams" />
            </ListItemButton>
          ) : (
            ""
          )}
          <ListItemButton onClick={toggleDrawer} className="drawer-arrow-btn">
            <ListItemIcon sx={{ ml: "8px" }}>
              {open ? <img src={CloseBtn} /> : <img src={OpenBtn} />}
            </ListItemIcon>
          </ListItemButton>
          {allFlags.show_setting_module ? (
            <ListItemButton className="drawer-setting-btn">
              <ListItemIcon sx={{ ml: "8px" }}>
                <img src={settingIcon} />
              </ListItemIcon>
            </ListItemButton>
          ) : (
            ""
          )}
          {userData?.is_superuser ? (
            <ListItemButton
              onClick={() => {
                navigate("settings/");
              }}
              className="list-items-btn"
            >
              <ListItemIcon className="list-item-icon">
                <img
                  className="icon-img"
                  src={
                    currentPath === "/settings/" ? settingIconRed : settingIcon
                  }
                />
              </ListItemIcon>
              <ListItemText primary="Setting" />
            </ListItemButton>
          ) : (
            ""
          )}
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
