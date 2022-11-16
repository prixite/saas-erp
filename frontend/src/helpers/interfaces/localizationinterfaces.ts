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
}
export interface userInterface {
  userHeading: string;
}
export interface modalsInterface {
  filterHeading: string;
  filterSubheading: string;
  filterSalaryHeading: string;
  filterResetBtn: string;
  filterSubmitBtn: string;
  filterNameLabel: string;
  filterDesignationLabel: string;
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
}
