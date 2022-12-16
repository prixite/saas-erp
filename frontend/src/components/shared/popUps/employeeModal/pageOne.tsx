import React, { useState, useEffect } from "react";
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
import {
  useGetBenefitsQuery,
  useGetEmployeesQuery,
  useGetEmployeementTypesQuery,
  useGetRolesQuery,
  useGetDepartmentsQuery,
} from "@src/store/reducers/employees-api";

const label = { inputProps: { "aria-label": "Color switch demo" } };
interface Props {
  formik: Formik;
}
const PageOne = ({ formik }: Props) => {
  const constantData: LocalizationInterface = localizedData();
  const [checked, setChecked] = useState(false);
  const [benefit, setBenefit] = useState<number[]>([]);
  const { data: Benefits = [] } = useGetBenefitsQuery();
  const { data: employeetableData } = useGetEmployeesQuery();
  const { data: typesData } = useGetEmployeementTypesQuery();
  const { data: rolesData } = useGetRolesQuery();
  const { data: departmentData } = useGetDepartmentsQuery();
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
    defaultRoleLabel,
    departmentsLabel,
  } = constantData.Modals;
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };
  useEffect(() => {
    if (benefit.length) {
      formik.setFieldValue("benefits", benefit);
    }
  }, [benefit.length]);
  const handleOnChangeBenefit = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const index = benefit.indexOf(parseInt(event.target.value));
    if (index === -1) {
      setBenefit([...benefit, parseInt(event.target.value)]);
    } else {
      setBenefit(
        benefit.filter((item) => item !== parseInt(event.target.value))
      );
    }
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
        </Grid>
        <Grid className="grid-item-cls" item xs={6}>
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
        </Grid>
      </Grid>
      <Grid className="grid-container-cls" container spacing={2}>
        <Grid className="grid-item-cls" item xs={6}>
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
        </Grid>
        <Grid className="grid-item-cls" item xs={6}>
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
        </Grid>
      </Grid>
      <Grid className="grid-container-cls" container spacing={2}>
        <Grid className="grid-item-cls" item xs={6}>
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
        </Grid>
        <Grid className="grid-item-cls" item xs={6}>
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
        </Grid>
      </Grid>
      <Grid className="grid-container-cls" container spacing={2}>
        <Grid className="grid-item-cls" item xs={6}>
          <Box className="text-field-box">
            <TextField
              className="text-field-cls"
              required
              fullWidth
              name="designation"
              label={employeeDesignationLabel}
              onChange={formik.handleChange}
              value={formik.values.designation}
              InputLabelProps={{ className: "textfield_label" }}
            />
            <p className="errorText">{formik.errors?.designation}</p>
          </Box>
        </Grid>
        <Grid className="grid-item-cls" item xs={6}>
          <Box className="text-field-box">
            <TextField
              className="text-field-cls"
              select
              fullWidth
              name="manager"
              label={employeeManagerLabel}
              onChange={formik.handleChange}
              value={formik.values.manager || ""}
              InputLabelProps={{ className: "textfield_label" }}
            >
              {employeetableData?.length ? (
                employeetableData?.map((employee) => {
                  return (
                    <MenuItem
                      key={employee?.id}
                      value={employee?.id}
                    >{`${employee.first_name} ${employee.last_name}`}</MenuItem>
                  );
                })
              ) : (
                <Box></Box>
              )}
            </TextField>
            <p className="errorText">{formik.errors?.manager}</p>
          </Box>
        </Grid>
      </Grid>
      <Grid className="grid-container-cls" container spacing={2}>
        <Grid className="grid-item-cls" item xs={6}>
          <Box className="text-field-box">
            <TextField
              className="text-field-cls"
              select
              fullWidth
              name="managing"
              label={employeeManagingLabel}
              onChange={formik.handleChange}
              value={formik.values.managing || ""}
              InputLabelProps={{ className: "textfield_label" }}
              SelectProps={{
                multiple: true,
              }}
            >
              {employeetableData?.length ? (
                employeetableData?.map((employee) => {
                  return (
                    <MenuItem
                      key={employee?.id}
                      value={employee?.id}
                    >{`${employee.first_name} ${employee.last_name}`}</MenuItem>
                  );
                })
              ) : (
                <Box></Box>
              )}
            </TextField>
            <p className="errorTexte">{formik.errors?.managing}</p>
          </Box>
        </Grid>
        <Grid className="grid-item-cls" item xs={6}>
          <Box className="text-field-box">
            <TextField
              className="text-field-cls"
              fullWidth
              name="salary"
              label={employeeSalaryLabel}
              onChange={formik.handleChange}
              value={formik.values.salary || ""}
              InputLabelProps={{ className: "textfield_label" }}
            />
            <p className="errorText">{formik.errors?.salary}</p>
          </Box>
        </Grid>
      </Grid>
      <Grid className="grid-container-cls" container spacing={2}>
        <Grid className="grid-item-cls" item xs={6}>
          <Box className="text-field-box">
            <TextField
              className="text-field-cls"
              select
              fullWidth
              name="type"
              label={employeeEmployementLabel}
              onChange={formik.handleChange}
              value={formik.values.type || ""}
              InputLabelProps={{ className: "textfield_label" }}
            >
              {typesData?.length ? (
                typesData?.map((type) => {
                  return (
                    <MenuItem key={type?.id} value={type?.id}>
                      {type?.name}
                    </MenuItem>
                  );
                })
              ) : (
                <Box></Box>
              )}
            </TextField>
            <p className="errorText">{formik.errors?.type}</p>
          </Box>
        </Grid>
        <Grid className="grid-item-cls" item xs={6}>
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
      </Grid>
      <Grid className="grid-container-cls" container spacing={2}>
        <Grid className="grid-item-cls" item xs={6}>
          <Box className="text-field-box">
            <TextField
              className="text-field-cls"
              select
              fullWidth
              name="department"
              label={departmentsLabel}
              onChange={formik.handleChange}
              value={formik.values.department || ""}
              InputLabelProps={{ className: "textfield_label" }}
            >
              {departmentData?.length ? (
                departmentData?.map((department) => {
                  return (
                    <MenuItem key={department?.id} value={department?.id}>
                      {department?.name}
                    </MenuItem>
                  );
                })
              ) : (
                <Box></Box>
              )}
            </TextField>
            <p className="errorText">{formik.errors?.department}</p>
          </Box>
        </Grid>
        <Grid className="grid-item-cls" item xs={6}>
          <Box className="text-field-box">
            <TextField
              className="text-field-cls"
              select
              fullWidth
              name="defaultRole"
              label={defaultRoleLabel}
              onChange={formik.handleChange}
              value={formik.values.defaultRole || ""}
              InputLabelProps={{ className: "textfield_label" }}
            >
              {rolesData?.length ? (
                rolesData?.map((role) => {
                  return (
                    <MenuItem key={role?.id} value={role?.id}>
                      {role?.name}
                    </MenuItem>
                  );
                })
              ) : (
                <Box></Box>
              )}
            </TextField>
            <p className="errorText">{formik.errors?.defaultRole}</p>
          </Box>
        </Grid>
      </Grid>
      <Grid className="grid-container-cls" container spacing={2}>
        <Grid className="grid-item-cls " item xs={12}>
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
                          value={benefit?.id}
                          onChange={handleOnChangeBenefit}
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
