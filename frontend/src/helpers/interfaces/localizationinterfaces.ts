import { FormikErrors } from "formik";
export interface btnsInterface {
  createButton: string;
  filterButton: string;
}
export interface employeeInterface {
  employeeHeading: string;
  employeeBenefitsHeading: string;
  currentSalary: string;
  compensationType: string;
  compensationScheule: string;
  fuelAllowance: string;
  phoneAllowance: string;
  overtimeAllowance: string;
  mealsAllowance: string;
  employeeExperienceLetters: string;
  uploadDocument: string;
  notFound: string;
  employeeDeleteSuccess: string;
}
export interface userInterface {
  userHeading: string;
}
export interface breadcrumbsInterface {
  Home: string;
}
export interface modalsInterface {
  filterHeading: string;
  filterSubheading: string;
  filterSalaryHeading: string;
  filterResetBtn: string;
  filterSubmitBtn: string;
  filterNameLabel: string;
  filterDesignationLabel: string;
  createEmployeeHeading: string;
  createEmployeeSubheading: string;
  updateEmployeeHeading: string;
  updateEmployeeSubheading: string;
  createEmployeeClose: string;
  createEmployeeNext: string;
  createEmployeeSave: string;
  createEmployeeBack: string;
  employeeNameLabel: string;
  employeeEmailLabel: string;
  employeePhoneLabel: string;
  employeeCnicLabel: string;
  employeeDateLabel: string;
  employeeManagerLabel: string;
  employeeDesignationLabel: string;
  employeeSalaryLabel: string;
  employeeManagingLabel: string;
  employeeEmployementLabel: string;
  employeeAssetLabel: string;
  employeeEmergencyContactLabel: string;
  employeeCompensationLabel: string;
  stepOne: string;
  stepTwo: string;
  stepThree: string;
  basicInformation: string;
  experience: string;
  education: string;
  addNewExperience: string;
  addNewEducation: string;
  uploadExperienceLetter: string;
  uploadReleventDegree: string;
  CurrentlyWorking: string;
  CurrentlyProgress: string;
  employeeCompnay: string;
  dateStart: string;
  dateEnd: string;
  employeeDegree: string;
  employeeUniveristy: string;
  newEmployeeCreated: string;
  employeeUpdated: string;
  congrats: string;
  backToListing: string;
  wantToDelete: string;
  yes: string;
  no: string;
  employeeFirstName: string;
  employeeLastName: string;
  year: string;
  firstNameRequired: string;
  lastNameRequired: string;
  phoneRequired: string;
  emailRequired: string;
  joiningDateRequired: string;
  CnicRequired: string;
  DesignationRequired: string;
  ManagerRequired: string;
  SalaryRequired: string;
  EmployementTypeRequired: string;
  EmergencyContactRequired: string;
  AssetsRequired: string;
  CompanyRequired: string;
  StartDateRequired: string;
  EndDateRequired: string;
  DegreeRequired: string;
  UniversityRequired: string;
  DepartmentRequired: string;
  DefaultRoleRequired: string;
  YearRequired: string;
  emailrRegxError: string;
  defaultRoleLabel: string;
  departmentsLabel: string;
  firstNameRegxError: string;
  lastNameRegxError: string;
  nicRegxError: string;
  employeeImageError: string;
  phoneRegxError: string;
  uploadImg: string;
  removeImg: string;
  uploadfileDescription: string;
  imgSize: string;
  uploadImgDescription: string;
  uploadOrganizationLogo: string;
  uploadCompanyLogo: string;
  uploadImage: string;
  dragToAdjust: string;
  saveChanges: string;
  canLogin: string;
  leaveTypeLabel: string;
  leaveStatusLabel: string;
  leaveHrCommentsLabel: string;
  cancelBtn: string;
  saveBtn: string;
}
export interface payrollInterface {
  payrollHeading: string;
}
export interface accountInterface {
  accountHeading: string;
}
export interface dashboardInterface {
  dashboardHeading: string;
}
export interface experienceInterface {
  experienceHeading: string;
}
export interface educationInterface {
  educationHeading: string;
}

export interface additionalInformationInterface {
  additionalInformationHeading: string;
  department: string;
  manager: string;
  totalExperience: string;
  joiningDate: string;
  emergencyContact: string;
  cnic: string;
  editBtn: string;
  deleteBtn: string;
}

export interface profilePageInterface {
  basicInformationHeading: string;
  changePasswordHeading: string;
  notificationHeading: string;
  billUpdatesLabel: string;
  newTeamMembersLabel: string;
  newsLetterLabel: string;
  emailSub: string;
  phoneSub: string;
  saveBtn: string;
  cancelBtn: string;
  firstNameError: string;
  lastNameError: string;
  emailError: string;
  phoneError: string;
  headlineRequired: string;

