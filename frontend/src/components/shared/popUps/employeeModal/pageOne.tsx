import React, { useState } from "react";
import {
  Box,
  Grid,
  TextField,
  Switch,
  Typography,
  Checkbox,
  Autocomplete,
} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import MenuItem from "@mui/material/MenuItem";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import "@src/components/shared/popUps/employeeModal/pageOne.scss";
import { assets } from "@src/helpers/constants/constants";
import {
  LocalizationInterface,
  Formik,
} from "@src/helpers/interfaces/localizationinterfaces";
import { localizedData } from "@src/helpers/utils/language";
import { useGetBenefitsQuery } from "@src/store/reducers/employees-api";

const label = { inputProps: { "aria-label": "Color switch demo" } };
interface Props {
  formik: Formik;
}
const PageOne = ({ formik }: Props) => {
  const constantData: LocalizationInterface = localizedData();
  const [checked, setChecked] = useState(false);
  const { data: Benefits = [] } = useGetBenefitsQuery();
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
                value={formik.values.dateOfJoining}
                onChange={(newValue) => {
                  formik.setFieldValue("dateOfJoining", newValue);
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
              <p className="errorText">{formik.errors?.dateOfJoining}</p>
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
            <Autocomplete
              multiple
              className="text-field-cls"
              options={assets}
              getOptionLabel={(option) => option.title}
              defaultValue={[assets[0]]}
              filterSelectedOptions
              renderInput={(params) => (
                <TextField
                  {...params}
                  InputLabelProps={{ className: "textfield_label" }}
                  label={employeeAssetLabel}
                  placeholder={employeeAssetLabel}
                />
              )}
            />
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
        <Box className="checkbox-cls">
          {checked
            ? Benefits?.map((benefit) => {
                return (
                  <Box className="checkbox-section" key={benefit?.id}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          disableRipple
                          name="benefits"
                          onChange={formik.handleChange}
                          size="small"
                        />
                      }
                      label={
                        <Typography
                          sx={{
                            color: "#6C6C6C",
                            fontSize: "16px",
                            fontWeight: "400",
                          }}
                          className="label-cls"
                        >
                          {benefit?.name}
                        </Typography>
                      }
                    />
                  </Box>
                );
              })
            : ""}
        </Box>
      </Box>
    </Box>
  );
};

export default PageOne;
