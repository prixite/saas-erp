import { LoadingButton } from "@mui/lab";
import { Box, Typography, Grid } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useFormik } from "formik";
import * as yup from "yup";
import crossIcon from "@src/assets/svgs/cross.svg";
import submitIcon from "@src/assets/svgs/Frame.svg";
import "@src/components/shared/popUps/addStandup/addStandup.scss";
import { LocalizationInterface } from "@src/helpers/interfaces/localizationinterfaces";
import { localizedData } from "@src/helpers/utils/language";

interface Props {
  open: boolean;
  handleClose: () => void;
}

const AddStandupModal = ({ open, handleClose }: Props) => {
  const constantData: LocalizationInterface = localizedData();
  const { cancelBtn, saveBtn } = constantData.Modals;
  const { Pending, Approved, Denied } = constantData.Leaves;
  const {
    AddStandupHeading,
    AddStandupSubheading,
    StandupSelection,
    EmployeeName,
    Status,
    Date,
    WorkDoneYesterday,
    TodayPlan,
    Blockers,
    FullTime,
    PartTime,
    StandupSelectionRequired,
    EmployeeNameRequired,
    StatusRequired,
    DateRequired,
    WorkDoneYesterdayRequired,
    TodayPlanRequired,
    BlockersRequired,
  } = constantData.Standup;

  const formik = useFormik({
    initialValues: {
      standup_selection: "",
      employee_name: "",
      status: "",
      date: "",
      work_done_yesterday: "",
      today_plan: "",
      blockers: "",
    },
    validationSchema: yup.object({
      standup_selection: yup.string().required(StandupSelectionRequired),
      employee_name: yup.string().required(EmployeeNameRequired),
      status: yup.string().required(StatusRequired),
      date: yup.string().required(DateRequired),
      work_done_yesterday: yup.string().required(WorkDoneYesterdayRequired),
      today_plan: yup.string().required(TodayPlanRequired),
      blockers: yup.string().required(BlockersRequired),
    }),
    validateOnChange: true,
    onSubmit: () => {
      getAddStandupObject();
    },
  });
  const getAddStandupObject = () => {
    return {
      standup_selection: formik.values.standup_selection,
      employee_name: formik.values.employee_name,
      status: formik.values.status,
      date: formik.values.date,
      work_done_yesterday: formik.values.work_done_yesterday,
      today_plan: formik.values.today_plan,
      blockers: formik.values.blockers,
    };
  };
  return (
    <>
      <Dialog open={open} onClose={handleClose} className="addStandupModal">
        <DialogTitle>
          <Box className="modal-header-cls">
            <Box className="heading-text-box">
              <Typography className="heading-text">
                {AddStandupHeading}
              </Typography>
              <Typography className="subheading-text">
                {AddStandupSubheading}
              </Typography>
            </Box>
            <Box className="cross-icon-box" onClick={handleClose}>
              <img src={crossIcon} className="cross-btn" />
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent className="addStandupModal__Content">
          <Grid container className="container-cls" spacing={2}>
            <Grid item xs={6} className="grid-item-cls">
              <Box className="fields-cls" sx={{ height: "85px !important" }}>
                <TextField
                  margin="normal"
                  className="text-field-cls"
                  select
                  required
                  fullWidth
                  name="standup_selection"
                  label={StandupSelection}
                  onChange={formik.handleChange}
                  value={formik.values.standup_selection}
                  InputLabelProps={{ className: "textfield_label" }}
                >
                  <MenuItem className="menu-item-cls" value="full time">
                    {FullTime}
                  </MenuItem>
                  <MenuItem className="menu-item-cls" value="part time">
                    {PartTime}
                  </MenuItem>
                </TextField>
                <Typography className="errorText">
                  {formik.touched.standup_selection &&
                    formik.errors.standup_selection}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} className="grid-item-cls">
              <Box className="fields-cls">
                <TextField
                  margin="normal"
                  className="text-field-cls"
                  required
                  fullWidth
                  label={EmployeeName}
                  value={formik.values.employee_name}
                  name="employee_name"
                  onChange={formik.handleChange}
                  InputLabelProps={{ className: "textfield_label" }}
                ></TextField>
                <Typography className="errorText">
                  {formik.touched.employee_name && formik.errors.employee_name}
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Grid container className="container-cls" spacing={2}>
            <Grid item xs={6} className="grid-item-cls">
              <Box className="fields-cls" sx={{ height: "85px !important" }}>
                <TextField
                  margin="normal"
                  className="text-field-cls"
                  select
                  required
                  fullWidth
                  name="status"
                  label={Status}
                  onChange={formik.handleChange}
                  value={formik.values.status}
                  InputLabelProps={{ className: "textfield_label" }}
                >
                  <MenuItem className="menu-item-cls" value="pending">
                    {Pending}
                  </MenuItem>
                  <MenuItem className="menu-item-cls" value="approved">
                    {Approved}
                  </MenuItem>
                  <MenuItem className="menu-item-cls" value="denied">
                    {Denied}
                  </MenuItem>
                </TextField>
                <Typography className="errorText">
                  {formik.touched.status && formik.errors.status}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} className="grid-item-cls">
              <Box className="fields-cls">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    className="text-field-cls"
                    label={Date}
                    renderInput={(params) => (
                      <TextField
                        required
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
                  <Typography className="errorText">
                    {formik.touched.date && formik.errors.date}
                  </Typography>
                </LocalizationProvider>
              </Box>
            </Grid>
          </Grid>
          <Grid container className="container-cls" spacing={2}>
            <Grid item xs={6} className="grid-item-cls">
              <Box
                className="multi-fields-cls"
                sx={{ height: "120px !important" }}
              >
                <TextField
                  margin="normal"
                  className="text-field-cls"
                  required
                  fullWidth
                  label={WorkDoneYesterday}
                  value={formik.values.work_done_yesterday}
                  name="work_done_yesterday"
                  onChange={formik.handleChange}
                  multiline
                  rows={3}
                  InputLabelProps={{ className: "textfield_label" }}
                ></TextField>
                <Typography className="errorText">
                  {formik.touched.work_done_yesterday &&
                    formik.errors.work_done_yesterday}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} className="grid-item-cls">
              <Box
                className="multi-fields-cls"
                sx={{ height: "120px !important" }}
              >
                <TextField
                  margin="normal"
                  className="text-field-cls"
                  required
                  fullWidth
                  label={TodayPlan}
                  value={formik.values.today_plan}
                  name="today_plan"
                  onChange={formik.handleChange}
                  multiline
                  rows={3}
                  InputLabelProps={{ className: "textfield_label" }}
                ></TextField>
                <Typography className="errorText">
                  {formik.touched.today_plan && formik.errors.today_plan}
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Grid container className="container-cls">
            <Grid item xs={12} className="grid-item-cls">
              <Box
                className="multi-fields-cls"
                sx={{ height: "120px !important" }}
              >
                <TextField
                  margin="normal"
                  className="text-field-cls"
                  required
                  fullWidth
                  label={Blockers}
                  value={formik.values.blockers}
                  name="blockers"
                  onChange={formik.handleChange}
                  multiline
                  rows={3}
                  InputLabelProps={{ className: "textfield_label" }}
                ></TextField>
                <Typography className="errorText">
                  {formik.touched.blockers && formik.errors.blockers}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions className="addStandupModal__Actions">
          <Button className="resetBtn" onClick={handleClose}>
            {cancelBtn}
          </Button>
          <LoadingButton
            className="submitBtn"
            loading={loading}
            onClick={() => {
              formik.handleSubmit();
            }}
          >
            {!loading && (
              <span style={{ display: "flex" }}>
                {saveBtn}
                <span>
                  {" "}
                  <img className="submit-img" src={submitIcon} alt="submit" />
                </span>{" "}
              </span>
            )}
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddStandupModal;
