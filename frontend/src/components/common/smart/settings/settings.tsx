import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import { LocalizationInterface } from "@src/helpers/interfaces/localizationinterfaces";
import { localizedData } from "@src/helpers/utils/language";
import "@src/components/common/smart/settings/settings.scss";

const Settings = () => {
  const constantData: LocalizationInterface = localizedData();
  const {
    Setting,
    ViewDepertaments,
    ViewEmployements,
    ViewCompanies,
    ViewInstitues,
    ViewPrograms,
    ViewCurrencies,
  } = constantData.SettingPage;
  return (
    <Box className="setting-section">
      <Typography className="title-cls">{Setting}</Typography>
      <Box className="card-section">
        <Link className="link-cls" to="/settings/department">
          <Box component="div" className="card">
            <Box className="info">
              <p className="category"> {ViewDepertaments}</p>
            </Box>
          </Box>
        </Link>
        <Link className="link-cls" to="/settings/employment-type">
          <Box component="div" className="card">
            <Box className="info">
              <p className="category">{ViewEmployements}</p>
            </Box>
          </Box>
        </Link>
        <Link className="link-cls" to="/settings/program">
          <Box component="div" className="card">
            <Box className="info">
              <p className="category">{ViewPrograms}</p>
            </Box>
          </Box>
        </Link>
        <Link className="link-cls" to="/settings/institute">
          <Box component="div" className="card">
            <Box className="info">
              <p className="category">{ViewInstitues}</p>
            </Box>
          </Box>
        </Link>
        <Link className="link-cls" to="/settings/company">
          <Box component="div" className="card">
            <Box className="info">
              <p className="category">{ViewCompanies}</p>
            </Box>
          </Box>
        </Link>
        <Link className="link-cls" to="/settings/currency">
          <Box component="div" className="card">
            <Box className="info">
              <p className="category">{ViewCurrencies}</p>
            </Box>
          </Box>
        </Link>
      </Box>
    </Box>
  );
};

export default Settings;
