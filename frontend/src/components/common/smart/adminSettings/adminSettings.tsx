import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import "@src/components/common/smart/adminSettings/adminSettings.scss";

const AdminSettings = () => {
  return (
    <Box sx={{ mt: "25px" }}>
      <Typography mb={5} variant="h1">
        {"Admin Settings"}
      </Typography>
      <Link className="link" to="/organizations">
        {"View Organizations"}
      </Link>
      <Link className="link" to="/modules">
        {"View Modules"}
      </Link>
      <Link className="link" to="/organizations/modules">
        {"View Organization Modules"}
      </Link>
    </Box>
  );
};

export default AdminSettings;
