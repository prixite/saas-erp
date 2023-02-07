import { useState, useEffect } from "react";
import { LoadingButton } from "@mui/lab";
import { Box, Typography, Grid } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import * as yup from "yup";
import crossIcon from "@src/assets/svgs/cross.svg";
import submitIcon from "@src/assets/svgs/Frame.svg";
import { timeOut } from "@src/helpers/constants/constants";
import "@src/components/shared/popUps/addStandup/addStandup.scss";
import { LocalizationInterface } from "@src/helpers/interfaces/localizationinterfaces";
import { localizedData } from "@src/helpers/utils/language";
import { toastAPIError } from "@src/helpers/utils/utils";
import {
  useGetUserQuery,
  useGetStandupQuery,
  useGetTeamMembersQuery,
  useAddStandupMutation,
} from "@src/store/reducers/employees-api";

interface Props {
  open: boolean;
  handleClose: () => void;
}

const AddStandupModal = ({ open, handleClose }: Props) => {
  const constantData: LocalizationInterface = localizedData();
  const { data: userData } = useGetUserQuery();
  const {
    AddStandupHeading,
    AddStandupSubheading,
    StandupSelection,
    EmployeeName,
    Status,
    WorkDoneYesterday,
    TodayPlan,
    Blockers,
    StandupSelectionRequired,
    EmployeeNameRequired,
    StatusRequired,
    Joined,
    Missed,
    Leave,
  } = constantData.Standup;
  const formik = useFormik({
    initialValues: {
      standup_selection: "",
      employee_name: "",
      status: "",
      work_done_yesterday: "",
      today_plan: "",
      blockers: "",
    },
    validationSchema: yup.object({
      standup_selection: yup.string().required(StandupSelectionRequired),
      employee_name: yup.string().required(EmployeeNameRequired),
      status: yup.string().required(StatusRequired),
    }),
    validateOnChange: true,
    onSubmit: () => {
      handleAddStandup();
    },
  });
  const resetForm = () => {
    handleClose();
    formik.resetForm();
  };
  const { data: teamMembersData } = useGetTeamMembersQuery(
    {
      id: parseInt(formik.values.standup_selection),
    },
    { skip: !parseInt(formik.values.standup_selection) }
  );
  const selectedMember = teamMembersData?.find(
    (x) => x?.id === userData?.emp_id
  );
  const [addStandup] = useAddStandupMutation();
  const [loading, setLoading] = useState(false);
  const { cancelBtn, saveBtn } = constantData.Modals;
  const { data: rows = [] } = useGetStandupQuery();
  const handleAddStandup = async () => {
    setLoading(true);
    const standupObj = getAddStandupObject();
    await addStandup({ standupObject: standupObj })
      .unwrap()
      .then(async () => {
        toast.success("Standup update successfully added.", {
          autoClose: timeOut,
          pauseOnHover: false,
        });
        formik.resetForm();
        handleClose();
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        toastAPIError("Something went wrong.", error.status, error.data);
      });
  };

  useEffect(() => {
    formik.setFieldValue("employee_name", "");
  }, [formik.values.standup_selection]);
  const getAddStandupObject = () => {
    return {
      standup: formik.values.standup_selection,
      employee: formik.values.employee_name,
      status: formik.values.status,
      work_done_yesterday: formik.values.work_done_yesterday,
      work_to_do: formik.values.today_plan,
      blockers: formik.values.blockers,
    };
  };
  return (
    <>
      <Dialog open={open} onClose={resetForm} className="addStandupModal">
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
            <Box className="cross-icon-box" onClick={resetForm}>
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
                  {rows?.length ? (
                    rows?.map((standup) => {
                      return (
                        <MenuItem key={standup?.id} value={standup?.id}>
                          {standup?.name}
                        </MenuItem>
                      );
                    })
                  ) : (
                    <Box></Box>
                  )}
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
                  disabled={formik.values.standup_selection ? false : true}
                  required
                  select
                  fullWidth
                  label={EmployeeName}
                  value={formik.values.employee_name}
                  name="employee_name"
                  onChange={formik.handleChange}
                  InputLabelProps={{ className: "textfield_label" }}
                >
                  {userData?.allowed_modules.admin_modules.includes(
                    "employees"
                  ) ||
                  userData?.allowed_modules.owner_modules.includes(
                    "employees"
                  ) ? (
                    teamMembersData?.length ? (
                      teamMembersData?.map((member) => {
                        return (
                          <MenuItem
                            key={member?.id}
                            value={member?.id}
                          >{`${member?.first_name} ${member?.last_name}`}</MenuItem>
                        );
                      })
                    ) : (
                      <Box></Box>
                    )
                  ) : (
                    <MenuItem value={selectedMember?.id}>{`${
                      selectedMember?.first_name || ""
                    } ${selectedMember?.last_name || ""}`}</MenuItem>
                  )}
                </TextField>
                <Typography className="errorText">
                  {formik.touched.employee_name && formik.errors.employee_name}
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Grid container className="container-cls" spacing={2}>
            <Grid item xs={12} className="grid-item-cls">
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
                  <MenuItem className="menu-item-cls" value="joined">
                    {Joined}
                  </MenuItem>
                  <MenuItem className="menu-item-cls" value="missed">
                    {Missed}
                  </MenuItem>
                  <MenuItem className="menu-item-cls" value="leave">
                    {Leave}
                  </MenuItem>
                </TextField>
                <Typography className="errorText">
                  {formik.touched.status && formik.errors.status}
                </Typography>
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
          <Button className="resetBtn" onClick={resetForm}>
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
