import { useState, useEffect } from "react";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Switch,
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
import { ModuleInterface } from "@src/helpers/interfaces/localizationinterfaces";
import { toastAPIError } from "@src/helpers/utils/utils";
import {
  useApiModuleCreateMutation,
  useApiModuleUpdateMutation,
  useApiModuleRetrieveQuery,
} from "@src/store/api";
import "@src/components/shared/popUps/moduleModal/moduleModal.scss";

interface Props {
  moduleId?: number;
  action?: string;
  open: boolean;
  handleClose: () => void;
}

const ModuleModal = ({ moduleId, action, open, handleClose }: Props) => {
  const [createModule] = useApiModuleCreateMutation();
  const [updateModule] = useApiModuleUpdateMutation();
  const { data: moduleData } = useApiModuleRetrieveQuery(
    {
      id: Number(moduleId || ""),
    },
    { skip: !moduleId }
  );

  const [loading, setLoading] = useState(false);

  const populateEditableData = (moduleData: ModuleInterface | undefined) => {
    formik.setValues({
      name: moduleData?.name as string,
      slug: moduleData?.slug as string,
      is_enabled: moduleData?.is_enabled as boolean,
    });
  };
  const formik = useFormik({
    initialValues: {
      name: "",
      slug: "",
      is_enabled: true,
    },
    validationSchema: yup.object({
      name: yup.string().required("Name is required"),
      slug: yup.string().required("Slug is required"),
      is_enabled: yup.string().required("Is enabled is required"),
    }),
    validateOnChange: true,
    onSubmit: () => {
      if (action === "edit") {
        handleModuleEdit();
      } else {
        handleModuleCreate();
      }
    },
  });
  const handleModuleCreate = async () => {
    setLoading(true);
    await createModule({
      module: {
        name: formik.values.name,
        slug: formik.values.slug,
        is_enabled: formik.values.is_enabled,
      },
    })
      .unwrap()
      .then(async () => {
        toast.success("Module created successfully.", {
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
  const handleModuleEdit = async () => {
    setLoading(true);
    await updateModule({
      id: moduleId as number,
      module: {
        name: formik.values.name,
        slug: formik.values.slug,
        is_enabled: formik.values.is_enabled,
      },
    })
      .unwrap()
      .then(async () => {
        toast.success("Module updated successfully.", {
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

  const moduleSlugs = [
    { name: "Payroll", value: "payroll" },
    { name: "User", value: "user" },
    { name: "Employees", value: "employees" },
    { name: "Inventory", value: "inventory" },
    { name: "Settings", value: "settings" },
    { name: "Leave", value: "leave" },
    { name: "Standup", value: "standup" },
  ];

  useEffect(() => {
    if (action === "edit") {
      populateEditableData(moduleData);
    }
  }, [action, moduleData, moduleId]);

  const resetModal = () => {
    formik.resetForm();
    handleClose();
  };

  return (
    <>
      <Dialog open={open} onClose={resetModal} className="moduleModal">
        <DialogTitle>
          <Box className="modal-header-cls">
            <Box className="heading-text-box">
              <Typography className="heading-text">
                {action == "edit" ? "Update a module" : "Create a module"}
              </Typography>
              <Typography className="subheading-text">
                {action == "edit"
                  ? "Fill the following fields to update a module"
                  : "Fill the following fields to add a module"}
              </Typography>
            </Box>
            <Box className="cross-icon-box" onClick={resetModal}>
              <img src={crossIcon} className="cross-btn" />
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent className="moduleModal__Content">
          <Box className="fields-cls" sx={{ height: "85px !important" }}>
            <Box className="fields-cls">
              <TextField
                margin="normal"
                className="text-field-cls"
                required
                fullWidth
                label={"Name"}
                value={formik.values.name}
                name="name"
                onChange={formik.handleChange}
                InputLabelProps={{ className: "textfield_label" }}
              ></TextField>
              <Typography className="errorText">
                {formik.touched.name && formik.errors.name}
              </Typography>
            </Box>
            <Box className="fields-cls" sx={{ height: "85px !important" }}>
              <TextField
                margin="normal"
                className="text-field-cls"
                required
                select
                fullWidth
                label={"Slug"}
                name="slug"
                onChange={formik.handleChange}
                value={formik.values.slug}
                InputLabelProps={{ className: "textfield_label" }}
              >
                {moduleSlugs.map((item) => {
                  return (
                    <MenuItem
                      className="menu-item-cls"
                      value={item.value}
                      key={item.value}
                    >
                      {item.name}
                    </MenuItem>
                  );
                })}
              </TextField>
              <Typography className="errorText">
                {formik.touched.slug && formik.errors.slug}
              </Typography>
            </Box>
            <Box className="fields-cls is_enabled">
              <Switch
                size="small"
                sx={{ paddingLeft: "5px" }}
                checked={formik.values.is_enabled}
                onChange={(event) =>
                  formik.setFieldValue("is_enabled", event.target.checked)
                }
              />
              <Typography
                sx={{
                  color: formik.values.is_enabled ? "black" : "#6C6C6C",
                  fontSize: "16px",
                  fontWeight: "400",
                  ml: "10px",
                }}
              >
                {"Is enabled"}
              </Typography>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions className="moduleModal__Actions">
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

export default ModuleModal;
