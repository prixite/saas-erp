// import { makeStyles, useTheme } from "@mui/styles";
import PropTypes from "prop-types";
// import clsx from "clsx";
import Topbar from "./Topbar";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     paddingTop: 56,
//     height: "auto",
//     [theme.breakpoints.up("sm")]: {
//       paddingTop: 64,
//     },
//     backgroundColor: theme.BOARD.bg.main,
//     // backgroundColor: theme.colors.primary.main,
//   },
//   shiftContent: {
//     paddingLeft: 240,
//   },
//   content: {
//     //height: "fitContent",
//     height: "auto",
//     paddingBottom: "50px",
//     marginLeft: "50px",
//     width: "93.5%",
//     backgroundColor: theme.BOARD.bg.main,
//     [theme.breakpoints.down("md")]: {
//       marginLeft: "10px",
//       width: "98.5%",
//     },
//   },
//   Dashboard: {
//     backgroundColor: theme.BOARD.bg.main,
//     fontSize: "14px",
//   },
// }));

const Layout = (props) => {
  const { children } = props;

  //   const classes = useStyles();
  //   const theme = useTheme();
  //   const isDesktop = useMediaQuery(theme.breakpoints.up("lg"), {
  //     defaultMatches: true,
  //   });

  //   const [openSidebar, setOpenSidebar] = useState(false);

  //   const handleSidebarOpen = () => {
  //     setOpenSidebar(true);
  //   };

  //   const handleSidebarClose = () => {
  //     console.log("working...... close");
  //     setOpenSidebar(false);
  //   };

  //   const shouldOpenSidebar = isDesktop ? true : openSidebar;

  return (
    <div
    //   className={clsx({
    //     [classes.root]: true,
    //     [classes.shiftContent]: isDesktop,
    //   })}
    >
      {/* <Topbar onSidebarOpen={handleSidebarOpen} /> */}
      <Topbar />
      {/* <Sidebar
        onClose={handleSidebarClose}
        open={shouldOpenSidebar}
        variant={isDesktop ? "persistent" : "temporary"}
      /> */}
      <main>{children}</main>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;
