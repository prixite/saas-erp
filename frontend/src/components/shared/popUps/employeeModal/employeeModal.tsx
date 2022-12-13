import { useState } from "react";
import { Box, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useFormik } from "formik";
import moment from "moment";
import { toast } from "react-toastify";
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
import { emailRegX } from "@src/helpers/utils/utils";
import { addNewEmployeeService } from "@src/services/employeeService";
import { useCreateEmployeeMutation } from "@src/store/reducers/employees-api";

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
  department: undefined,
  manager: undefined,
  type: undefined,
  benefits: [],
  title: "",
  company: "",
  startDate: "",
  endDate: "",
  program: "",
  institute: "",
  year: "",
};

const EmployeeModal = ({ open, handleClose }: Props) => {
  const constantData: LocalizationInterface = localizedData();
  const [openSuccessModal, setOpenSucessModal] = useState(false);
  const [createEmployee] = useCreateEmployeeMutation();
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
    firstNameRequired,
    lastNameRequired,
    phoneRequired,
    emailRequired,
    joiningDateRequired,
    CnicRequired,
    DesignationRequired,
    ManagerRequired,
    SalaryRequired,
    EmployementTypeRequired,
    EmergencyContactRequired,
    CompanyRequired,
    StartDateRequired,
    EndDateRequired,
    DegreeRequired,
    UniversityRequired,
    DefaultRoleRequired,
    DepartmentRequired,
    YearRequired,
    emailrRegxError,
  } = constantData.Modals;

  const employeeFormValidationSchema = yup.object({
    firstName: yup.string().required(firstNameRequired),
    lastName: yup.string().required(lastNameRequired),
    contactNumber: yup.string().required(phoneRequired),
    email: yup
      .string()
      .matches(emailRegX, emailrRegxError)
      .required(emailRequired),
    nic: yup.string().required(CnicRequired),
    dateOfJoining: yup.string().required(joiningDateRequired),
    manager: yup.string().required(ManagerRequired),
    designation: yup.string().required(DesignationRequired),
    salary: yup.string().required(SalaryRequired),
    emergencyContactNumber: yup.string().required(EmergencyContactRequired),
    type: yup.string().required(EmployementTypeRequired),
    defaultRole: yup.string().required(DefaultRoleRequired),
    department: yup.string().required(DepartmentRequired),
  });
  const employeeExperienceValidationSchema = yup.object({
    title: yup.string().required(DesignationRequired),
    company: yup.string().required(CompanyRequired),
    startDate: yup.string().required(StartDateRequired),
    endDate: yup.string().required(EndDateRequired),
  });
  const employeeDegreeValidationSchema = yup.object({
    program: yup.string().required(DegreeRequired),
    institute: yup.string().required(UniversityRequired),
    year: yup.string().required(YearRequired),
  });
  const [page, setPage] = useState("1");
  const [onChangeValidation, setOnChangeValidation] = useState(false);
  const formik = useFormik<EmployeeForm>({
    initialValues: employeeFormInitialState,
    validationSchema:
      page === "1"
        ? employeeFormValidationSchema
        : page === "2"
        ? employeeExperienceValidationSchema
        : employeeDegreeValidationSchema,
    validateOnChange: onChangeValidation,
    onSubmit: () => {
      handleAddEmployee();
    },
  });
  const handleAddEmployee = () => {
    const employeeObject = getEmployeeObject();
    addNewEmployeeService(employeeObject, createEmployee)
      .then(() => {
        handleClose();
        formik.resetForm();
        setOpenSucessModal(true);
        setOnChangeValidation(false);
        setPage("1");
      })
      .catch((error) => {
        toast.error(
          `${error?.data?.non_field_errors || ""}
            ${error?.data?.user?.email || ""}
            ${error?.data?.nic || ""}`
        );
      });
  };
  const getEmployeeObject = () => {
    return {
      user: {
        first_name: formik.values.firstName,
        last_name: formik.values.lastName,
        email: formik.values.email,
        contact_number: formik.values.contactNumber,
        default_role: formik.values.defaultRole,
      },
      degrees: [
        {
          program: formik.values.program,
          institute: formik.values.institute,
          year: moment(formik.values.year).format("YYYY-MM-DD"),
        },
      ],
      assets: [],
      experience: [
        {
          title: formik.values.title,
          company: formik.values.company,
          start_date: moment(formik.values.startDate).format("YYYY-MM-DD"),
          end_date: moment(formik.values.endDate).format("YYYY-MM-DD"),
        },
      ],
      managing: formik.values.managing,
      nic: formik.values.nic,
      date_of_joining: moment(formik.values.dateOfJoining).format("YYYY-MM-DD"),
      emergency_contact_number: formik.values.emergencyContactNumber,
      designation: formik.values.designation,
      salary: formik.values.salary,
      user_allowed: true,
      department: formik.values.department,
      manager: formik.values.manager,
      type: formik.values.type,
      benefits: formik.values.benefits,
    };
  };
  const moveToNextPage = async () => {
    const errors = await formik.validateForm();
    if (page == "1" && !Object.keys(errors).length) {
      setPage("2");
      setOnChangeValidation(false);
    } else if (page === "2" && !Object.keys(errors).length) {
      setPage("3");
      setOnChangeValidation(false);
    } else {
      setOnChangeValidation(true);
    }
  };
  const handleModalClose = () => {
    resetModal();
    setOpenSucessModal(false);
  };
  const resetModal = () => {
    formik.resetForm();
    handleClose();
    setPage("1");
    setOnChangeValidation(false);
  };
  return (
    <Box>
      <Dialog open={open} onClose={resetModal} className="EmployeeModal">
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
            <Box className="cross-icon-box" onClick={resetModal}>
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
              <PageTwo formik={formik} />
            ) : (
              <PageThree formik={formik} />
            )}
          </Box>
        </DialogContent>
        <DialogActions className="EmployeeModal__Actions">
          {page === "1" ? (
            <>
              <Button className="resetBtn" onClick={resetModal}>
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
                  onClick={() => {
                    setOnChangeValidation(true);
                    formik.handleSubmit();
                  }}
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
