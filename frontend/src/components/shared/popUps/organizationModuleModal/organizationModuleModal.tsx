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
import {
  LocalizationInterface,
  OrganizationModuleInterface,
} from "@src/helpers/interfaces/localizationinterfaces";
import { localizedData } from "@src/helpers/utils/language";
import { toastAPIError } from "@src/helpers/utils/utils";
import { useApiOrganizationModuleCreateMutation } from "@src/store/api";
import {
  useApiOrganizationListQuery,
  useApiOrganizationModuleRetrieveQuery,
  useApiOrganizationModuleUpdateMutation,
} from "@src/store/api";
import { useApiModuleListQuery } from "@src/store/api";
import "@src/components/shared/popUps/organizationModuleModal/organizationModuleModal.scss";

interface Props {
  orgModuleId?: number;
  action?: string;
  open: boolean;
  handleClose: () => void;
}

const OrganizationModuleModal = ({
  orgModuleId,
  action,
  open,
  handleClose,
}: Props) => {
  const [createOrgModule] = useApiOrganizationModuleCreateMutation();
  const { data: organizationData } = useApiOrganizationListQuery();
  const { data: modulesData } = useApiModuleListQuery();
  const [updateOrgModule] = useApiOrganizationModuleUpdateMutation();
  const { data: orgModuleData } = useApiOrganizationModuleRetrieveQuery(
    {
      id: Number(orgModuleId || ""),
    },
    { skip: !orgModuleId }
  );

  const [loading, setLoading] = useState(false);

  const populateEditableData = (
    orgModuleData: OrganizationModuleInterface | undefined
  ) => {
    formik.setValues({
      organization: orgModuleData?.organization.id as number,
      module: orgModuleData?.module.id as number,
      is_enabled: orgModuleData?.is_enabled as boolean,
    });
  };

  const formik = useFormik({
    initialValues: {
      organization: 0,
      module: 0,
      is_enabled: true,
    },
    validationSchema: yup.object({
      organization: yup.string().required("Organization is required"),
      module: yup.string().required("Module is required"),
      is_enabled: yup.string().required("Is enabled is required"),
    }),
    validateOnChange: true,
    onSubmit: () => {
      if (action === "edit") {
        handleOrgModuleUpdate();
      } else {
        handleOrgModuleCreate();
      }
    },
  });
  const handleOrgModuleCreate = async () => {
    setLoading(true);
    await createOrgModule({
      organizationModule: {
        organization: formik.values.organization as number,
        module: formik.values.module as number,
        is_enabled: formik.values.is_enabled,
      },
    })
      .unwrap()
      .then(async () => {
        toast.success("Organization module created successfully.", {
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
  const handleOrgModuleUpdate = async () => {
    setLoading(true);
    await updateOrgModule({
      id: orgModuleId as number,
      organizationModule: {
        organization: formik.values.organization,
        module: formik.values.module,
        is_enabled: formik.values.is_enabled,
      },
    })
      .unwrap()
      .then(async () => {
        toast.success("Organization module updated successfully.", {
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
      populateEditableData(orgModuleData);
    }
  }, [action, orgModuleData, orgModuleId]);

  const resetModal = () => {
    formik.resetForm();
    handleClose();
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={resetModal}
        className="organizationModuleModal"
      >
        <DialogTitle>
          <Box className="modal-header-cls">
            <Box className="heading-text-box">
              <Typography className="heading-text">
                {action == "edit"
                  ? "Update organization module"
                  : "Create organization module"}
              </Typography>
              <Typography className="subheading-text">
                {action == "edit"
                  ? "Fill the following fields to update organization module"
                  : "Fill the following fields to add organization module"}
              </Typography>
            </Box>
            <Box className="cross-icon-box" onClick={resetModal}>
              <img src={crossIcon} className="cross-btn" />
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent className="organizationModuleModal__Content">
          <Box
            className="fields-cls"
            sx={{ height: "85px !important", marginTop: "16px" }}
          >
            <TextField
              className="text-field-cls"
              select
              required
              fullWidth
              name="organization"
              label={"Organization"}
              onChange={formik.handleChange}
              value={formik.values.organization || ""}
              InputLabelProps={{ className: "textfield_label" }}
            >
              {organizationData?.length ? (
                organizationData?.map((org) => {
                  return (
                    <MenuItem key={org.id} value={org.id}>
                      {org.name}
                    </MenuItem>
                  );
                })
              ) : (
                <Box></Box>
              )}
            </TextField>
            <Typography className="errorText">
              {formik.touched.organization && formik.errors.organization}
            </Typography>
          </Box>
          <Box className="fields-cls" sx={{ height: "85px !important" }}>
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
              {modulesData?.length ? (
                modulesData?.map((module) => {
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
        </DialogContent>
        <DialogActions className="organizationModuleModal__Actions">
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

export default OrganizationModuleModal;
