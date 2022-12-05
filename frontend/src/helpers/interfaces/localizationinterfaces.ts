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
