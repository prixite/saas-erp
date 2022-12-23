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
  phoneRegxError: string;
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

  firstNameRequired: string;
  lastNameRequired: string;
  emailRequired: string;
  phoneRequired: string;
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
  image?: string | null;
  contactNumber: string;
  defaultRole?: number | null;
  degrees: Degree[];
  assets: Asset[];
  experience: Experirence[];
  orgId: string;
  managing: number[];
  totalExperience: string;
  manages: string[];
  nic: string;
  dateOfJoining: string;
  emergencyContactNumber: string;
  designation: string;
  salary?: number | null;
  userAllowed?: boolean;
  department?: number | null;
  manager?: number | null;
  type?: number | null;
  benefits: number[];
};
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
}
