import { Box, Typography } from "@mui/material";
import "@src/components/common/presentational/checkingTime/checkingTime.scss";
import clockIcon from "@src/assets/svgs/clock.svg";
import ThreeDotter from "@src/assets/svgs/ThreeDotter.svg";
import { LocalizationInterface } from "@src/helpers/interfaces/localizationinterfaces";
import { localizedData } from "@src/helpers/utils/language";

const CheckingTime = () => {
  const constantData: LocalizationInterface = localizedData();
  const { CheckingTime, ClockError } = constantData.Leaves;
  return (
    <Box className="checking-time-section">
      <Box className="heading-section">
        <Typography className="heading-cls">{CheckingTime}</Typography>
        <Box className="menu-cls">
          <img className="menu-pic" src={ThreeDotter} alt="menu" />
        </Box>
      </Box>
      <Box className="clock-img">
        <img src={clockIcon} alt="clock" />
        <Typography>{ClockError}</Typography>
      </Box>
    </Box>
  );
};

export default CheckingTime;
