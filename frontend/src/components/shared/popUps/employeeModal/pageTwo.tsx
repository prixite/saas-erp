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
import {
  LocalizationInterface,
  Formik,
} from "@src/helpers/interfaces/localizationinterfaces";
import { localizedData } from "@src/helpers/utils/language";
import { useGetCompaniesQuery } from "@src/store/reducers/employees-api";
interface Props {
  formik: Formik;
}
const PageTwo = ({ formik }: Props) => {
  const constantData: LocalizationInterface = localizedData();
  const { data: companiesData } = useGetCompaniesQuery();
  const {
    employeeDesignationLabel,
    employeeCompnay,
    dateStart,
    dateEnd,
    CurrentlyWorking,
    uploadExperienceLetter,
  } = constantData.Modals;
  return (
    <Box className="pagetwo-section">
      <Grid className="grid-container-cls" container spacing={2}>
        <Grid className="grid-item-cls" item xs={6}>
          <Box className="text-field-box">
            <TextField
              className="text-field-cls"
              required
              fullWidth
              name="title"
              label={employeeDesignationLabel}
              onChange={formik.handleChange}
              value={formik.values.title}
              InputLabelProps={{ className: "textfield_label" }}
            />
            <p className="errorText">{formik.errors?.title}</p>
          </Box>
          <Box className="text-field-box">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                className="text-field-cls"
                label={dateStart}
                value={formik.values.startDate}
                onChange={(newValue) => {
                  formik.setFieldValue("startDate", newValue);
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
              <p className="errorText">{formik.errors?.startDate}</p>
            </LocalizationProvider>
          </Box>
        </Grid>
        <Grid className="grid-item-cls " item xs={6}>
          <Box className="text-field-box" sx={{ minWidth: 120 }}>
            <TextField
              className="text-field-cls"
              select
              fullWidth
              InputProps={{ sx: { height: 56 } }}
              label={employeeCompnay}
              name="company"
              onChange={formik.handleChange}
              value={formik.values.company || ""}
              autoComplete="family-name"
              InputLabelProps={{ className: "textfield_label" }}
            >
              {companiesData?.length ? (
                companiesData?.map((company) => {
                  return (
                    <MenuItem key={company?.id} value={company?.id}>
                      {company?.name}
                    </MenuItem>
                  );
                })
              ) : (
                <Box></Box>
              )}
            </TextField>
            <p className="errorText">{formik.errors?.company}</p>
          </Box>
          <Box className="text-field-box">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                className="text-field-cls"
                label={dateEnd}
                value={formik.values.endDate}
                onChange={(newValue) => {
                  formik.setFieldValue("endDate", newValue);
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
              <p className="errorText">{formik.errors?.endDate}</p>
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
