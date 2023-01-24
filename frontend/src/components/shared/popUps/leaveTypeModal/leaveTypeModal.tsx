import { useState } from "react";
import { Box, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import crossIcon from "@src/assets/svgs/cross.svg";
import "@src/components/shared/popUps/leaveTypeModal/leaveTypeModal.scss";
import submitIcon from "@src/assets/svgs/Frame.svg";
import resetIcon from "@src/assets/svgs/reset.svg";
import { LocalizationInterface } from "@src/helpers/interfaces/localizationinterfaces";
import { localizedData } from "@src/helpers/utils/language";

interface Props {
  open: boolean;
  handleClose: () => void;
}

const LeaveModal = ({ open, handleClose }: Props) => {
  const constantData: LocalizationInterface = localizedData();
  const {
    filterResetBtn,
    filterSubmitBtn,
    leaveStatusLabel,
    leaveTypeLabel,
    leaveHrCommentsLabel,
  } = constantData.Modals;
  const { Leave, Leavesubheading } = constantData.Leaves;
  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  const [nameError, setNameError] = useState("");
  const [designationErrror, setDesignationError] = useState("");

  const handleType = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length) {
      setNameError("");
    }
    setName(e.target?.value);
  };
  const handleStatus = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length) {
      setDesignationError("");
    }
    setDesignation(e.target?.value);
  };

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
          <Box className="fields-cls">
            <TextField
              margin="normal"
              className="text-field-cls"
              select
              required
              fullWidth
              name="leavetype"
              label={leaveTypeLabel}
              onChange={handleType}
              value={name}
              autoComplete="family-name"
              InputLabelProps={{ className: "textfield_label" }}
            >
              <MenuItem sx={{ fontWeight: "400", fontSize: "14px" }} value={10}>
                Casual Leave
              </MenuItem>
              <MenuItem sx={{ fontWeight: "400", fontSize: "14px" }} value={20}>
                Sick Leave
              </MenuItem>
              <MenuItem sx={{ fontWeight: "400", fontSize: "14px" }} value={30}>
                Annual Leave
              </MenuItem>
            </TextField>
            <p className="errorText">{nameError}</p>
          </Box>
          <Box className="fields-cls">
            <TextField
              margin="normal"
              className="text-field-cls"
              required
              select
              fullWidth
              label={leaveStatusLabel}
              name="status"
              onChange={handleStatus}
              value={designation}
              autoComplete="family-name"
              InputLabelProps={{ className: "textfield_label" }}
            >
              <MenuItem sx={{ fontWeight: "400", fontSize: "14px" }} value={10}>
                Pending
              </MenuItem>
              <MenuItem sx={{ fontWeight: "400", fontSize: "14px" }} value={20}>
                Approved
              </MenuItem>
              <MenuItem sx={{ fontWeight: "400", fontSize: "14px" }} value={30}>
                Rejected
              </MenuItem>
            </TextField>
            <p className="errorText">{designationErrror}</p>
          </Box>
          <Box className="fields-cls">
            <TextField
              margin="normal"
              className="text-field-cls"
              required
              fullWidth
              label={leaveHrCommentsLabel}
              name="hrcomments"
              onChange={handleStatus}
              autoComplete="family-name"
              multiline
              rows={4}
              InputLabelProps={{ className: "textfield_label" }}
            ></TextField>
            <p className="errorText">{designationErrror}</p>
          </Box>
        </DialogContent>
        <DialogActions className="LeaveModal__Actions">
          <Button className="resetBtn" onClick={handleClose}>
            <span>
              {" "}
              <img className="reset-img" src={resetIcon} alt="reset" />
            </span>{" "}
            {filterResetBtn}
          </Button>
          <Button className="submitBtn">
            {filterSubmitBtn}
            <span>
              {" "}
              <img className="submit-img" src={submitIcon} alt="submit" />
            </span>{" "}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default LeaveModal;
