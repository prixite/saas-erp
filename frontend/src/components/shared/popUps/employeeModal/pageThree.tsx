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
import { FieldArray, getIn, FormikProvider } from "formik";
import moment from "moment";
import crossIcon from "@src/assets/svgs/cross.svg";
import uploadIcon from "@src/assets/svgs/plus.svg";
import "@src/components/shared/popUps/employeeModal/pageThree.scss";
import {
  LocalizationInterface,
  Formik,
} from "@src/helpers/interfaces/localizationinterfaces";
import { localizedData } from "@src/helpers/utils/language";
import {
  useGetProgramsQuery,
  useGetInstituteQuery,
} from "@src/store/reducers/employees-api";
interface Props {
  formik: Formik;
}
const PageThree = ({ formik }: Props) => {
  const constantData: LocalizationInterface = localizedData();
  const { data: programsData } = useGetProgramsQuery();
  const { data: instituteData } = useGetInstituteQuery();

  const {
    employeeDegree,
    employeeUniveristy,
    year,
    CurrentlyProgress,
    uploadReleventDegree,
  } = constantData.Modals;
  return (
    <FormikProvider value={formik}>
      <FieldArray name="degrees">
        {({ remove }) => {
          return (
            <>
              {formik.values.degrees.map((deg, index) => {
                return (
                  <Box key={index} className="pagethree-section">
                    {formik.values.degrees.length > 1 && (
                      <Box className="cross-icon" sx={{ mb: "10px" }}>
                        <Button
                          className="cross-btn-icon"
                          sx={{ minWidth: "0px !important" }}
                          onClick={() => remove(index)}
                        >
                          <img src={crossIcon} className="cross-btn" />
                        </Button>
                      </Box>
                    )}
                    <Grid className="grid-container-cls" container spacing={2}>
                      <Grid className="grid-item-cls" item xs={6}>
                        <Box className="text-field-box" sx={{ minWidth: 120 }}>
                          <TextField
                            className="text-field-cls"
                            select
                            fullWidth
                            InputProps={{ sx: { height: 56 } }}
                            label={employeeDegree}
                            name={`degrees[${index}].program`}
                            onChange={formik.handleChange}
                            value={deg.program || ""}
                            InputLabelProps={{ className: "textfield_label" }}
                          >
                            {programsData?.length ? (
                              programsData?.map((program) => {
                                return (
                                  <MenuItem
                                    key={program?.id}
                                    value={program?.id}
                                  >
                                    {program?.name}
                                  </MenuItem>
                                );
                              })
                            ) : (
                              <Box></Box>
                            )}
                          </TextField>
                          <p className="errorText">
                            {getIn(formik.errors, `degrees[${index}].program`)}
                          </p>
                        </Box>
                      </Grid>
                      <Grid className="grid-item-cls" item xs={6}>
                        <Box className="text-field-box">
                          <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                              className="text-field-cls"
                              label={year}
                              value={deg.year}
                              onChange={(newValue) => {
                                formik.setFieldValue(
                                  `degrees[${index}].year`,
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
                              {getIn(formik.errors, `degrees[${index}].year`)}
                            </p>
                          </LocalizationProvider>
                        </Box>
                      </Grid>
                    </Grid>
                    <Grid className="grid-container-cls" container spacing={2}>
                      <Grid className="grid-item-cls " item xs={6}>
                        <Box className="text-field-box" sx={{ minWidth: 120 }}>
                          <TextField
                            className="text-field-cls"
                            select
                            fullWidth
                            InputProps={{ sx: { height: 56 } }}
                            label={employeeUniveristy}
                            name={`degrees[${index}].institute`}
                            onChange={formik.handleChange}
                            value={deg.institute || ""}
                            InputLabelProps={{ className: "textfield_label" }}
                          >
                            {instituteData?.length ? (
                              instituteData?.map((institute) => {
                                return (
                                  <MenuItem
                                    key={institute?.id}
                                    value={institute?.id}
                                  >
                                    {institute?.name}
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
                              `degrees[${index}].institute`
                            )}
                          </p>
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
                              {CurrentlyProgress}
                            </Typography>
                          }
                        />
                      </Box>
                      <Box className="upload-box">
                        <Button className="upload-btn">
                          <span>
                            {" "}
                            <img
                              className="upload-img"
                              src={uploadIcon}
                              alt="doc"
                            />
                          </span>{" "}
                          {uploadReleventDegree}
                        </Button>
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

export default PageThree;
