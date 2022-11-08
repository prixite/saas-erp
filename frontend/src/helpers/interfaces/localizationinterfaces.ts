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

export interface LocalizationInterface {
  Buttons: btnsInterface;
  Employee: employeeInterface;
  Dashboard: dashboardInterface;
  User: userInterface;
  Payroll: payrollInterface;
  Account: accountInterface;
}
