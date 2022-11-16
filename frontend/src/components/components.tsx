import EmployeeView from "../views/employeeView/EmployeeView";
import Employee from "./common/presentational/employee/employee";
import Accounts from "./common/smart/accounts/accounts";
import Dashboard from "./common/smart/dashboard/dashboard";
import Payroll from "./common/smart/payroll/payroll";
import ProfilePage from "./common/smart/profilePage/profilePage";
import Users from "./common/smart/users/users";

const allComponents = {
  Employee,
  Dashboard,
  Accounts,
  Payroll,
  Users,
  EmployeeView,
  ProfilePage,
};

export default allComponents;
