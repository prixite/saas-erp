import { Typography, Box } from "@mui/material";
import { LocalizationInterface } from "@src/helpers/interfaces/localizationinterfaces";
import { localizedData } from "@src/helpers/utils/language";

const payroll = () => {
  const constantData: LocalizationInterface = localizedData();
  const { payrollHeading } = constantData.Payroll;
  return (
    <Box>
      <Typography variant="h1">{payrollHeading}</Typography>
    </Box>
  );
};

export default payroll;
