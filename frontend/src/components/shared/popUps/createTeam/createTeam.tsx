import { useState, useEffect } from "react";
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
import { toast } from "react-toastify";
import * as yup from "yup";
import crossIcon from "@src/assets/svgs/cross.svg";
import submitIcon from "@src/assets/svgs/Frame.svg";
import { timeOut } from "@src/helpers/constants/constants";
import { teamTypes } from "@src/helpers/interfaces/employees-modal";
import "@src/components/shared/popUps/createTeam/createTeam.scss";
import { LocalizationInterface } from "@src/helpers/interfaces/localizationinterfaces";
import { localizedData } from "@src/helpers/utils/language";
import { toastAPIError } from "@src/helpers/utils/utils";

import {
  useGetEmployeesQuery,
  useCreateTeamMutation,
  useGetTeamDataQuery,
  useUpdateTeamMutation,
} from "@src/store/reducers/employees-api";

interface Props {
  open: boolean;
  handleClose: () => void;
  action: string;
  teamId?: number;
}
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const CreateTeamModal = ({ open, handleClose, teamId, action }: Props) => {
  const constantData: LocalizationInterface = localizedData();
  const [loading, setLoading] = useState(false);
  const { data: rows = [] } = useGetEmployeesQuery();
  const [createTeam] = useCreateTeamMutation();
  const [updateTeam] = useUpdateTeamMutation();
  const { data: teamData } = useGetTeamDataQuery(
    {
      id: Number(teamId || ""),
    },
    { skip: !Number(teamId || "") }
  );
  const { cancelBtn, saveBtn } = constantData.Modals;
  const {
    CreateTeam,
    CreateTeamSubheading,
    NameRequired,
    Name,
    AddTeamMember,
    MemberRequired,
    EditTeam,
    EditTeamSubheading,
  } = constantData.Teams;

  const formik = useFormik({
    initialValues: {
      name: "",
      members: [],
    },
    validationSchema: yup.object({
      name: yup.string().required(NameRequired),
      members: yup.array().min(1, MemberRequired),
    }),
    validateOnChange: true,
    onSubmit: () => {
      if (action === "edit") {
        handleEditTeam();
      } else {
        handleCreateTeam();
      }
    },
  });
  useEffect(() => {
    if (action === "edit") {
      populateEditableData(teamData);
    }
  }, [action, teamData]);
  const resetForm = () => {
    formik.resetForm();
    handleClose();
  };
  const handleCreateTeam = async () => {
    setLoading(true);
    const teamObj = getCreateTeamObject();
    await createTeam({ teamObject: teamObj })
      .unwrap()
      .then(async () => {
        toast.success("Team successfully added.", {
          autoClose: timeOut,
          pauseOnHover: false,
        });
        resetForm();
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        toastAPIError("Something went wrong.", error.status, error.data);
      });
  };

  const handleEditTeam = async () => {
    setLoading(true);
    const teamObj = getCreateTeamObject();
    await updateTeam({ teamObject: teamObj, id: teamId })
      .unwrap()
      .then(async () => {
        toast.success("Team successfully updated.", {
          autoClose: timeOut,
          pauseOnHover: false,
        });
        resetForm();
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        toastAPIError("Something went wrong.", error.status, error.data);
      });
  };

  const populateEditableData = (teamData: teamTypes | undefined) => {
    formik.setValues({
      name: teamData?.name || "",
      members: teamData?.members || [],
    });
  };

  const getCreateTeamObject = () => {
    const extractedIDS = formik.values.members.map((obj: teamTypes) => obj?.id);
    return {
      name: formik.values.name,
      members: extractedIDS,
    };
  };
  return (
    <>
      <Dialog open={open} onClose={resetForm} className="createTeamModal">
        <DialogTitle>
          <Box className="modal-header-cls">
            <Box className="heading-text-box">
              <Typography className="heading-text">
                {action === "edit" ? EditTeam : CreateTeam}
              </Typography>
              <Typography className="subheading-text">
                {action === "edit" ? EditTeamSubheading : CreateTeamSubheading}
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
              value={formik.values.members}
              className="text-field-cls"
              isOptionEqualToValue={(option, value) => option.id === value.id}
              onChange={(e, value) =>
                formik.setFieldValue("members", value || [])
              }
              disableCloseOnSelect
              getOptionLabel={(option) =>
                `${option?.first_name} ${option?.last_name}`
              }
              renderOption={(props, option, { selected }) => (
                <li {...props} key={option?.id}>
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
                  required
                  label={AddTeamMember}
                  InputLabelProps={{ className: "textfield_label" }}
                />
              )}
            />
            <Typography className="errorText">
              {formik.touched.members && formik.errors.members}
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
