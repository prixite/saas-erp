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
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import * as yup from "yup";
import crossIcon from "@src/assets/svgs/cross.svg";
import submitIcon from "@src/assets/svgs/Frame.svg";
import { timeOut } from "@src/helpers/constants/constants";
import "@src/components/shared/popUps/createStandup/createStandup.scss";
import { LocalizationInterface } from "@src/helpers/interfaces/localizationinterfaces";
import { localizedData } from "@src/helpers/utils/language";
import { toastAPIError } from "@src/helpers/utils/utils";

import {
  useGetTeamsQuery,
  useCreateStandupMutation,
} from "@src/store/reducers/employees-api";

interface Props {
  open: boolean;
  handleClose: () => void;
  checkState: boolean;
}

const CreateStandupModal = ({ open, handleClose, checkState }: Props) => {
  const constantData: LocalizationInterface = localizedData();
  const [loading, setLoading] = useState(false);
  const { data: teamsData } = useGetTeamsQuery();
  const [createStandup] = useCreateStandupMutation();
  const { cancelBtn, saveBtn } = constantData.Modals;
  const {
    CreateStandupHeading,
    CreateStandupSubheading,
    Team,
    StandupName,
    TeamRequired,
    StandupNameRequired,
    TimeRequired,
    Time,
  } = constantData.Standup;

  const formik = useFormik({
    initialValues: {
      team: "",
      name: "",
      created_at: "",
    },
    validationSchema: yup.object({
      team: yup.string().required(TeamRequired),
      name: yup.string().required(StandupNameRequired),
      created_at: yup.string().required(TimeRequired),
    }),
    validateOnChange: true,
    onSubmit: () => {
      handleCreateStandup();
    },
  });
  useEffect(() => {
    if (!checkState) {
      formik.resetForm();
    }
  }, [checkState]);
  const handleCreateStandup = async () => {
    setLoading(true);
    const standupObj = getCreateStandupObject();
    await createStandup({ standupObject: standupObj })
      .unwrap()
      .then(async () => {
        toast.success("Standup successfully added.", {
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
  const getCreateStandupObject = () => {
    return {
      team: formik.values.team,
      name: formik.values.name,
      created_at: formik.values.created_at,
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
              {teamsData?.length ? (
                teamsData?.map((team) => {
                  return (
                    <MenuItem key={team?.id} value={team?.id}>
                      {team?.name}
                    </MenuItem>
                  );
                })
              ) : (
                <Box></Box>
              )}
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
              name="name"
              label={StandupName}
              value={formik.values.name}
              onChange={formik.handleChange}
              InputLabelProps={{ className: "textfield_label" }}
            ></TextField>
            <Typography className="errorText">
              {formik.touched.name && formik.errors.name}
            </Typography>
          </Box>
          <Box className="fields-cls">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <TimePicker
                className="text-field-cls"
                label={Time}
                value={formik.values.created_at}
                onChange={(newValue) => {
                  formik.setFieldValue("created_at", newValue);
                }}
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
                {formik.touched.created_at && formik.errors.created_at}
              </Typography>
            </LocalizationProvider>
          </Box>
        </DialogContent>
        <DialogActions className="createStandupModal__Actions">
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

export default CreateStandupModal;
