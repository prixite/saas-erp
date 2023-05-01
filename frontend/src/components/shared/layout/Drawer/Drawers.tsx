import * as React from "react";
import { useState, useEffect } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CloseIcon from "@mui/icons-material/Close";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { styled, useTheme } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import PropTypes from "prop-types";
import { useNavigate, useLocation } from "react-router-dom";
import "@src/components/shared/layout/Drawer/Drawers.scss";
import vectorIcon from "@src/assets/svgs/24px.svg";
import vectorIconRed from "@src/assets/svgs/24pxred.svg";
import userIcon from "@src/assets/svgs/3 User.svg";
import userIconRed from "@src/assets/svgs/3 Userred.svg";
import bagIcon from "@src/assets/svgs/Bag.svg";
import workIconRed from "@src/assets/svgs/bagred.svg";
import bellIcon from "@src/assets/svgs/bell.svg";
import standupIcon from "@src/assets/svgs/Calendar.svg";
import standupRedIcon from "@src/assets/svgs/Calendarred.svg";
import categoryIcon from "@src/assets/svgs/Category.svg";
import categoryIconRed from "@src/assets/svgs/Categoryred.svg";
import leavesIcon from "@src/assets/svgs/Discovery.svg";
import leavesRedIcon from "@src/assets/svgs/Discoveryred.svg";
import attendanceIcon from "@src/assets/svgs/Leave.svg";
import attendanceRedIcon from "@src/assets/svgs/leaveRed.svg";
import reportsIcon from "@src/assets/svgs/reports.svg";
import reportsRedIcon from "@src/assets/svgs/reportsred.svg";
import searchIcon from "@src/assets/svgs/Search.svg";
import settingIcon from "@src/assets/svgs/setting.svg";
import settingIconRed from "@src/assets/svgs/settingRed.svg";
import appIcon from "@src/assets/svgs/sidebar.svg";
import teamsIcon from "@src/assets/svgs/teamicon.svg";
import teamsRedIcon from "@src/assets/svgs/teamred.svg";
import workIcon from "@src/assets/svgs/Work.svg";
import bagIconRed from "@src/assets/svgs/workred.svg";
import {
  useGetUserQuery,
  useGetFlagsQuery,
} from "@src/store/reducers/employees-api";

const drawerWidth = 390;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    //width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    //marginRight: drawerWidth,
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-start",
}));

export default function Drawers() {
  const theme = useTheme();
  const { data: Flags = [] } = useGetFlagsQuery();
  const navigate = useNavigate();
  const location = useLocation();
  const { data: userData } = useGetUserQuery();
  const [currentPath, setCurrentPath] = useState("");

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location]);
  const allFlags = Object.assign({}, ...Flags);

  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleProfileClick = () => {
    navigate("/profile");
  };
  const handleloginClick = () => {
    navigate("/login");
  };

  return (
    <>
      <AppBar
        className="app-bar-cls1"
        elevation={0}
        position="absolute"
        open={open}
        sx={{ borderBottom: "none", backgroundColor: "white" }}
      >
        <CssBaseline />

        <Toolbar className="toolbar-cls">
          <img src={appIcon} className="app logo" />

          <Toolbar
            sx={{
              borderBottom: "none",
            }}
            className="appbar-toolbar-cls"
          >
            <Box className="search-icon-box">
              <IconButton sx={{ color: "#130F26" }}>
                <img src={searchIcon} />
              </IconButton>
            </Box>

            <Box className="search-icon-box">
              <IconButton sx={{ color: "#130F26" }}>
                <Badge badgeContent={0} color="error">
                  <img src={bellIcon} />
                </Badge>
              </IconButton>
            </Box>
            <Box className="search-icon-box">
              <IconButton onClick={handleDrawerOpen}>
                <MenuIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </Toolbar>

        <Divider variant="fullWidth" />
      </AppBar>

      <Drawer
        sx={{
          // width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
          },
        }}
        variant="persistent"
        anchor="right"
        open={open}
      >
        <DrawerHeader>
          <IconButton sx={{ marginRight: "auto" }}>
            <img src={appIcon} className="app logo" />
          </IconButton>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? <CloseIcon /> : <CloseIcon />}
          </IconButton>
        </DrawerHeader>

        <Divider />

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
                <ListItemText primary="User Management" />
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
                <ListItemText primary="Employee Management" />
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
          {userData?.allowed_modules.admin_modules.includes("standup") ||
          userData?.allowed_modules.owner_modules.includes("standup") ? (
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
          {userData?.allowed_modules.admin_modules.includes("employees") ||
          userData?.allowed_modules.owner_modules.includes("employees") ? (
            <ListItemButton
              onClick={() => {
                navigate("reports/");
              }}
              className="list-items-btn"
            >
              <ListItemIcon className="list-item-icon">
                <img
                  className="icon-img"
                  src={
                    currentPath === "/reports/" ? reportsRedIcon : reportsIcon
                  }
                />
              </ListItemIcon>
              <ListItemText primary="Reports" />
            </ListItemButton>
          ) : (
            ""
          )}
          <ListItemButton
            onClick={() => {
              navigate("settings/");
            }}
            className="list-items-btn"
          >
            <ListItemIcon sx={{ ml: "3px" }}>
              <img
                src={
                  currentPath === "/settings/" ? settingIconRed : settingIcon
                }
              />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItemButton>
          <ListItemButton
            onClick={handleProfileClick}
            className="list-items-btn"
            sx={{ marginLeft: "3px" }}
          >
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItemButton>

          <ListItemButton sx={{ marginTop: "8rem" }} onClick={handleloginClick}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Log Out" />
          </ListItemButton>
        </List>
      </Drawer>
    </>
  );
}
Drawers.propTypes = {
  open: PropTypes.bool,
};
