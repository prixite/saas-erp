import { useState } from "react";
import {
  Box,
  Grid,
  TextField,
  Typography,
  Button,
  Checkbox,
} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import MenuItem from "@mui/material/MenuItem";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import uploadIcon from "@src/assets/svgs/plus.svg";
import "@src/components/shared/popUps/employeeModal/pageTwo.scss";
import { LocalizationInterface } from "@src/helpers/interfaces/localizationinterfaces";
import { localizedData } from "@src/helpers/utils/language";

const PageTwo = () => {
  const constantData: LocalizationInterface = localizedData();
  const [designation, setDesignation] = useState("");
  const [dateStarted, setDateStarted] = useState<Date | null>(null);
  const [designationErrror, setDesignationError] = useState("");

  const {
    employeeDesignationLabel,
    employeeCompnay,
    dateStart,
    dateEnd,
    CurrentlyWorking,
    uploadExperienceLetter,
  } = constantData.Modals;

  const handleDesignation = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length) {
      setDesignationError("");
    }
    setDesignation(e.target?.value);
  };
  return (
    <Box className="pagetwo-section">
      <Grid className="grid-container-cls" container spacing={2}>
        <Grid className="grid-item-cls" item xs={6}>
          <Box className="text-field-box" sx={{ minWidth: 120 }}>
            <TextField
              className="text-field-cls"
              required
              select
              fullWidth
              InputProps={{ sx: { height: 56 } }}
              label={employeeDesignationLabel}
              name="Designation"
              onChange={handleDesignation}
              value={designation}
              autoComplete="family-name"
              InputLabelProps={{ className: "textfield_label" }}
            >
              <MenuItem value={10}>Full Time</MenuItem>
              <MenuItem value={20}>Part Time</MenuItem>
              <MenuItem value={30}>Hourly Base</MenuItem>
            </TextField>
            <p className="errorText">{designationErrror}</p>
          </Box>
          <Box className="text-field-box">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                className="text-field-cls"
                label={dateStart}
                value={dateStarted}
                onChange={(newValue) => {
                  setDateStarted(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    sx={{
                      "& .MuiInputBase-input": {
                        height: "21px",
                      },
                    }}
                    {...params}
                    InputLabelProps={{ className: "textfield_label" }}
                  />
                )}
              />
              <p className="errorText">{designationErrror}</p>
            </LocalizationProvider>
          </Box>
        </Grid>
        <Grid className="grid-item-cls " item xs={6}>
          <Box className="text-field-box" sx={{ minWidth: 120 }}>
            <TextField
              className="text-field-cls"
              required
              select
              fullWidth
              InputProps={{ sx: { height: 56 } }}
              label={employeeCompnay}
              name="Designation"
              onChange={handleDesignation}
              value={designation}
              autoComplete="family-name"
              InputLabelProps={{ className: "textfield_label" }}
            >
              <MenuItem value={10}>Full Time</MenuItem>
              <MenuItem value={20}>Part Time</MenuItem>
              <MenuItem value={30}>Hourly Base</MenuItem>
            </TextField>
            <p className="errorText">{designationErrror}</p>
          </Box>
          <Box className="text-field-box">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                className="text-field-cls"
                label={dateEnd}
                value={dateStarted}
                onChange={(newValue) => {
                  setDateStarted(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    sx={{
                      "& .MuiInputBase-input": {
                        height: "21px",
                      },
                    }}
                    {...params}
                    InputLabelProps={{ className: "textfield_label" }}
                  />
                )}
              />
              <p className="errorText">{designationErrror}</p>
            </LocalizationProvider>
          </Box>
        </Grid>
      </Grid>
      <Box className="switch-section" sx={{ width: "100%" }}>
        <Box className="switch-cls">
          <FormControlLabel
            control={<Checkbox disableRipple size="small" />}
            label={
              <Typography
                sx={{ color: "#6C6C6C", fontSize: "16px", fontWeight: "400" }}
                className="label-cls"
              >
                {CurrentlyWorking}
              </Typography>
            }
          />
        </Box>
        <Box className="upload-box">
          <Button className="upload-btn">
            <span>
              {" "}
              <img className="upload-img" src={uploadIcon} alt="doc" />
            </span>{" "}
            {uploadExperienceLetter}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default PageTwo;
