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
import "@src/components/shared/popUps/employeeModal/pageThree.scss";
import {
  LocalizationInterface,
  Formik,
} from "@src/helpers/interfaces/localizationinterfaces";
import { localizedData } from "@src/helpers/utils/language";
interface Props {
  formik: Formik;
}
const PageThree = ({ formik }: Props) => {
  const constantData: LocalizationInterface = localizedData();

  const {
    employeeDegree,
    employeeUniveristy,
    year,
    CurrentlyProgress,
    uploadReleventDegree,
  } = constantData.Modals;

  return (
    <Box className="pagethree-section">
      <Grid className="grid-container-cls" container spacing={2}>
        <Grid className="grid-item-cls" item xs={6}>
          <Box className="text-field-box" sx={{ minWidth: 120 }}>
            <TextField
              className="text-field-cls"
              select
              fullWidth
              InputProps={{ sx: { height: 56 } }}
              label={employeeDegree}
              name="program"
              onChange={formik.handleChange}
              value={formik.values.program}
              autoComplete="family-name"
              InputLabelProps={{ className: "textfield_label" }}
            >
              <MenuItem value={10}>BS(CS)</MenuItem>
              <MenuItem value={20}>BS(IT)</MenuItem>
              <MenuItem value={30}>Software Engineering</MenuItem>
            </TextField>
            <p className="errorText">{formik.errors?.program}</p>
          </Box>
          <Box className="text-field-box">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                className="text-field-cls"
                label={year}
                value={formik.values.year}
                onChange={(newValue) => {
                  formik.setFieldValue("year", newValue);
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
              <p className="errorText">{formik.errors?.year}</p>
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
              label={employeeUniveristy}
              name="institute"
              onChange={formik.handleChange}
              value={formik.values.institute}
              autoComplete="family-name"
              InputLabelProps={{ className: "textfield_label" }}
            >
              <MenuItem value={10}>FAST</MenuItem>
              <MenuItem value={20}>LUMS</MenuItem>
              <MenuItem value={30}>GIKI</MenuItem>
            </TextField>
            <p className="errorText">{formik.errors?.institute}</p>
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
                {CurrentlyProgress}
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
            {uploadReleventDegree}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default PageThree;
