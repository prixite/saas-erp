import { Typography } from "@mui/material";
import { Box } from "@mui/material";
// import makeStyles from "@mui/styles/makeStyles";

// const useStyles = makeStyles((theme) => ({
//   pageHeader: {
//     display: "flex",
//     fontWeight: "bold",
//     fontSize: "22px",
//     paddingTop: "11px",
//     paddingBottom: "36px",
//     marginTop: "25px",
//     // justifyContent: "center",
//     // marginBottom: theme.spacing(2),
//   },
//   pageIcon: {
//     display: "inline-block",
//     padding: theme.spacing(2),
//     color: "#3c44b1",
//   },
//   pageTitle: {
//     // paddingLeft: "50px",
//     "& .MuiTypography-subtitle2": {
//       opacity: "0.6",
//     },
//   },
// }));
interface props {
  title: string;
  subTitle: string;
}

const PageHeader = ({ title, subTitle }: props) => {
  return (
    <Box
      sx={{
        display: "flex",
        fontWeight: "bold",
        fontSize: "22px",
        paddingTop: "11px",
        paddingBottom: "36px",
        marginTop: "25px",
      }}
    >
      <Box>
        <Typography variant="h4" component="div">
          {title}
        </Typography>
        <Typography variant="subtitle2" component="div">
          {subTitle}
        </Typography>
      </Box>
    </Box>
  );
};
export default PageHeader;
