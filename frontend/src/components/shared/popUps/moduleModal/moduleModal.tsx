import { useState, useEffect } from "react";
import { LoadingButton } from "@mui/lab";
import { Box, Switch, Typography } from "@mui/material";
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
import { LocalizationInterface } from "@src/helpers/interfaces/localizationinterfaces";
import { localizedData } from "@src/helpers/utils/language";
import { toastAPIError } from "@src/helpers/utils/utils";
import { useApiModuleCreateMutation } from "@src/store/api";
import { ModeOutlined } from "@mui/icons-material";
import "@src/components/shared/popUps/moduleModal/moduleModal.scss";

interface Props {
  open: boolean;
  handleClose: () => void;
}

const ModuleModal = ({ open, handleClose }: Props) => {
  const constantData: LocalizationInterface = localizedData();
  const [loading, setLoading] = useState(false);
  const [createModule] = useApiModuleCreateMutation();

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
      handleModuleCreate();
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
        formik.resetForm();
        handleClose();
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
  ];

  return (
    <>
      <Dialog open={open} onClose={handleClose} className="moduleModal">
        <DialogTitle>
          <Box className="modal-header-cls">
            <Box className="heading-text-box">
              <Typography className="heading-text">
                {"Create a module"}
              </Typography>
              <Typography className="subheading-text">
                {"Fill the following fields to add a module"}
              </Typography>
            </Box>
            <Box className="cross-icon-box" onClick={handleClose}>
              <img src={crossIcon} className="cross-btn" />
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent className="ModuleModal__Content">
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
                multiline
                rows={4}
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
                    <MenuItem className="menu-item-cls" value={item.value}>
                      {item.name}
                    </MenuItem>
                  );
                })}
              </TextField>
              <Typography className="errorText">
                {formik.touched.slug && formik.errors.slug}
              </Typography>
            </Box>
            <Box className="fields-cls">
              <Switch
                size="small"
                sx={{ paddingLeft: "5px" }}
                checked={formik.values.is_enabled}
                onChange={(event) =>
                  formik.setFieldValue("userAllowed", event.target.checked)
                }
              />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions className="ModuleModal__Actions">
          <Button className="resetBtn" onClick={handleClose}>
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
