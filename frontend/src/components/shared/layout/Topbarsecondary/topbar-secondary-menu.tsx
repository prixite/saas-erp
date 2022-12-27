import * as React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ArchiveIcon from "@mui/icons-material/Archive";
import EditIcon from "@mui/icons-material/Edit";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LogoutIcon from "@mui/icons-material/Logout";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Menu, { MenuProps } from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { styled, alpha } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@src/components/hoc/AuthContext";
import { useGetUserQuery } from "@src/store/reducers/employees-api";
import "@src/components/shared/layout/Topbarsecondary/topbar-secondary-menu.scss";

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

const TopbarSecondaryMenu = () => {
  const { data: userData } = useGetUserQuery();
  const { signOut } = React.useContext(AuthContext);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleProfileClick = () => {
    navigate("/profile");
    handleClose();
  };

  return (
    <Box className="topbar-secondary">
      <Button
        id="demo-customized-button"
        aria-controls={open ? "demo-customized-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="text"
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
        sx={{ color: "#130F26", textTransform: "capitalize" }}
      >
        {userData?.first_name} {userData?.last_name}
      </Button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleProfileClick} disableRipple>
          <AccountCircleIcon />
          Profile
        </MenuItem>
        <MenuItem onClick={handleClose} disableRipple>
          <EditIcon />
          Edit
        </MenuItem>
        <MenuItem onClick={handleClose} disableRipple>
          <FileCopyIcon />
          Duplicate
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem onClick={handleClose} disableRipple>
          <ArchiveIcon />
          Archive
        </MenuItem>
        <MenuItem onClick={handleClose} disableRipple>
          <MoreHorizIcon />
          More
        </MenuItem>
        <MenuItem onClick={signOut} disableRipple>
          <LogoutIcon />
          Logout
        </MenuItem>
      </StyledMenu>
    </Box>
  );
};
export default TopbarSecondaryMenu;
