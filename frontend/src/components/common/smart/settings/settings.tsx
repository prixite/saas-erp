import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import "@src/components/common/smart/settings/settings.scss";

const Settings = () => {
  return (
    <Box sx={{ mt: "25px" }}>
      <Typography mb={5} variant="h1">
        {"Settings"}
      </Typography>
      <Link className="link" to="/settings/department">
        {"View departments"}
      </Link>
      <Link className="link" to="/settings/employment-type">
        {"View employment types"}
      </Link>
      <Link className="link" to="/settings/program">
        {"View programs"}
      </Link>
      <Link className="link" to="/settings/institute">
        {"View institutes"}
      </Link>
      <Link className="link" to="/settings/company">
        {"View companies"}
      </Link>
    </Box>
  );
};

export default Settings;
