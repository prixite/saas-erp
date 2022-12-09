import { useState } from "react";
import { Box, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useFormik } from "formik";
import * as yup from "yup";
import backIcon from "@src/assets/svgs/back.svg";
import crossIcon from "@src/assets/svgs/cross.svg";
import "@src/components/shared/popUps/employeeModal/employeeModal.scss";
import submitIcon from "@src/assets/svgs/Frame.svg";
import lineIcon from "@src/assets/svgs/line.svg";
import lineredIcon from "@src/assets/svgs/linered.svg";
import uploadIcon from "@src/assets/svgs/plus.svg";
import CongratsModal from "@src/components/shared/popUps/congratsModal/congratsModal";
import PageOne from "@src/components/shared/popUps/employeeModal/pageOne";
import PageThree from "@src/components/shared/popUps/employeeModal/pageThree";
import PageTwo from "@src/components/shared/popUps/employeeModal/pageTwo";
import {
  LocalizationInterface,
  EmployeeForm,
} from "@src/helpers/interfaces/localizationinterfaces";
import { localizedData } from "@src/helpers/utils/language";

interface Props {
  open: boolean;
  handleClose: () => void;
}

const employeeFormInitialState: EmployeeForm = {
  firstName: "",
  lastName: "",
  email: "",
  image: null,
  contactNumber: "",
  defaultRole: undefined,
  degrees: [],
  assets: [],
  experience: [],
  orgId: "",
  managing: [],
  totalExperience: "",
  manages: [],
  nic: "",
  dateOfJoining: "",
  emergencyContactNumber: "",
  designation: "",
  salary: undefined,
  userAllowed: false,
  createdAt: "",
  updatedAt: "",
  department: undefined,
  manager: undefined,
  type: undefined,
  benefits: [],
};
const employeeFormValidationSchema = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  contactNumber: yup.string().required(),
  email: yup.string().required(),
  nic: yup.string().required(),
  createdAt: yup.string().required(),
  manager: yup.string().required(),
  designation: yup.string().required(),
  salary: yup.string().required(),
  emergencyContactNumber: yup.string().required(),
  type: yup.string().required(),
});

