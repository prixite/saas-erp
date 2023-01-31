import { useState, useEffect } from "react";
import { LoadingButton } from "@mui/lab";
import { Box, Typography } from "@mui/material";
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
import "@src/components/shared/popUps/leaveTypeModal/leaveTypeModal.scss";
import { LocalizationInterface } from "@src/helpers/interfaces/localizationinterfaces";
import { localizedData } from "@src/helpers/utils/language";
import { toastAPIError } from "@src/helpers/utils/utils";
import { useUpdateLeaveParametersMutation } from "@src/store/reducers/employees-api";

interface Props {
  open: boolean;
  checkState: boolean;
  handleClose: () => void;
  empId: number;
}

const LeaveModal = ({ open, handleClose, empId, checkState }: Props) => {
  const constantData: LocalizationInterface = localizedData();
  const [loading, setLoading] = useState(false);
  const [updateLeaveParameters] = useUpdateLeaveParametersMutation();
  const {
    cancelBtn,
    saveBtn,
    leaveStatusLabel,
    leaveTypeLabel,
    leaveHrCommentsLabel,
  } = constantData.Modals;
  const {
    Leave,
    Leavesubheading,
    LeaveStatusRequired,
    LeaveTypeRequired,
    LeaveHRCommentsRequired,
    CasualLeave,
    AnnualLeave,
    SickLeave,
    Pending,
    Approved,
    Denied,
  } = constantData.Leaves;

  const formik = useFormik({
    initialValues: {
      leave_type: "",
      leave_status: "",
      hr_comments: "",
    },
    validationSchema: yup.object({
      leave_type: yup.string().required(LeaveTypeRequired),
      leave_status: yup.string().required(LeaveStatusRequired),
      hr_comments: yup.string().required(LeaveHRCommentsRequired),
    }),
    validateOnChange: true,
    onSubmit: () => {
      handleUpdateLeave();
    },
  });
  const handleUpdateLeave = async () => {
    setLoading(true);
    const updatedObj = getLeaveObject();
    await updateLeaveParameters({ id: empId, updatedObj: updatedObj })
      .unwrap()
      .then(async () => {
        toast.success("Leave successfully updated.", {
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
  const getLeaveObject = () => {
    return {
      status: formik.values.leave_status,
      leave_type: formik.values.leave_type,
      hr_comment: formik.values.hr_comments,
    };
  };
  useEffect(() => {
    if (!checkState) {
      formik.resetForm();
    }
  }, [checkState]);
  return (
    <>
      <Dialog open={open} onClose={handleClose} className="LeaveModal">
        <DialogTitle>
          <Box className="modal-header-cls">
            <Box className="heading-text-box">
              <Typography className="heading-text">{Leave}</Typography>
              <Typography className="subheading-text">
                {Leavesubheading}
              </Typography>
            </Box>
            <Box className="cross-icon-box" onClick={handleClose}>
              <img src={crossIcon} className="cross-btn" />
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent className="LeaveModal__Content">
          <Box className="fields-cls" sx={{ height: "85px !important" }}>
            <TextField
              margin="normal"
              className="text-field-cls"
              select
              required
              fullWidth
              name="leave_type"
              label={leaveTypeLabel}
              onChange={formik.handleChange}
              value={formik.values.leave_type}
              InputLabelProps={{ className: "textfield_label" }}
            >
              <MenuItem className="menu-item-cls" value="casual leave">
                {CasualLeave}
              </MenuItem>
              <MenuItem className="menu-item-cls" value="sick leave">
                {SickLeave}
              </MenuItem>
              <MenuItem className="menu-item-cls" value="annual leave">
                {AnnualLeave}
              </MenuItem>
            </TextField>
            <Typography className="errorText">
              {formik.touched.leave_type && formik.errors.leave_type}
            </Typography>
          </Box>
          <Box className="fields-cls" sx={{ height: "85px !important" }}>
            <TextField
              margin="normal"
              className="text-field-cls"
              required
              select
              fullWidth
              label={leaveStatusLabel}
              name="leave_status"
              onChange={formik.handleChange}
              value={formik.values.leave_status}
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
              {formik.touched.leave_status && formik.errors.leave_status}
            </Typography>
          </Box>
          <Box className="fields-cls">
            <TextField
              margin="normal"
              className="text-field-cls"
              required
              fullWidth
              label={leaveHrCommentsLabel}
              value={formik.values.hr_comments}
              name="hr_comments"
              onChange={formik.handleChange}
              multiline
              rows={4}
              InputLabelProps={{ className: "textfield_label" }}
            ></TextField>
            <Typography className="errorText">
              {formik.touched.hr_comments && formik.errors.hr_comments}
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions className="LeaveModal__Actions">
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

export default LeaveModal;
