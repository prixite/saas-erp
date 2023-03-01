import { useState } from "react";
import { Box, Typography, Button, TextField, MenuItem } from "@mui/material";
import downloadIcon from "@src/assets/svgs/download.svg";
import filterIcon from "@src/assets/svgs/filterButtonIcon.svg";
import EmployeeButtons from "@src/components/common/presentational/employeeButtons/EmployeeButtons";
import Attendance from "@src/components/common/smart/attendance/attendance";
import Input from "@src/components/shared/formControls/textInput/textInput";
import { LocalizationInterface } from "@src/helpers/interfaces/localizationinterfaces";
import { localizedData } from "@src/helpers/utils/language";
import "@src/components/common/smart/reports/reports.scss";

function Reports() {
  const constantData: LocalizationInterface = localizedData();
  const { Reports, DownloadBtn } = constantData.Reports;
  const [buttonNameClicked, setButtonNameClicked] =
    useState<string>("ATTENDANCE");
  const { filterButton } = constantData.Buttons;
  return (
    <Box className="reports-section">
      <Box className="top-bar-cls">
        <Typography className="title-cls">{Reports}</Typography>
        <EmployeeButtons setButtonNameClicked={setButtonNameClicked} />
      </Box>
      <Box className="filter-section">
        <Input />
        <Box className="filter-btn-cls">
          <Button
            className="filter-btn"
            id="filter-btn-id"
            variant="outlined"
            startIcon={
              <img className="profile-pic" src={filterIcon} alt="profile pic" />
            }
          >
            {" "}
            <p>{filterButton}</p>
          </Button>
        </Box>
        <Box className="filter-btn-cls">
          <Button
            className="filter-btn"
            id="filter-btn-id"
            variant="outlined"
            startIcon={
              <img
                className="profile-pic"
                src={downloadIcon}
                alt="profile pic"
              />
            }
          >
            {" "}
            <p>{DownloadBtn}</p>
          </Button>
        </Box>
        <Box className="fields-cls">
          <TextField
            margin="normal"
            className="text-field-cls"
            select
            fullWidth
            defaultValue="Monthly"
            name="leave_type"
            sx={{
              width: 125,
            }}
            InputProps={{
              sx: {
                height: 44,
                borderRadius: "12px",
                fontSize: "14px",
                fontWeight: "400",
              },
            }}
            label="Duration"
            InputLabelProps={{
              className: "textfield_label",
              sx: {
                fontSize: "1.6vh",
                top: "-0.4vh",
                "&.MuiInputLabel-shrink": { top: 0 },
              },
            }}
          >
            <MenuItem
              sx={{ fontWeight: "400", fontSize: "14px" }}
              value="Monthly"
            >
              Monthly
            </MenuItem>
            <MenuItem
              sx={{ fontWeight: "400", fontSize: "14px" }}
              value="Weekly"
            >
              Weekly
            </MenuItem>
            <MenuItem
              sx={{ fontWeight: "400", fontSize: "14px" }}
              value="Yearly"
            >
              Yearly
            </MenuItem>
          </TextField>
        </Box>
      </Box>
      {buttonNameClicked === "ATTENDANCE" ? (
        <Attendance />
      ) : buttonNameClicked === "CHECKIN" ? (
        <Attendance />
      ) : buttonNameClicked === "AVAILABILITY" ? (
        <Attendance />
      ) : (
        <></>
      )}
    </Box>
  );
}
export default Reports;