const EmployeeModal = ({ open, handleClose }: Props) => {
  const constantData: LocalizationInterface = localizedData();
  const [openSuccessModal, setOpenSucessModal] = useState(false);
  const {
    createEmployeeHeading,
    createEmployeeSubheading,
    createEmployeeClose,
    createEmployeeNext,
    stepOne,
    stepTwo,
    stepThree,
    basicInformation,
    experience,
    createEmployeeBack,
    createEmployeeSave,
    addNewEducation,
    education,
    addNewExperience,
  } = constantData.Modals;
  const [page, setPage] = useState("1");
  const [onChangeValidation, setOnChangeValidation] = useState(false);
  const formik = useFormik<EmployeeForm>({
    initialValues: employeeFormInitialState,
    validationSchema: employeeFormValidationSchema,
    validateOnChange: onChangeValidation,
    // onSubmit: () => {
    //   console.log("values are", formik.values);
    // },
  });
  const moveToNextPage = async () => {
    const errors = await formik.validateForm();
    if (page == "1" && !Object.keys(errors).length) {
      setPage("2");
    } else if (page === "2" && !Object.keys(errors).length) {
      setPage("3");
    } else {
      setOnChangeValidation(true);
    }
  };
  const handleModalClose = () => {
    setOpenSucessModal(false);
  };
  return (
    <Box>
      <Dialog open={open} onClose={handleClose} className="EmployeeModal">
        <DialogTitle>
          <Box className="modal-header-cls">
            <Box className="heading-text-box">
              <Typography className="heading-text">
                {createEmployeeHeading}
              </Typography>
              <Typography className="subheading-text">
                {createEmployeeSubheading}
              </Typography>
            </Box>
            <Box className="cross-icon-box" onClick={handleClose}>
              <img src={crossIcon} className="cross-btn" />
            </Box>
          </Box>
          <Box className="steps-btns-cls">
            <Box className="step-box">
              <Typography
                style={{ color: page === "1" ? "black" : "#6C6C6C" }}
                className="step-cls"
              >
                {stepOne}
              </Typography>
              <Typography
                style={{ color: page === "1" ? "black" : "#6C6C6C" }}
                className="step-value-cls"
              >
                {basicInformation}
              </Typography>
              <img
                className="divider-cls"
                src={page === "1" ? lineredIcon : lineIcon}
                alt="line"
              />
            </Box>
            <Box className="step-box">
              <Typography
                style={{ color: page === "2" ? "black" : "#6C6C6C" }}
                className="step-cls"
              >
                {stepTwo}
              </Typography>
              <Typography
                style={{ color: page === "2" ? "black" : "#6C6C6C" }}
                className="step-value-cls"
              >
                {experience}
              </Typography>
              <img
                className="divider-cls"
                src={page === "2" ? lineredIcon : lineIcon}
                alt="line"
              />
            </Box>
            <Box className="step-box">
              <Typography
                style={{ color: page === "3" ? "black" : "#6C6C6C" }}
                className="step-cls"
              >
                {stepThree}
              </Typography>
              <Typography
                style={{ color: page === "3" ? "black" : "#6C6C6C" }}
                className="step-value-cls"
              >
                {education}
              </Typography>
              <img
                className="divider-cls"
                src={page === "3" ? lineredIcon : lineIcon}
                alt="line"
              />
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent className="FilterModal__Content">
          <Box className="content-cls">
            {page === "1" ? (
              <PageOne formik={formik} />
            ) : page === "2" ? (
              <PageTwo />
            ) : (
              <PageThree />
            )}
          </Box>
        </DialogContent>
        <DialogActions className="EmployeeModal__Actions">
          {page === "1" ? (
            <>
              <Button className="resetBtn" onClick={handleClose}>
                <span>
                  {" "}
                  <img className="reset-img" src={crossIcon} alt="reset" />
                </span>{" "}
                {createEmployeeClose}
              </Button>
              <Button
                onClick={moveToNextPage}
                className="submitBtn"
                sx={{ ml: "12px !important" }}
              >
                {createEmployeeNext}
                <span>
                  {" "}
                  <img className="submit-img" src={submitIcon} alt="submit" />
                </span>{" "}
              </Button>
            </>
          ) : page === "2" ? (
            <Box className="actions-btns-wrapper">
              <Box className="add-new-sec">
                <Button className="upload-btn">
                  <span>
                    {" "}
                    <img className="upload-img" src={uploadIcon} alt="doc" />
                  </span>{" "}
                  {addNewExperience}
                </Button>
              </Box>
              <Box>
                <Button
                  className="resetBtn"
                  onClick={() => setPage("1")}
                  sx={{ mr: "12px" }}
                >
                  <span>
                    {" "}
                    <img className="reset-img" src={backIcon} alt="reset" />
                  </span>{" "}
                  {createEmployeeBack}
                </Button>
                <Button
                  onClick={moveToNextPage}
                  className="submitBtn"
                  sx={{ m: "0px" }}
                >
                  {createEmployeeNext}
                  <span>
                    {" "}
                    <img className="submit-img" src={submitIcon} alt="submit" />
                  </span>{" "}
                </Button>
              </Box>
            </Box>
          ) : (
            <Box className="actions-btns-wrapper">
              <Box className="add-new-sec">
                <Button className="upload-btn">
                  <span>
                    {" "}
                    <img className="upload-img" src={uploadIcon} alt="doc" />
                  </span>{" "}
                  {addNewEducation}
                </Button>
              </Box>
              <Box>
                <Button
                  className="resetBtn"
                  onClick={() => setPage("2")}
                  sx={{ mr: "12px" }}
                >
                  <span>
                    {" "}
                    <img className="reset-img" src={backIcon} alt="reset" />
                  </span>{" "}
                  {createEmployeeBack}
                </Button>
                <Button
                  onClick={moveToNextPage}
                  className="submitBtn"
                  sx={{ m: "0px" }}
                >
                  {createEmployeeSave}
                  <span>
                    {" "}
                    <img className="submit-img" src={submitIcon} alt="submit" />
                  </span>{" "}
                </Button>
              </Box>
            </Box>
          )}
        </DialogActions>
      </Dialog>
      <CongratsModal open={openSuccessModal} handleClose={handleModalClose} />
    </Box>
  );
};

export default EmployeeModal;
