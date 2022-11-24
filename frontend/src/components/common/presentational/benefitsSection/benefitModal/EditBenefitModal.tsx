import {
  Box,
  Checkbox,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import { pink } from "@mui/material/colors";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { alpha, styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import cancelBackBtn from "@src/assets/svgs/cancelBackBtn.svg";
import crossIcon from "@src/assets/svgs/cross.svg";
import submitIcon from "@src/assets/svgs/Frame.svg";
import { LocalizationInterface } from "@src/helpers/interfaces/localizationinterfaces";
import { localizedData } from "@src/helpers/utils/language";
import "@src/components/common/presentational/benefitsSection/benefitModal/editBenefitModal.scss";

interface Props {
  open: boolean;
  handleClose: () => void;
}
const RedToggleSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: "red",
    "&:hover": {
      backgroundColor: alpha(pink[600], theme.palette.action.hoverOpacity),
    },
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: "red",
  },
}));
const label = { inputProps: { "aria-label": "Color switch demo" } };
const EditBenefitModal = ({ open, handleClose }: Props) => {
  const constantData: LocalizationInterface = localizedData();
  const {
    Heading,
    HeadingText,
    CompensationAndHeading,
    CancelBtn,
    SaveBtn,
    FuelAllowance,
    PhoneAllowance,
    OvertimeAllowance,
    DinnerAllowance,
    MealAllowance,
  } = constantData.EditBenefitModal;

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        className="editBenefitModal"
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>
          <Box className="modal-header-cls">
            <Box className="heading-text-box">
              <Typography className="heading-text">
                {/*filterHeading*/}
                {Heading}{" "}
              </Typography>
              <Typography className="subheading-text">
                {" "}
                {HeadingText}{" "}
              </Typography>
            </Box>
            <Box className="cross-icon-box" onClick={handleClose}>
              <img src={crossIcon} className="cross-btn" />
            </Box>
          </Box>
        </DialogTitle>

        <DialogContent
          sx={{ padding: "0px" }}
          className="editBenefitModal__Content"
          aria-label="customized-dialog-title"
        >
          <Stack direction="column" height="auto" width="100%" marginTop="46px">
            <Grid
              className="firstDiv"
              container
              columnSpacing={2}
              marginBottom={2}
            >
              <Grid className="textFieldContainer" item sm={6} md={6}>
                <TextField
                  className="textFieldContainer__currentSalary"
                  id="email-id"
                  name="email"
                  type="new-password"
                  label="Current Salary"
                  size="medium"
                  defaultValue="Rs.75000"
                  InputLabelProps={{
                    style: { color: "rgba(0, 0, 0, 0.8) !important" },
                  }}
                />
              </Grid>
              <Grid className="compTypeContainer" item sm={6} md={6}>
                <FormControl fullWidth className="compTypeContainer__compType">
                  <InputLabel id="demo-simple-select-label">
                    Compensation Type
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Compensation Type"
                  >
                    <MenuItem value={10}>Type One</MenuItem>
                    <MenuItem value={20}>Type Two</MenuItem>
                    <MenuItem value={30}>Type Three</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <Grid
              className="secondGrid"
              container
              columnSpacing={2}
              marginBottom={2}
            >
              <Grid className="scheduleContainer" item sm={6} md={6}>
                <FormControl fullWidth className="scheduleContainer__textField">
                  <InputLabel id="demo-simple-select-label">
                    Compensation Schedule
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Compensation Schedule"
                  >
                    <MenuItem value={10}>Schedule One</MenuItem>
                    <MenuItem value={20}>Schedule Two</MenuItem>
                    <MenuItem value={30}>Schedule Three</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid className="dataContainer" item sm={6} md={6}>
                <FormControl fullWidth className="dataContainer__textField">
                  <InputLabel id="demo-simple-select-label">Date:</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Date:"
                  >
                    <MenuItem value={10}>Date One</MenuItem>
                    <MenuItem value={20}>Date Two</MenuItem>
                    <MenuItem value={30}>Date Three</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <Grid container className="toggle">
              <Grid className="toggle__icon" item sm={1} md={1}>
                <RedToggleSwitch size="small" {...label} defaultChecked />
              </Grid>
              <Grid className="toggle__textDiv" item sm={11} md={11}>
                <Typography className="toggleHeading">
                  {CompensationAndHeading}
                </Typography>
              </Grid>
            </Grid>

            <Grid className="ticks" container>
              <Grid className="tickContainer" item sm={4} md={4}>
                <Checkbox size="small" defaultChecked />
                <span>{FuelAllowance}</span>
              </Grid>
              <Grid className="tickContainer" item sm={4} md={4}>
                <Checkbox size="small" defaultChecked />
                <span>{PhoneAllowance}</span>
              </Grid>
              <Grid className="tickContainer" item sm={4} md={4}>
                <Checkbox size="small" defaultChecked />
                <span>{OvertimeAllowance}</span>
              </Grid>
              <Grid className="tickContainer" item sm={4} md={4}>
                <Checkbox size="small" defaultChecked />
                <span>{DinnerAllowance}</span>
              </Grid>
              <Grid className="tickContainer" item sm={4} md={4}>
                <Checkbox size="small" defaultChecked />
                <span>{MealAllowance}</span>
              </Grid>
              <Grid className="tickContainer" item sm={4} md={4}>
                <Checkbox size="small" defaultChecked />
                <span>{OvertimeAllowance}</span>
              </Grid>
            </Grid>

            <Grid className="comment" container>
              <Grid item sm={12} md={12}>
                <TextField
                  className="comment__commentsField"
                  id="email-id"
                  name="email"
                  type="text"
                  label="Comments"
                  defaultValue="Write something..."
                  size="medium"
                  fullWidth
                  multiline={true}
                  rows={5}
                />
              </Grid>
            </Grid>
          </Stack>
        </DialogContent>

        <DialogActions className="editBenefitModal__Actions">
          <Button className="cancelBtn" onClick={handleClose}>
            <span>
              <img
                className="cancel-img"
                src={cancelBackBtn}
                alt="profile pic"
              />
            </span>
            {CancelBtn}
          </Button>
          <Button className="submitBtn" onClick={handleClose}>
            {" "}
            {SaveBtn}
            <span>
              <img className="submit-img" src={submitIcon} alt="submit" />
            </span>
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EditBenefitModal;
