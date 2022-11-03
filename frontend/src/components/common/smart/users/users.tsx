import { Typography, Box } from "@mui/material";
import { LocalizationInterface } from "@src/helpers/interfaces/localizationinterfaces";
import { localizedData } from "@src/helpers/utils/language";

const users = () => {
  const constantData: LocalizationInterface = localizedData();
  const { userHeading } = constantData.User;
  return (
    <Box>
      <Typography variant="h1">{userHeading}</Typography>
    </Box>
  );
};

export default users;
