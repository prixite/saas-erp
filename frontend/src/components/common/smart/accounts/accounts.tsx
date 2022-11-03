import { Typography, Box } from "@mui/material";
import { LocalizationInterface } from "@src/helpers/interfaces/localizationinterfaces";
import { localizedData } from "@src/helpers/utils/language";

const accounts = () => {
  const constantData: LocalizationInterface = localizedData();
  const { accountHeading } = constantData.Account;
  return (
    <Box>
      <Typography variant="h1">{accountHeading}</Typography>
    </Box>
  );
};

export default accounts;
