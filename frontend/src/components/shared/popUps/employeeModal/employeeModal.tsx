import { useState, useEffect } from "react";
import { LoadingButton } from "@mui/lab";
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
import { timeOut } from "@src/helpers/constants/constants";
import {
  LocalizationInterface,
  EmployeeForm,
  S3Interface,
} from "@src/helpers/interfaces/localizationinterfaces";
import { localizedData } from "@src/helpers/utils/language";
import { uploadImageToS3 } from "@src/helpers/utils/uploadImage";
import {
  emailRegX,
  nameRegex,
  phoneRegex,
  nicRegex,
} from "@src/helpers/utils/utils";
import {
  useCreateEmployeeMutation,
  useGetEmployeeDataQuery,
  useUpdateEmployeeMutation,
} from "@src/store/reducers/employees-api";

interface Props {
  open: boolean;
  handleClose: () => void;
  action?: string;
  empId?: number;
}

const employeeFormInitialState: EmployeeForm = {
  firstName: "",
  lastName: "",
  email: "",
  image: "",
  contactNumber: "",
  defaultRole: null || undefined,
  degrees: [
    {
      program: "",
      institute: "",
      year: "",
    },
  ],
  assets: [],
  experience: [
    {
      title: "",
      company: "",
      start_date: "",
      end_date: "",
    },
  ],
  orgId: "",
  managing: [],
  totalExperience: "",
  manages: [],
  nic: "",
  dateOfJoining: "",
  emergencyContactNumber: "",
  designation: "",
  salary: null || undefined,
  userAllowed: false,
  department: null || undefined,
  manager: null || undefined,
  type: null || undefined,
  benefits: [],
};

