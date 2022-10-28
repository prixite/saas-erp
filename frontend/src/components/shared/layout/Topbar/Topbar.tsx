import { Typography } from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import PropTypes from "prop-types";
import employeeAvatar from "@src/assets/images/avatar.jpeg";
import bellIcon from "@src/assets/svgs/bell.svg";
import lineIcon from "@src/assets/svgs/Line 7.svg";
import searchIcon from "@src/assets/svgs/Search.svg";
import TopbarSecondaryMenu from "@src/components/shared/layout/Topbarsecondary/topbar-secondary-menu";
import "@src/components/shared/layout/Topbar/Topbar.scss";

const drawerWidth = 169;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: "#F5F5F5",
  borderBottom: "1px solid #9D9D9D",
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Topbar = (props) => {
  const { open } = props;
  return (
    <>
      <AppBar
        className="app-bar-cls"
        elevation={0}
        position="absolute"
        open={open}
        sx={{ borderBottom: "none", left: "72px" }}
      >
        <Toolbar
          sx={{
            borderBottom: "none",
            backgroundColor: "white",
          }}
          className="appbar-toolbar-cls"
        >
          {/* <BreadCrumbs /> */}
          <Typography
            sx={{ flexGrow: 1, ml: "25px", mt: "5px", fontWeight: "200" }}
            color="secondary"
            variant="h2"
            component="h2"
          >
            Hey Umair
          </Typography>
          <Box className="search-icon-box">
            <IconButton sx={{ color: "#130F26" }}>
              <img src={searchIcon} />
            </IconButton>
            <img src={lineIcon} />
          </Box>

          <Box className="search-icon-box">
            <IconButton sx={{ color: "#130F26" }}>
              <Badge badgeContent={0} color="error">
                <img src={bellIcon} />
              </Badge>
            </IconButton>
            <img src={lineIcon} />
          </Box>

          <IconButton sx={{ color: "#130F26" }}>
            <Avatar
              alt="loggedIn user"
              src={employeeAvatar}
              sx={{ width: 32, height: 32 }}
            />
          </IconButton>
          <TopbarSecondaryMenu />
        </Toolbar>
      </AppBar>
    </>
  );
};
Topbar.propTypes = {
  open: PropTypes.bool,
};
export default Topbar;
