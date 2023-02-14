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
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import * as yup from "yup";
import crossIcon from "@src/assets/svgs/cross.svg";
import submitIcon from "@src/assets/svgs/Frame.svg";
import { timeOut } from "@src/helpers/constants/constants";
import { DepartmentInterface } from "@src/helpers/interfaces/localizationinterfaces";
import { toastAPIError } from "@src/helpers/utils/utils";
import {
  useApiDepartmentCreateMutation,
  useApiDepartmentUpdateMutation,
  useApiDepartmentRetrieveQuery,
} from "@src/store/api";
import "@src/components/shared/popUps/departmentModal/departmentModal.scss";

interface Props {
  dptId?: number;
  action?: string;
  open: boolean;
  handleClose: () => void;
}

const DepartmentModal = ({ dptId, action, open, handleClose }: Props) => {
  const [createDpt] = useApiDepartmentCreateMutation();
  const [updateDpt] = useApiDepartmentUpdateMutation();
  const { data: dptData } = useApiDepartmentRetrieveQuery(
    {
      id: Number(dptId || ""),
    },
    { skip: !dptId }
  );

  const [loading, setLoading] = useState(false);

  const populateEditableData = (dptData: DepartmentInterface | undefined) => {
    formik.setValues({
      name: dptData?.name as string,
    });
  };
  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: yup.object({
      name: yup.string().required("Name is required"),
    }),
    validateOnChange: true,
    onSubmit: () => {
      if (action === "edit") {
        handleDeptEdit();
      } else {
        handleDeptCreate();
      }
    },
  });
  const handleDeptCreate = async () => {
    setLoading(true);
    await createDpt({
      department: {
        name: formik.values.name,
      },
    })
      .unwrap()
      .then(async () => {
        toast.success("Department created successfully.", {
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
  const handleDeptEdit = async () => {
    setLoading(true);
    await updateDpt({
      id: dptId as number,
      department: {
        name: formik.values.name,
      },
    })
      .unwrap()
      .then(async () => {
        toast.success("Department updated successfully.", {
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
      populateEditableData(dptData);
    }
  }, [action, dptData, dptId]);

  const resetModal = () => {
    formik.resetForm();
    handleClose();
  };

  return (
    <>
      <Dialog open={open} onClose={resetModal} className="departmentModal">
        <DialogTitle>
          <Box className="modal-header-cls">
            <Box className="heading-text-box">
              <Typography className="heading-text">
                {action == "edit"
                  ? "Update a department"
                  : "Create a department"}
              </Typography>
              <Typography className="subheading-text">
                {action == "edit"
                  ? "Fill the following fields to update a department"
                  : "Fill the following fields to add a department"}
              </Typography>
            </Box>
            <Box className="cross-icon-box" onClick={resetModal}>
              <img src={crossIcon} className="cross-btn" />
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent className="departmentModal__Content">
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
          </Box>
        </DialogContent>
        <DialogActions className="departmentModal__Actions">
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

export default DepartmentModal;