const EmployeeModal = ({ open, handleClose, action, empId }: Props) => {
  const constantData: LocalizationInterface = localizedData();
  const [openSuccessModal, setOpenSucessModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState("1");
  const [onChangeValidation, setOnChangeValidation] = useState(false);
  const [createEmployee] = useCreateEmployeeMutation();
  const [updateEmployee] = useUpdateEmployeeMutation();
  const { data: employeeData } = useGetEmployeeDataQuery(
    {
      id: Number(empId || ""),
    },
    { skip: !Number(empId || "") }
  );
  const getManagingIds = employeeData?.manages?.map((item) => item.id);
  const getBenefitsIds = employeeData?.benefits?.map(({ id }) => id);
  const {
    createEmployeeHeading,
    createEmployeeSubheading,
    updateEmployeeHeading,
    updateEmployeeSubheading,
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
    firstNameRegxError,
    lastNameRegxError,
    phoneRegxError,
    nicRegxError,
    employeeImageError,
  } = constantData.Modals;

  const employeeFormValidationSchema = yup.object({
    firstName: yup
      .string()
      .matches(nameRegex, firstNameRegxError)
      .required(firstNameRequired),
    lastName: yup
      .string()
      .matches(nameRegex, lastNameRegxError)
      .required(lastNameRequired),
    contactNumber: yup
      .string()
      .matches(phoneRegex, phoneRegxError)
      .required(phoneRequired),
    email: yup
      .string()
      .matches(emailRegX, emailrRegxError)
      .required(emailRequired),
    nic: yup.string().matches(nicRegex, nicRegxError).required(CnicRequired),
    image: yup.string().required(employeeImageError),
    dateOfJoining: yup.string().required(joiningDateRequired),
    designation: yup.string().required(DesignationRequired),
    emergencyContactNumber: yup
      .string()
      .matches(phoneRegex, phoneRegxError)
      .required(EmergencyContactRequired),
    type: yup.string().required(EmployementTypeRequired),
    defaultRole: yup.string().required(DefaultRoleRequired),
    department: yup.string().required(DepartmentRequired),
  });
  const employeeExperienceValidationSchema = yup.object().shape({
    experience: yup.array().of(
      yup.object().shape({
        title: yup.string().required(DesignationRequired),
        company: yup.string().required(CompanyRequired),
        start_date: yup.string().required(StartDateRequired),
        end_date: yup.string().required(EndDateRequired),
      })
    ),
  });
  const employeeDegreeValidationSchema = yup.object({
    degrees: yup.array().of(
      yup.object().shape({
        program: yup.string().required(DegreeRequired),
        institute: yup.string().required(UniversityRequired),
        year: yup.string().required(YearRequired),
      })
    ),
  });
  const formik = useFormik<EmployeeForm>({
    initialValues:
      action === "edit"
        ? {
            ...employeeFormInitialState,
            experience: [
              {
                title: "",
                company: {
                  id: "",
                  name: "",
                },
                start_date: "",
                end_date: "",
              },
            ],
          }
        : employeeFormInitialState,
    validationSchema:
      page === "1"
        ? employeeFormValidationSchema
        : page === "2"
        ? employeeExperienceValidationSchema
        : employeeDegreeValidationSchema,
    validateOnChange: onChangeValidation,
    onSubmit: () => {
      if (action === "edit") {
        handleEditEmployee();
      } else {
        handleAddEmployee();
      }
    },
  });

  useEffect(() => {
    if (action === "edit") {
      populateEditableData();
    }
  }, [action, employeeData]);
  const handleAddEmployee = async () => {
    setLoading(true);
    await uploadImageToS3(formik.values.image || "")
      .then(async (data: S3Interface) => {
        const employeeObject = getEmployeeObject(data.location);
        await createEmployee(employeeObject)
          .unwrap()
          .then(async () => {
            toast.success("New Employee Added.", {
              autoClose: timeOut,
              pauseOnHover: false,
            });
            setLoading(false);
            handleClose();
            formik.resetForm();
            setOpenSucessModal(true);
            setOnChangeValidation(false);
            setPage("1");
          })
          .catch((error) => {
            setLoading(false);
            toast.error(
              `${error?.data?.non_field_errors || ""}
              ${error?.data?.user?.email || ""}
              ${error?.data?.nic || ""}
              ${error?.data?.user?.image || ""}`
            );
          });
      })
      .catch((error) => {
        toast.error(error);
      });
  };
  const handleEditEmployee = async () => {
    setLoading(true);
    if (formik.values.image?.length) {
      performEditEmployee(formik.values.image);
    } else {
      await uploadImageToS3(formik.values.image || "")
        .then(async (data: S3Interface) => {
          performEditEmployee(data.location);
        })
        .catch((error) => {
          toast.error(error);
        });
    }
  };
  const performEditEmployee = async (data: string) => {
    const updatedObj = getEmployeeObject(data);
    await updateEmployee({ updatedObj: updatedObj, id: empId })
      .unwrap()
      .then(async () => {
        toast.success("Employee successfully updated.", {
          autoClose: timeOut,
          pauseOnHover: false,
        });
        setLoading(false);
        handleClose();
        formik.resetForm();
        setOpenSucessModal(true);
        setOnChangeValidation(false);
        setPage("1");
      })
      .catch((error) => {
        setLoading(false);
        toast.error(
          `${error?.data?.non_field_errors || ""}
          ${error?.data?.user?.email || ""}
          ${error?.data?.nic || ""}
          ${error?.data?.user?.image || ""}`
        );
      });
  };
  const populateEditableData = () => {
    const editableExperience = employeeData?.experience.map((item) => ({
      ...item,
      company: item.company.id,
    }));
    const editableDegrees = employeeData?.degrees.map((item) => ({
      ...item,
      program: item.program.id,
      institute: item.institute.id,
    }));
    formik.setValues({
      firstName: employeeData?.user?.first_name || "",
      lastName: employeeData?.user?.last_name || "",
      email: employeeData?.user?.email || "",
      image: employeeData?.user?.image,
      contactNumber: employeeData?.user?.contact_number || "",
      defaultRole: employeeData?.user?.default_role,
      degrees: editableDegrees || [],
      assets: [],
      experience: editableExperience || [],
      orgId: employeeData?.org_id || "",
      managing: getManagingIds || [],
      totalExperience: employeeData?.total_experience || "",
      manages: getManagingIds || [],
      nic: employeeData?.nic || "",
      dateOfJoining: employeeData?.date_of_joining || "",
      emergencyContactNumber: employeeData?.emergency_contact_number || "",
      designation: employeeData?.designation || "",
      salary: employeeData?.salary,
      userAllowed: employeeData?.user_allowed as boolean,
      department: employeeData?.department?.id,
      manager: employeeData?.manager?.id,
      type: employeeData?.type?.id,
      benefits: getBenefitsIds || [],
    });
  };
  const getEmployeeObject = (imageUrl: string) => {
    return {
      user: {
        first_name: formik.values.firstName,
        last_name: formik.values.lastName,
        email: formik.values.email,
        image: imageUrl,
        contact_number: formik.values.contactNumber,
        default_role: formik.values.defaultRole,
      },
      degrees: formik.values.degrees,
      assets: [],
      experience: formik.values.experience,
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
    handleClose();
    setPage("1");
    setOnChangeValidation(false);
  };
  const addExpComponent = () => {
    formik.setFieldValue("experience", [
      ...formik.values.experience,
      {
        title: "",
        company: "",
        start_date: "",
        end_date: "",
      },
    ]);
  };
  const addDegreeComponent = () => {
    formik.setFieldValue("degrees", [
      ...formik.values.degrees,
      {
        program: "",
        year: "",
        institute: "",
      },
    ]);
  };
  return (
    <Box>
      <Dialog open={open} onClose={resetModal} className="EmployeeModal">
        <DialogTitle>
          <Box className="modal-header-cls">
            <Box className="heading-text-box">
              <Typography className="heading-text">
                {action === "edit"
                  ? updateEmployeeHeading
                  : createEmployeeHeading}
              </Typography>
              <Typography className="subheading-text">
                {action === "edit"
                  ? updateEmployeeSubheading
                  : createEmployeeSubheading}
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
              <PageOne formik={formik} action={action} />
            ) : page === "2" ? (
              <>
                <PageTwo formik={formik} />
              </>
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
                <Button className="upload-btn" onClick={addExpComponent}>
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
                <Button className="upload-btn" onClick={addDegreeComponent}>
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
                <LoadingButton
                  onClick={() => {
                    setOnChangeValidation(true);
                    formik.handleSubmit();
                  }}
                  className="submitBtn"
                  loading={loading}
                  sx={{ m: "0px" }}
                >
                  {!loading && (
                    <span style={{ display: "flex" }}>
                      {createEmployeeSave}
                      <span>
                        {" "}
                        <img
                          className="submit-img"
                          src={submitIcon}
                          alt="submit"
                        />
                      </span>{" "}
                    </span>
                  )}
                </LoadingButton>
              </Box>
            </Box>
          )}
        </DialogActions>
      </Dialog>
      <CongratsModal
        action={action}
        open={openSuccessModal}
        handleClose={handleModalClose}
      />
    </Box>
  );
};

export default EmployeeModal;
