import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { useLocation, useNavigate } from "react-router-dom";
import { capitalizeFirstLowercaseRest } from "@src/helpers/utils/utils";
import "@src/components/shared/layout/Breadcrumbs/breadcrumbs.scss";

const BreadCrumbs = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <Breadcrumbs
      separator={<NavigateNextIcon fontSize="medium" />}
      aria-label="breadcrumb"
      sx={{ ml: "25px", flexGrow: 1, display: { xs: "none", sm: "block" } }}
    >
      {pathnames.length > 0 ? (
        <Link
          sx={{ fontSize: "14px", fontWeight: "400", cursor: "pointer" }}
          underline="hover"
          color="inherit"
          onClick={() => navigate("/")}
        >
          Home
        </Link>
      ) : (
        <Typography fontWeight={400} variant={"h5"} color="inherit">
          {" "}
          Home{" "}
        </Typography>
      )}
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join("/")}/`;
        const isLast = index === pathnames.length - 1;
        return isLast ? (
          <Typography
            key={name}
            fontWeight={400}
            variant={"h5"}
            color="text.primary"
          >
            {capitalizeFirstLowercaseRest(name)}
          </Typography>
        ) : (
          <Link
            underline="hover"
            key={name}
            color="inherit"
            onClick={() => navigate(routeTo)}
            sx={{ fontSize: "14px", fontWeight: "400", cursor: "pointer" }}
          >
            {capitalizeFirstLowercaseRest(name)}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};
export default BreadCrumbs;
