const routes = {
  dashboard: {
    name: "Dashboard",
    path: "/react/",
    component: "Dashboard",
  },
  employeeCreation: {
    name: "employee-creation",
    path: "/react/employees/",
    component: "Employee",
  },
  employeeView: {
    name: "EmployeeView",
    path: "/react/employees/:employeeId",
    component: "EmployeeView",
  },
  accounts: {
    name: "Accounts",
    path: "/react/accounts/",
    component: "Accounts",
  },
  users: {
    name: "Users",
    path: "/react/users/",
    component: "Users",
  },
  payroll: {
    name: "Payroll",
    path: "/react/payroll/",
    component: "Payroll",
  },
  profilePage: {
    name: "ProfilePage",
    path: "/react/profile",
    component: "ProfilePage",
  },
};

export default routes;