  firstNameRequired: string;
  lastNameRequired: string;
  emailRequired: string;
  phoneRequired: string;
  passwordRequired: string;
  passwordMatch: string;
  currentPasswordRequired: string;
  newPasswordRequired: string;
  verifyPasswordRequired: string;
}

export interface employeeButtons {
  basicBtn: string;
  docsBtn: string;
  compBtn: string;
}
export interface menuButtons {
  editBtn: string;
  deleteBtn: string;
}
export interface editBenefitModal {
  Heading: string;
  HeadingText: string;
  CompensationAndHeading: string;
  CancelBtn: string;
  SaveBtn: string;
  FuelAllowance: string;
  PhoneAllowance: string;
  OvertimeAllowance: string;
  DinnerAllowance: string;
  MealAllowance: string;
}
export type Degree = {
  program: string;
  institute: string;
  year: string;
};
export type Asset = {
  id: number;
  name: string;
  attribute_values: {
    [key: string]: string;
  };
  created_at: string;
  updated_at: string;
  type: number;
};
export type CompanyEdit = {
  id: string;
  name: string;
};
export type Experirence = {
  title: string;
  company: CompanyEdit | string;
  start_date: string;
  end_date: string;
};
export interface AuthPages {
  saas: string;
  erp: string;
  forgot_password_title: string;
  reset_password_title: string;
  reset_password_desc: string;
  forgot_password_desc: string;
  email_text: string;
  password_text: string;
  confirm_password_text: string;
  save_password_text: string;
  reset_password_btn: string;
  Back_to: string;
  login_text: string;
  email_required_text: string;
  invalid_email_text: string;
  password_required_text: string;
  confirm_password_required_text: string;
}
export type Benefit = {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
};
export type EmployeeForm = {
  firstName: string;
  lastName: string;
  email: string;
  image?: string;
  contactNumber: string;
  defaultRole?: number;
  degrees: Degree[];
  assets: Asset[];
  experience: Experirence[];
  orgId: string;
  managing: string[];
  totalExperience: string;
  manages: string[];
  nic: string;
  dateOfJoining: string;
  emergencyContactNumber: string;
  designation: string;
  salary?: number;
  userAllowed?: boolean;
  department?: number;
  manager?: number;
  type?: number;
  benefits: number[];
};
export interface S3Interface {
  bucket: string;
  key: string;
  location: string;
}
export interface Formik {
  initialValues: EmployeeForm;
  initialStatus: EmployeeForm;
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  handleChange: (e: React.ChangeEvent<any>) => void;
  values: EmployeeForm;
  errors?: FormikErrors<EmployeeForm>;
  setFieldValue: (
    field: string,
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    value: any,
    shouldValidate?: boolean | undefined
  ) => Promise<FormikErrors<EmployeeForm>> | Promise<void>;
  submitCount: number;
}
export type OwnerForm = {
  firstname: string;
  lastname: string;
  email: string;
  image?: string;
  phone: string;
  headline: string;
};
export interface FormikOwner {
  initialValues: OwnerForm;
  initialStatus: OwnerForm;
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  handleChange: (e: React.ChangeEvent<any>) => void;
  values: EmployeeForm;
  errors?: FormikErrors<OwnerForm>;
  setFieldValue: (
    field: string,
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    value: any,
    shouldValidate?: boolean | undefined
  ) => Promise<FormikErrors<OwnerForm>> | Promise<void>;
  submitCount: number;
}
export interface leavesData {
  AnnualLeaves: string;
  CausalLeaves: string;
  SickLeaves: string;
  AttendanceSummary: string;
  Present: string;
  Absent: string;
  LateArrival: string;
  Leaves: string;
  ShortDuration: string;
  LeaveRequests: string;
  CheckingTime: string;
  Action: string;
  Accepted: string;
  Rejected: string;
  ViewAllLeaves: string;
  ClockError: string;
  LeavesManagement: string;
  Leave: string;
  Leavesubheading: string;
  LeaveTypeRequired: string;
  LeaveStatusRequired: string;
  LeaveHRCommentsRequired: string;
  Actions: string;
  CasualLeave: string;
  SickLeave: string;
  AnnualLeave: string;
  Pending: string;
  Approved: string;
  Denied: string;
}
export interface LocalizationInterface {
  Buttons: btnsInterface;
  Employee: employeeInterface;
  Dashboard: dashboardInterface;
  User: userInterface;
  Payroll: payrollInterface;
  Account: accountInterface;
  Experience: experienceInterface;
  Education: educationInterface;
  AdditionalInformation: additionalInformationInterface;
  ProfilePage: profilePageInterface;
  EmployeeButtons: employeeButtons;
  Modals: modalsInterface;
  MenuButtons: menuButtons;
  EditBenefitModal: editBenefitModal;
  BreadCrumbs: breadcrumbsInterface;
  AuthPages: AuthPages;
  Leaves: leavesData;
}
