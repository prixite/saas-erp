import { Box, Typography, Grid } from "@mui/material";
import blueLine from "@src/assets/svgs/blueline.svg";
import greenLine from "@src/assets/svgs/greenline.svg";
import orangeLine from "@src/assets/svgs/orangeline.svg";
import purpleLine from "@src/assets/svgs/purpleline.svg";
import redLine from "@src/assets/svgs/redline.svg";
import ThreeDotter from "@src/assets/svgs/ThreeDotter.svg";
import "@src/components/common/presentational/attendanceSummary/attendanceSummary.scss";
import { LocalizationInterface } from "@src/helpers/interfaces/localizationinterfaces";
import { localizedData } from "@src/helpers/utils/language";

const AttendanceSummary = () => {
  const constantData: LocalizationInterface = localizedData();
  const {
    AttendanceSummary,
    Present,
    Absent,
    Leaves,
    LateArrival,
    ShortDuration,
  } = constantData.Leaves;
  return (
    <Box className="attendance-section">
      <Box className="heading-section">
        <Typography className="heading-cls">{AttendanceSummary}</Typography>
        <Box className="menu-cls">
          <img className="menu-pic" src={ThreeDotter} alt="menu" />
        </Box>
      </Box>
      <Grid container className="stack-cls">
        <Grid item xs={2} className="section-item-cls">
          <img src={greenLine} />
          <Box className="item-detail-cls">
            <Typography className="item-detail">{Present}</Typography>
            <Typography className="item-count">02</Typography>
          </Box>
        </Grid>
        <Grid item xs={2} className="section-item-cls">
          <img src={redLine} />
          <Box className="item-detail-cls">
            <Typography className="item-detail">{Absent}</Typography>
            <Typography className="item-count">05</Typography>
          </Box>
        </Grid>
        <Grid item xs={2} className="section-item-cls">
          <img src={orangeLine} />
          <Box className="item-detail-cls">
            <Typography className="item-detail">{LateArrival}</Typography>
            <Typography className="item-count">08</Typography>
          </Box>
        </Grid>
        <Grid item xs={2} className="section-item-cls">
          <img src={purpleLine} />
          <Box className="item-detail-cls">
            <Typography className="item-detail">{Leaves}</Typography>
            <Typography className="item-count">12</Typography>
          </Box>
        </Grid>
        <Grid item xs={2} className="section-item-cls">
          <img src={blueLine} />
          <Box className="item-detail-cls">
            <Typography className="item-detail">{ShortDuration}</Typography>
            <Typography className="item-count">22</Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AttendanceSummary;
