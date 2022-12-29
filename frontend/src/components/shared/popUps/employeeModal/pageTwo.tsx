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
import "@src/components/shared/popUps/employeeModal/pageTwo.scss";
import { FieldArray, getIn, FormikProvider } from "formik";
import moment from "moment";
import uploadIcon from "@src/assets/svgs/plus.svg";
import crossIcon from "@src/assets/svgs/smallcross.svg";
import UploadIcon from "@src/assets/svgs/uploadimg.svg";
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
    uploadfileDescription,
    imgSize,
    uploadImg,
    removeImg,
  } = constantData.Modals;
  return (
    <FormikProvider value={formik}>
      <FieldArray name="experience">
        {({ remove }) => {
          return (
            <>
              {formik.values.experience.map((exp, index) => {
                return (
                  <Box key={index} className="pagetwo-section">
                    <Box className="cross-icon" onClick={() => remove(index)}>
                      <img src={crossIcon} className="cross-btn" />
                    </Box>
                    <Box className="employee-profile-img">
                      <Box className="upload-img">
                        <img
                          className="upload-pic"
                          src={UploadIcon}
                          alt="upload icon"
                        />
                      </Box>
                      <Box className="upload-btn">
                        <Button
                          className="upload-img-btn"
                          sx={{ ml: "20px !important" }}
                        >
                          {uploadImg}
                        </Button>
                      </Box>
                      <Box className="remove-btn-section">
                        <Button
                          className="remove-btn"
                          sx={{ ml: "11px !important" }}
                        >
                          {removeImg}
                        </Button>
                      </Box>
                    </Box>
                    <Grid className="grid-container-cls" container spacing={2}>
                      <Grid className="grid-item-cls" item xs={6}>
                        <Box className="text-field-box">
                          <TextField
                            className="text-field-cls"
                            required
                            fullWidth
                            name={`experience[${index}].title`}
                            value={exp.title}
                            label={employeeDesignationLabel}
                            onChange={formik.handleChange}
                            InputLabelProps={{ className: "textfield_label" }}
                          />
                          <p className="errorText">
                            {getIn(formik.errors, `experience[${index}].title`)}
                          </p>
                        </Box>
                      </Grid>
                      <Grid className="grid-item-cls" item xs={6}>
                        <Box className="text-field-box" sx={{ minWidth: 120 }}>
                          <TextField
                            className="text-field-cls"
                            select
                            fullWidth
                            InputProps={{ sx: { height: 56 } }}
                            label={employeeCompnay}
                            name={`experience[${index}].company`}
                            onChange={formik.handleChange}
                            value={exp.company || ""}
                            autoComplete="family-name"
                            InputLabelProps={{ className: "textfield_label" }}
                          >
                            {companiesData?.length ? (
                              companiesData?.map((company) => {
                                return (
                                  <MenuItem
                                    key={company?.id}
                                    value={company?.id}
                                  >
                                    {company?.name}
                                  </MenuItem>
                                );
                              })
                            ) : (
                              <Box></Box>
                            )}
                          </TextField>
                          <p className="errorText">
                            {getIn(
                              formik.errors,
                              `experience[${index}].company`
                            )}
                          </p>
                        </Box>
                      </Grid>
                    </Grid>
                    <Grid className="grid-container-cls" container spacing={2}>
                      <Grid className="grid-item-cls" item xs={6}>
                        <Box className="text-field-box">
                          <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                              className="text-field-cls"
                              label={dateStart}
                              value={exp.start_date}
                              onChange={(newValue) => {
                                formik.setFieldValue(
                                  `experience[${index}].start_date`,
                                  moment(newValue).format("YYYY-MM-DD")
                                );
                              }}
                              renderInput={(params) => (
                                <TextField
                                  sx={{
                                    "& .MuiInputBase-input": {
                                      height: "21px",
                                    },
                                  }}
                                  {...params}
                                  InputLabelProps={{
                                    className: "textfield_label",
                                  }}
                                />
                              )}
                            />
                            <p className="errorText">
                              {getIn(
                                formik.errors,
                                `experience[${index}].start_date`
                              )}
                            </p>
                          </LocalizationProvider>
                        </Box>
                      </Grid>
                      <Grid className="grid-item-cls" item xs={6}>
                        <Box className="text-field-box">
                          <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                              className="text-field-cls"
                              label={dateEnd}
                              value={exp.end_date}
                              onChange={(newValue) => {
                                formik.setFieldValue(
                                  `experience[${index}].end_date`,
                                  moment(newValue).format("YYYY-MM-DD")
                                );
                              }}
                              renderInput={(params) => (
                                <TextField
                                  sx={{
                                    "& .MuiInputBase-input": {
                                      height: "21px",
                                    },
                                  }}
                                  {...params}
                                  InputLabelProps={{
                                    className: "textfield_label",
                                  }}
                                />
                              )}
                            />
                            <p className="errorText">
                              {getIn(
                                formik.errors,
                                `experience[${index}].end_date`
                              )}
                            </p>
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
                              sx={{
                                color: "#6C6C6C",
                                fontSize: "16px",
                                fontWeight: "400",
                              }}
                              className="label-cls"
                            >
                              {CurrentlyWorking}
                            </Typography>
                          }
                        />
                      </Box>
                      <Box className="upload-box">
                        <Box className="upload-img-ist">
                          <img
                            className="upload-img"
                            src={uploadIcon}
                            alt="doc"
                          />
                          <Typography className="upload-exp-p">
                            {uploadExperienceLetter}
                          </Typography>
                        </Box>
                        <Box className="upload-img-sec">
                          <Typography className="upload-exp-des">
                            {uploadfileDescription}
                          </Typography>
                          {imgSize}
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                );
              })}
            </>
          );
        }}
      </FieldArray>
    </FormikProvider>
  );
};

export default PageTwo;
