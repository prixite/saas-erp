import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

const BreadCrumbs = () => {
  function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    event.preventDefault();
  }
  const breadcrumbs = [
    <Link
      underline="hover"
      key="1"
      color="inherit"
      href="/"
      onClick={handleClick}
    >
      Home
    </Link>,
    <Link
      underline="hover"
      key="2"
      color="inherit"
      href="/material-ui/getting-started/installation/"
      onClick={handleClick}
    >
      Employees
    </Link>,
    <Typography key="3" color="text.primary">
      Nolan Aminoff
    </Typography>,
  ];
  return (
    <>
      <Breadcrumbs
        separator="›"
        aria-label="breadcrumb"
        sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
      >
        {breadcrumbs}
      </Breadcrumbs>
    </>
  );
};
export default BreadCrumbs;
