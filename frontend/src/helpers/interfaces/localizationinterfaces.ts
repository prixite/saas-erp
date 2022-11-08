export interface btnsInterface {
  createButton: string;
  filterButton: string;
}
export interface employeeInterface {
  employeeHeading: string;
}
export interface userInterface {
  userHeading: string;
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
}
