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
import * as yup from "yup";
import crossIcon from "@src/assets/svgs/cross.svg";
import submitIcon from "@src/assets/svgs/Frame.svg";
import "@src/components/shared/popUps/createStandup/createStandup.scss";
import { LocalizationInterface } from "@src/helpers/interfaces/localizationinterfaces";
import { localizedData } from "@src/helpers/utils/language";

interface Props {
  open: boolean;
  handleClose: () => void;
}

const CreateStandupModal = ({ open, handleClose }: Props) => {
  const constantData: LocalizationInterface = localizedData();
  const { cancelBtn, saveBtn } = constantData.Modals;
  const {
    CreateStandupHeading,
    CreateStandupSubheading,
    Team,
    StandupName,
    TeamRequired,
    StandupNameRequired,
    Frontend,
    Backend,
    Marketing,
  } = constantData.Standup;

  const formik = useFormik({
    initialValues: {
      team: "",
      standup_name: "",
    },
    validationSchema: yup.object({
      team: yup.string().required(TeamRequired),
      standup_name: yup.string().required(StandupNameRequired),
    }),
    validateOnChange: true,
    onSubmit: () => {
      getCreateStandupObject();
    },
  });
  const getCreateStandupObject = () => {
    return {
      team: formik.values.team,
      standup_name: formik.values.standup_name,
    };
  };
  return (
    <>
      <Dialog open={open} onClose={handleClose} className="createStandupModal">
        <DialogTitle>
          <Box className="modal-header-cls">
            <Box className="heading-text-box">
              <Typography className="heading-text">
                {CreateStandupHeading}
              </Typography>
              <Typography className="subheading-text">
                {CreateStandupSubheading}
              </Typography>
            </Box>
            <Box className="cross-icon-box" onClick={handleClose}>
              <img src={crossIcon} className="cross-btn" />
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent className="createStandupModal__Content">
          <Box className="fields-cls" sx={{ height: "85px !important" }}>
            <TextField
              margin="normal"
              className="text-field-cls"
              select
              required
              fullWidth
              name="team"
              label={Team}
              onChange={formik.handleChange}
              value={formik.values.team}
              InputLabelProps={{ className: "textfield_label" }}
            >
              <MenuItem className="menu-item-cls" value="frontend">
                {Frontend}
              </MenuItem>
              <MenuItem className="menu-item-cls" value="backend">
                {Backend}
              </MenuItem>
              <MenuItem className="menu-item-cls" value="marketing">
                {Marketing}
              </MenuItem>
            </TextField>
            <Typography className="errorText">
              {formik.touched.team && formik.errors.team}
            </Typography>
          </Box>
          <Box className="fields-cls">
            <TextField
              margin="normal"
              className="text-field-cls"
              required
              fullWidth
              label={StandupName}
              value={formik.values.standup_name}
              name="hr_comments"
              onChange={formik.handleChange}
              InputLabelProps={{ className: "textfield_label" }}
            ></TextField>
            <Typography className="errorText">
              {formik.touched.standup_name && formik.errors.standup_name}
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions className="createStandupModal__Actions">
          <Button className="resetBtn" onClick={handleClose}>
            {cancelBtn}
          </Button>
          <LoadingButton
            className="submitBtn"
            onClick={() => {
              formik.handleSubmit();
            }}
          >
            <span style={{ display: "flex" }}>
              {saveBtn}
              <span>
                {" "}
                <img className="submit-img" src={submitIcon} alt="submit" />
              </span>{" "}
            </span>
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CreateStandupModal;
