// import { useState } from "react";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { LoadingButton } from "@mui/lab";
import { Box, Typography } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
// import { toast } from "react-toastify";
import * as yup from "yup";
import crossIcon from "@src/assets/svgs/cross.svg";
import submitIcon from "@src/assets/svgs/Frame.svg";
// import { timeOut } from "@src/helpers/constants/constants";
import "@src/components/shared/popUps/createTeam/createTeam.scss";
import { LocalizationInterface } from "@src/helpers/interfaces/localizationinterfaces";
import { localizedData } from "@src/helpers/utils/language";
// import { toastAPIError } from "@src/helpers/utils/utils";

import { useGetEmployeesQuery } from "@src/store/reducers/employees-api";

interface Props {
  open: boolean;
  handleClose: () => void;
}
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const CreateTeamModal = ({ open, handleClose }: Props) => {
  const constantData: LocalizationInterface = localizedData();
  // const [loading, setLoading] = useState(false);
  const { data: rows = [] } = useGetEmployeesQuery();
  const { cancelBtn, saveBtn } = constantData.Modals;
  const {
    CreateTeam,
    CreateTeamSubheading,
    NameRequired,
    Name,
    AddTeamMember,
    // MemberRequired,
  } = constantData.Teams;

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: yup.object({
      name: yup.string().required(NameRequired),
    }),
    validateOnChange: true,
    onSubmit: () => {
      // handleCreateStandup();
    },
  });
  const resetForm = () => {
    handleClose();
    formik.resetForm();
  };
  // const handleCreateStandup = async () => {
  //   setLoading(true);
  //   const standupObj = getCreateStandupObject();
  //   await createStandup({ standupObject: standupObj })
  //     .unwrap()
  //     .then(async () => {
  //       toast.success("Standup successfully added.", {
  //         autoClose: timeOut,
  //         pauseOnHover: false,
  //       });
  //       formik.resetForm();
  //       handleClose();
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       setLoading(false);
  //       toastAPIError("Something went wrong.", error.status, error.data);
  //     });
  // };
  // const getCreateStandupObject = () => {
  //   return {
  //     team: formik.values.team,
  //     name: formik.values.name,
  //     time: moment(formik.values.time).format("HH:mm:ss"),
  //   };
  // };
  return (
    <>
      <Dialog open={open} onClose={resetForm} className="createTeamModal">
        <DialogTitle>
          <Box className="modal-header-cls">
            <Box className="heading-text-box">
              <Typography className="heading-text">{CreateTeam}</Typography>
              <Typography className="subheading-text">
                {CreateTeamSubheading}
              </Typography>
            </Box>
            <Box className="cross-icon-box" onClick={resetForm}>
              <img src={crossIcon} className="cross-btn" />
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent className="createTeamModal__Content">
          <Box className="fields-cls">
            <TextField
              margin="normal"
              className="text-field-cls"
              required
              fullWidth
              name="name"
              label={Name}
              value={formik.values.name}
              onChange={formik.handleChange}
              InputLabelProps={{ className: "textfield_label" }}
            ></TextField>
            <Typography className="errorText">
              {formik.touched.name && formik.errors.name}
            </Typography>
          </Box>
          <Box className="fields-cls">
            <Autocomplete
              multiple
              options={rows}
              className="text-field-cls"
              disableCloseOnSelect
              getOptionLabel={(option) =>
                `${option?.first_name} ${option?.last_name}`
              }
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 8 }}
                    checked={selected}
                  />
                  {`${option?.first_name} ${option?.last_name}`}
                </li>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={AddTeamMember}
                  InputLabelProps={{ className: "textfield_label" }}
                />
              )}
            />
            <Typography className="errorText">
              {formik.touched.name && formik.errors.name}
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions className="createTeamModal__Actions">
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

export default CreateTeamModal;
