import { useState, useEffect } from "react";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import * as yup from "yup";
import crossIcon from "@src/assets/svgs/cross.svg";
import submitIcon from "@src/assets/svgs/Frame.svg";
import { timeOut } from "@src/helpers/constants/constants";
import { UserModuleRoleInterface } from "@src/helpers/interfaces/localizationinterfaces";
import { toastAPIError } from "@src/helpers/utils/utils";
import {
  useApiUsersAccessCreateMutation,
  useApiUsersAccessUpdateMutation,
  useApiUsersAccessRetrieveQuery,
  useApiOrganizationModulesListQuery,
  useApiRoleListQuery,
} from "@src/store/api";
import "@src/components/shared/popUps/userModuleModal/userModuleModal.scss";

interface Props {
  userModuleId?: number;
  userId: number;
  action?: string;
  open: boolean;
  handleClose: () => void;
}

const UserModuleModal = ({
  userModuleId,
  userId,
  action,
  open,
  handleClose,
}: Props) => {
  const [createUserModule] = useApiUsersAccessCreateMutation();
  const [updateUserModule] = useApiUsersAccessUpdateMutation();
  const { data: modules } = useApiOrganizationModulesListQuery();
  const { data: roles } = useApiRoleListQuery();
  const { data: userModuleData } = useApiUsersAccessRetrieveQuery(
    {
      id: Number(userModuleId || ""),
    },
    { skip: !userModuleId }
  );

  const [loading, setLoading] = useState(false);

  const populateEditableData = (
    userModuleData: UserModuleRoleInterface | undefined
  ) => {
    formik.setValues({
      role: userModuleData?.role.id as number,
      module: userModuleData?.module.id as number,
    });
  };

  const formik = useFormik({
    initialValues: {
      module: 0,
      role: 0,
    },
    validationSchema: yup.object({
      module: yup.string().required("Module is required"),
      role: yup.string().required("Role is required"),
    }),
    validateOnChange: true,
    onSubmit: () => {
      if (action === "edit") {
        handleUserModuleUpdate();
      } else {
        handleUserModuleCreate();
      }
    },
  });
  const handleUserModuleCreate = async () => {
    setLoading(true);
    await createUserModule({
      id: userId,
      userModuleRole: {
        role: formik.values.role as number,
        module: formik.values.module as number,
      },
    })
      .unwrap()
      .then(async () => {
        toast.success("User module created successfully.", {
          autoClose: timeOut,
          pauseOnHover: false,
        });
        resetModal();
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        toastAPIError("Something went wrong.", error.status, error.data);
      });
  };
  const handleUserModuleUpdate = async () => {
    setLoading(true);
    await updateUserModule({
      id: userModuleId as number,
      userModuleRole: {
        role: formik.values.role,
        module: formik.values.module,
      },
    })
      .unwrap()
      .then(async () => {
        toast.success("User module updated successfully.", {
          autoClose: timeOut,
          pauseOnHover: false,
        });
        resetModal();
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        toastAPIError("Something went wrong.", error.status, error.data);
      });
  };

  useEffect(() => {
    if (action === "edit") {
      populateEditableData(userModuleData);
    }
  }, [action, userModuleData, userModuleId]);

  const resetModal = () => {
    formik.resetForm();
    handleClose();
  };

  return (
    <>
      <Dialog open={open} onClose={resetModal} className="userModuleModal">
        <DialogTitle>
          <Box className="modal-header-cls">
            <Box className="heading-text-box">
              <Typography className="heading-text">
                {action == "edit" ? "Update user module" : "Create user module"}
              </Typography>
              <Typography className="subheading-text">
                {action == "edit"
                  ? "Fill the following fields to update user module"
                  : "Fill the following fields to add user module"}
              </Typography>
            </Box>
            <Box className="cross-icon-box" onClick={resetModal}>
              <img src={crossIcon} className="cross-btn" />
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent className="userModuleModal__Content">
          <Box
            className="fields-cls"
            sx={{ height: "85px !important", marginTop: "16px" }}
          >
            <TextField
              className="text-field-cls"
              select
              required
              fullWidth
              name="module"
              label={"Module"}
              onChange={formik.handleChange}
              value={formik.values.module || ""}
              InputLabelProps={{ className: "textfield_label" }}
            >
              {modules?.length ? (
                modules?.map((module) => {
                  return (
                    <MenuItem key={module.id} value={module.id}>
                      {module.name}
                    </MenuItem>
                  );
                })
              ) : (
                <Box></Box>
              )}
            </TextField>
            <Typography className="errorText">
              {formik.touched.module && formik.errors.module}
            </Typography>
          </Box>
          <Box className="fields-cls" sx={{ height: "85px !important" }}>
            <TextField
              className="text-field-cls"
              select
              required
              fullWidth
              name="role"
              label={"Role"}
              onChange={formik.handleChange}
              value={formik.values.role || ""}
              InputLabelProps={{ className: "textfield_label" }}
            >
              {roles?.length ? (
                roles?.map((role) => {
                  return (
                    <MenuItem key={role.id} value={role.id}>
                      {role.name}
                    </MenuItem>
                  );
                })
              ) : (
                <Box></Box>
              )}
            </TextField>
            <Typography className="errorText">
              {formik.touched.role && formik.errors.role}
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions className="userModuleModal__Actions">
          <Button className="resetBtn" onClick={resetModal}>
            {"Cancel"}
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
                {"Save"}
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

export default UserModuleModal;
