import { useState } from "react";
import {
  Box,
  Grid,
  Autocomplete,
  TextField,
  Switch,
  Typography,
  Checkbox,
} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import MenuItem from "@mui/material/MenuItem";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import "@src/components/shared/popUps/employeeModal/pageOne.scss";
import { assets } from "@src/helpers/constants/constants";
import { LocalizationInterface } from "@src/helpers/interfaces/localizationinterfaces";
import { localizedData } from "@src/helpers/utils/language";

const label = { inputProps: { "aria-label": "Color switch demo" } };
const PageOne = () => {
  const constantData: LocalizationInterface = localizedData();
  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  const [dateStarted, setDateStarted] = useState<Date | null>(null);
  const [nameError, setNameError] = useState("");
  const [designationErrror, setDesignationError] = useState("");

  const {
    employeeNameLabel,
    employeeEmailLabel,
    employeePhoneLabel,
    employeeCnicLabel,
    employeeDateLabel,
    employeeManagerLabel,
    employeeDesignationLabel,
    employeeSalaryLabel,
    employeeManagingLabel,
    employeeEmployementLabel,
    employeeAssetLabel,
    employeeEmergencyContactLabel,
    employeeCompensationLabel,
  } = constantData.Modals;

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length) {
      setNameError("");
    }
    setName(e.target?.value);
  };
  const handleDesignation = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length) {
      setDesignationError("");
    }
    setDesignation(e.target?.value);
  };
  return (
    <Box className="pageone-section">
      <Grid className="grid-container-cls" container spacing={2}>
        <Grid className="grid-item-cls" item xs={6}>
          <Box className="text-field-box">
            <TextField
              className="text-field-cls"
              required
              fullWidth
              name="Name"
              InputProps={{ sx: { height: 56 } }}
              label={employeeNameLabel}
              onChange={handleName}
              value={name}
              autoComplete="family-name"
              InputLabelProps={{ className: "textfield_label" }}
            />
            <p className="errorText">{nameError}</p>
          </Box>
          <Box className="text-field-box">
            <TextField
              className="text-field-cls"
              required
              fullWidth
              label={employeePhoneLabel}
              InputProps={{ sx: { height: 56 } }}
              name="Designation"
              onChange={handleDesignation}
              value={designation}
              autoComplete="family-name"
              InputLabelProps={{ className: "textfield_label" }}
            />
            <p className="errorText">{designationErrror}</p>
          </Box>
          <Box className="text-field-box">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                className="text-field-cls"
                label={employeeDateLabel}
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
              <MenuItem value={10}>Seniort Developer</MenuItem>
              <MenuItem value={20}>Project Manager</MenuItem>
              <MenuItem value={30}>Juinor Developer</MenuItem>
            </TextField>
            <p className="errorText">{designationErrror}</p>
          </Box>
          <Box className="text-field-box">
            <TextField
              className="text-field-cls"
              required
              fullWidth
              label={employeeManagingLabel}
              InputProps={{ sx: { height: 56 } }}
              name="Designation"
              onChange={handleDesignation}
              value={designation}
              autoComplete="family-name"
              InputLabelProps={{ className: "textfield_label" }}
            />
            <p className="errorText">{designationErrror}</p>
          </Box>
          <Box className="text-field-box">
            <Autocomplete
              multiple
              className="text-field-cls"
              options={assets}
              getOptionLabel={(option) => option.title}
              filterSelectedOptions
              renderInput={(params) => (
                <TextField
                  {...params}
                  InputProps={{ sx: { height: 56 } }}
                  InputLabelProps={{ className: "textfield_label" }}
                  label={employeeAssetLabel}
                  placeholder={employeeAssetLabel}
                />
              )}
            />
            <p className="errorText">{designationErrror}</p>
          </Box>
        </Grid>
        <Grid className="grid-item-cls " item xs={6}>
          <Box className="text-field-box">
            <TextField
              className="text-field-cls"
              required
              fullWidth
              name="Name"
              InputProps={{ sx: { height: 56 } }}
              label={employeeEmailLabel}
              onChange={handleName}
              value={name}
              autoComplete="family-name"
              InputLabelProps={{ className: "textfield_label" }}
            />
            <p className="errorText">{nameError}</p>
          </Box>
          <Box className="text-field-box">
            <TextField
              className="text-field-cls"
              required
              fullWidth
              label={employeeCnicLabel}
              name="Designation"
              InputProps={{ sx: { height: 56 } }}
              onChange={handleDesignation}
              value={designation}
              autoComplete="family-name"
              InputLabelProps={{ className: "textfield_label" }}
            />
            <p className="errorText">{designationErrror}</p>
          </Box>
          <Box className="text-field-box">
            <TextField
              className="text-field-cls"
              required
              fullWidth
              label={employeeManagerLabel}
              InputProps={{ sx: { height: 56 } }}
              name="Designation"
              onChange={handleDesignation}
              value={designation}
              autoComplete="family-name"
              InputLabelProps={{ className: "textfield_label" }}
            />
            <p className="errorText">{designationErrror}</p>
          </Box>
          <Box className="text-field-box">
            <TextField
              className="text-field-cls"
              required
              fullWidth
              InputProps={{ sx: { height: 56 } }}
              label={employeeSalaryLabel}
              name="Designation"
              onChange={handleDesignation}
              value={designation}
              autoComplete="family-name"
              InputLabelProps={{ className: "textfield_label" }}
            />
            <p className="errorText">{designationErrror}</p>
          </Box>
          <Box className="text-field-box" sx={{ minWidth: 120 }}>
            <TextField
              className="text-field-cls"
              required
              select
              fullWidth
              InputProps={{ sx: { height: 56 } }}
              label={employeeEmployementLabel}
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
            <TextField
              className="text-field-cls"
              required
              fullWidth
              InputProps={{ sx: { height: 56 } }}
              label={employeeEmergencyContactLabel}
              name="Designation"
              onChange={handleDesignation}
              value={designation}
              autoComplete="family-name"
              InputLabelProps={{ className: "textfield_label" }}
            />
            <p className="errorText">{designationErrror}</p>
          </Box>
        </Grid>
      </Grid>
      <Box className="switch-section" sx={{ width: "100%" }}>
        <Box className="switch-cls">
          <Switch
            size="small"
            {...label}
            sx={{ paddingLeft: "5px" }}
            defaultChecked
            color="default"
          />
          <Typography
            sx={{
              color: "black",
              fontSize: "16px",
              fontWeight: "400",
              ml: "10px",
            }}
          >
            {employeeCompensationLabel}
          </Typography>
        </Box>
        <Box
          className="checkbox-section"
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box
            className="checkbox-cls"
            sx={{ display: "flex", flexDirection: "column" }}
          >
            <FormControlLabel
              control={<Checkbox disableRipple size="small" />}
              label={
                <Typography
                  sx={{ color: "#6C6C6C", fontSize: "16px", fontWeight: "400" }}
                  className="label-cls"
                >
                  Meals Allowance
                </Typography>
              }
            />
            <FormControlLabel
              control={<Checkbox disableRipple size="small" />}
              label={
                <Typography
                  sx={{ color: "#6C6C6C", fontSize: "16px", fontWeight: "400" }}
                  className="label-cls"
                >
                  Fuel Allowance
                </Typography>
              }
            />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <FormControlLabel
              control={<Checkbox disableRipple size="small" checked={true} />}
              label={
                <Typography
                  sx={{ color: "#6C6C6C", fontSize: "16px", fontWeight: "400" }}
                  className="label-cls"
                >
                  Dinner Allowance
                </Typography>
              }
            />
            <FormControlLabel
              control={<Checkbox disableRipple size="small" checked={true} />}
              label={
                <Typography sx={{ color: "#6C6C6C" }} className="label-cls">
                  Phone Allowance
                </Typography>
              }
            />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <FormControlLabel
              control={<Checkbox disableRipple size="small" checked={true} />}
              label={
                <Typography
                  sx={{ color: "#6C6C6C", fontSize: "16px", fontWeight: "400" }}
                  className="label-cls"
                >
                  Fuel Allowance
                </Typography>
              }
            />
            <FormControlLabel
              control={<Checkbox disableRipple size="small" />}
              label={
                <Typography
                  sx={{ color: "#6C6C6C", fontSize: "16px", fontWeight: "400" }}
                  className="label-cls"
                >
                  Meal Allowance
                </Typography>
              }
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default PageOne;
