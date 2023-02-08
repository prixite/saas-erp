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
import {
  DepartmentInterface,
  ProgramInterface,
} from "@src/helpers/interfaces/localizationinterfaces";
import { toastAPIError } from "@src/helpers/utils/utils";
import {
  useApiProgramsCreateMutation,
  useApiProgramsUpdateMutation,
  useApiProgramsRetrieveQuery,
} from "@src/store/api";
import "@src/components/shared/popUps/programModal/programModal.scss";

interface Props {
  programId?: number;
  action?: string;
  open: boolean;
  handleClose: () => void;
}

const ProgramModal = ({ programId, action, open, handleClose }: Props) => {
  const [createProgram] = useApiProgramsCreateMutation();
  const [updateProgram] = useApiProgramsUpdateMutation();
  const { data: programData } = useApiProgramsRetrieveQuery(
    {
      id: Number(programId || ""),
    },
    { skip: !programId }
  );

  const [loading, setLoading] = useState(false);

  const populateEditableData = (programData: ProgramInterface | undefined) => {
    formik.setValues({
      name: programData?.name as string,
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
        handleProgramEdit();
      } else {
        handleProgramCreate();
      }
    },
  });
  const handleProgramCreate = async () => {
    setLoading(true);
    await createProgram({
      program: {
        name: formik.values.name,
      },
    })
      .unwrap()
      .then(async () => {
        toast.success("Program created successfully.", {
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
  const handleProgramEdit = async () => {
    setLoading(true);
    await updateProgram({
      id: programId as number,
      program: {
        name: formik.values.name,
      },
    })
      .unwrap()
      .then(async () => {
        toast.success("Program updated successfully.", {
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
      populateEditableData(programData);
    }
  }, [action, programData, programId]);

  const resetModal = () => {
    formik.resetForm();
    handleClose();
  };

  return (
    <>
      <Dialog open={open} onClose={resetModal} className="programModal">
        <DialogTitle>
          <Box className="modal-header-cls">
            <Box className="heading-text-box">
              <Typography className="heading-text">
                {action == "edit" ? "Update a program" : "Create a program"}
              </Typography>
              <Typography className="subheading-text">
                {action == "edit"
                  ? "Fill the following fields to update a program"
                  : "Fill the following fields to add a program"}
              </Typography>
            </Box>
            <Box className="cross-icon-box" onClick={resetModal}>
              <img src={crossIcon} className="cross-btn" />
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent className="programModal__Content">
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
        <DialogActions className="programModal__Actions">
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

export default ProgramModal;
