import React, { useState } from "react";
import {
  Box,
  Grid,
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
import {
  LocalizationInterface,
  Formik,
} from "@src/helpers/interfaces/localizationinterfaces";
import { localizedData } from "@src/helpers/utils/language";

const label = { inputProps: { "aria-label": "Color switch demo" } };
interface Props {
  formik: Formik;
}
const PageOne = ({ formik }: Props) => {
  const constantData: LocalizationInterface = localizedData();
  const [checked, setChecked] = useState(false);

  const {
    employeeFirstName,
    employeeLastName,
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
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };
  return (
    <Box className="pageone-section">
      <Grid className="grid-container-cls" container spacing={2}>
        <Grid className="grid-item-cls" item xs={6}>
          <Box className="text-field-box">
            <TextField
              className="text-field-cls"
              fullWidth
              name="firstName"
              label={employeeFirstName}
              onChange={formik.handleChange}
              value={formik.values.firstName}
              InputLabelProps={{ className: "textfield_label" }}
            />
            <p className="errorText">{formik.errors?.firstName}</p>
          </Box>
          <Box className="text-field-box">
            <TextField
              className="text-field-cls"
              required
              fullWidth
              name="contactNumber"
              label={employeePhoneLabel}
              onChange={formik.handleChange}
              value={formik.values.contactNumber}
              InputLabelProps={{ className: "textfield_label" }}
            />
            <p className="errorText">{formik.errors?.contactNumber}</p>
          </Box>
          <Box className="text-field-box">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                className="text-field-cls"
                label={employeeDateLabel}
                value={formik.values.createdAt}
                onChange={(newValue) => {
                  formik.setFieldValue("createdAt", newValue);
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
              <p className="errorText">{formik.errors?.createdAt}</p>
            </LocalizationProvider>
          </Box>
          <Box className="text-field-box">
            <TextField
              className="text-field-cls"
              select
              fullWidth
              name="designation"
              label={employeeDesignationLabel}
              onChange={formik.handleChange}
              value={formik.values.designation}
              InputLabelProps={{ className: "textfield_label" }}
            >
              <MenuItem value={10}>Seniort Developer</MenuItem>
              <MenuItem value={20}>Project Manager</MenuItem>
              <MenuItem value={30}>Juinor Developer</MenuItem>
            </TextField>
            <p className="errorText">{formik.errors?.designation}</p>
          </Box>
          <Box className="text-field-box">
            <TextField
              className="text-field-cls"
              select
              fullWidth
              name="managing"
              label={employeeManagingLabel}
              onChange={formik.handleChange}
              value={formik.values.managing}
              SelectProps={{
                multiple: true,
              }}
              InputLabelProps={{ className: "textfield_label" }}
            >
              <MenuItem value={10}>Umair Khan</MenuItem>
              <MenuItem value={20}>Umair Khan</MenuItem>
              <MenuItem value={30}>Umair Khan</MenuItem>
            </TextField>
            <p className="errorTexte">{formik.errors?.managing}</p>
          </Box>
          <Box className="text-field-box">
            <TextField
              className="text-field-cls"
              select
              fullWidth
              name="type"
              label={employeeEmployementLabel}
              onChange={formik.handleChange}
              value={formik.values.type}
              InputLabelProps={{ className: "textfield_label" }}
            >
              <MenuItem value={10}>Full Time</MenuItem>
              <MenuItem value={20}>Part Time</MenuItem>
              <MenuItem value={30}>Hourly Base</MenuItem>
            </TextField>
            <p className="errorText">{formik.errors?.type}</p>
          </Box>
        </Grid>
        <Grid className="grid-item-cls " item xs={6}>
          <Box className="text-field-box">
            <TextField
              className="text-field-cls"
              fullWidth
              name="lastName"
              label={employeeLastName}
              onChange={formik.handleChange}
              value={formik.values.lastName}
              InputLabelProps={{ className: "textfield_label" }}
            />
            <p className="errorText">{formik.errors?.lastName}</p>
          </Box>
          <Box className="text-field-box">
            <TextField
              className="text-field-cls"
              fullWidth
              name="email"
              label={employeeEmailLabel}
              onChange={formik.handleChange}
              value={formik.values.email}
              InputLabelProps={{ className: "textfield_label" }}
            />
            <p className="errorText">{formik.errors?.email}</p>
          </Box>
          <Box className="text-field-box">
            <TextField
              className="text-field-cls"
              fullWidth
              name="nic"
              label={employeeCnicLabel}
              onChange={formik.handleChange}
              value={formik.values.nic}
              InputLabelProps={{ className: "textfield_label" }}
            />
            <p className="errorText">{formik.errors?.nic}</p>
          </Box>
          <Box className="text-field-box">
            <TextField
              className="text-field-cls"
              select
              fullWidth
              name="manager"
              label={employeeManagerLabel}
              onChange={formik.handleChange}
              value={formik.values.manager}
              InputLabelProps={{ className: "textfield_label" }}
            >
              <MenuItem value={10}>Umair Khan</MenuItem>
              <MenuItem value={20}>Umair Jameel</MenuItem>
              <MenuItem value={30}>Ali Hassan</MenuItem>
            </TextField>
            <p className="errorText">{formik.errors?.manager}</p>
          </Box>
          <Box className="text-field-box">
            <TextField
              className="text-field-cls"
              fullWidth
              name="salary"
              label={employeeSalaryLabel}
              onChange={formik.handleChange}
              value={formik.values.salary}
              InputLabelProps={{ className: "textfield_label" }}
            />
            <p className="errorText">{formik.errors?.salary}</p>
          </Box>

          <Box className="text-field-box">
            <TextField
              className="text-field-cls"
              fullWidth
              name="emergencyContactNumber"
              label={employeeEmergencyContactLabel}
              onChange={formik.handleChange}
              value={formik.values.emergencyContactNumber}
              InputLabelProps={{ className: "textfield_label" }}
            />
            <p className="errorText">{formik.errors?.emergencyContactNumber}</p>
          </Box>
        </Grid>
        <Grid
          className="grid-item-cls "
          item
          xs={12}
          sx={{ pt: "0px !important" }}
        >
          <Box className="text-field-box">
            <TextField
              className="text-field-cls"
              select
              fullWidth
              name="assets"
              label={employeeAssetLabel}
              onChange={formik.handleChange}
              value={formik.values.assets}
              SelectProps={{
                multiple: true,
              }}
              InputLabelProps={{ className: "textfield_label" }}
            >
              <MenuItem value={10}>Laptop</MenuItem>
              <MenuItem value={20}>Mouse</MenuItem>
              <MenuItem value={30}>Handfree</MenuItem>
            </TextField>
          </Box>
        </Grid>
      </Grid>
      <Box className="switch-section" sx={{ width: "100%" }}>
        <Box className="switch-cls">
          <Switch
            size="small"
            {...label}
            sx={{ paddingLeft: "5px" }}
            checked={checked}
            onChange={handleChange}
          />
          <Typography
            sx={{
              color: checked ? "black" : "#6C6C6C",
              fontSize: "16px",
              fontWeight: "400",
              ml: "10px",
            }}
          >
            {employeeCompensationLabel}
          </Typography>
        </Box>
        {checked ? (
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
                    sx={{
                      color: "#6C6C6C",
                      fontSize: "16px",
                      fontWeight: "400",
                    }}
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
                    sx={{
                      color: "#6C6C6C",
                      fontSize: "16px",
                      fontWeight: "400",
                    }}
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
                    sx={{
                      color: "#6C6C6C",
                      fontSize: "16px",
                      fontWeight: "400",
                    }}
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
                    sx={{
                      color: "#6C6C6C",
                      fontSize: "16px",
                      fontWeight: "400",
                    }}
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
                    sx={{
                      color: "#6C6C6C",
                      fontSize: "16px",
                      fontWeight: "400",
                    }}
                    className="label-cls"
                  >
                    Meal Allowance
                  </Typography>
                }
              />
            </Box>
          </Box>
        ) : (
          ""
        )}
      </Box>
    </Box>
  );
};

export default PageOne;
