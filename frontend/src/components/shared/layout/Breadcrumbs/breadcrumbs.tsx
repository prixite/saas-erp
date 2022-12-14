import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ArrowIcon from "@src/assets/svgs/ArrowDown.svg";
import { LocalizationInterface } from "@src/helpers/interfaces/localizationinterfaces";
import { localizedData } from "@src/helpers/utils/language";
import { capitalizeFirstLowercaseRest } from "@src/helpers/utils/utils";
import { useGetEmployeeDataQuery } from "@src/store/reducers/employees-api";
import "@src/components/shared/layout/Breadcrumbs/breadcrumbs.scss";

const BreadCrumbs = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { employeeId } = useParams();
  const constantData: LocalizationInterface = localizedData();
  const { Home } = constantData.BreadCrumbs;
  const { data: EmployeeData, isLoading } = useGetEmployeeDataQuery(
    {
      id: Number(employeeId || ""),
    },
    { skip: !Number(employeeId || "") }
  );
  const pathnames = location.pathname.split("/").filter((x) => x);
  return (
    <Breadcrumbs
      separator={<img src={ArrowIcon} style={{ marginTop: "10px" }} />}
      aria-label="breadcrumb"
      className="bread-crumbs"
      sx={{ ml: "25px", flexGrow: 1, display: { xs: "none", sm: "block" } }}
    >
      {pathnames.length > 0 ? (
        <Link
          color="inherit"
          underline="none"
          className="link-cls"
          onClick={() => navigate("/")}
          sx={{ fontSize: "14px", fontWeight: "400", cursor: "pointer" }}
        >
          {Home}
        </Link>
      ) : (
        <Typography fontWeight={600} variant={"h5"} color="text.primary">
          {" "}
          {Home}{" "}
        </Typography>
      )}
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join("/")}/`;
        const isLast = index === pathnames.length - 1;
        return isLast ? (
          <Typography
            key={name}
            fontWeight={600}
            variant={"h5"}
            color="text.primary"
          >
            {name === "employees"
              ? capitalizeFirstLowercaseRest("employee's")
              : parseInt(name)
              ? `${
                  isLoading
                    ? ""
                    : `${EmployeeData?.user?.first_name} ${EmployeeData?.user?.last_name}`
                } `
              : capitalizeFirstLowercaseRest(name)}
          </Typography>
        ) : (
          <Link
            key={name}
            color="inherit"
            underline="none"
            className="link-cls"
            onClick={() => navigate(routeTo)}
            sx={{ fontSize: "14px", fontWeight: "400", cursor: "pointer" }}
          >
            {name === "employees"
              ? capitalizeFirstLowercaseRest("employee's")
              : capitalizeFirstLowercaseRest(name)}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};
export default BreadCrumbs;
