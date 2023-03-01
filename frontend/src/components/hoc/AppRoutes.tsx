import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import ForgotPassword from "@src/components/common/presentational/forgotPassword/forgotPassword";
import Login from "@src/components/common/presentational/login/Login";
import ResetPassword from "@src/components/common/presentational/resetPassword/resetPassword";
import Signup from "@src/components/common/presentational/signup/Signup";
import Accounts from "@src/components/common/smart/accounts/accounts";
import AdminSettings from "@src/components/common/smart/adminSettings/adminSettings";
import Attendance from "@src/components/common/smart/attendance/attendance";
import Company from "@src/components/common/smart/company/company";
import Currency from "@src/components/common/smart/currnecy/currnecy";
import Dashboard from "@src/components/common/smart/dashboard/dashboard";
import Department from "@src/components/common/smart/department/department";
import Employee from "@src/components/common/smart/employee/employee";
import EmployeeSection from "@src/components/common/smart/employeeSection/EmployeeSection";
import EmployementType from "@src/components/common/smart/employementType/employementType";
import Institute from "@src/components/common/smart/institute/institute";
import Leaves from "@src/components/common/smart/leaves/leaves";
import Modules from "@src/components/common/smart/modules/modules";
import OrganizationModules from "@src/components/common/smart/organizationModules/organizationModules";
import Organization from "@src/components/common/smart/organizations/organization";
import Payroll from "@src/components/common/smart/payroll/payroll";
import ProfilePage from "@src/components/common/smart/profile/profilePage";
import Program from "@src/components/common/smart/program/program";
import Reports from "@src/components/common/smart/reports/reports";
import Settings from "@src/components/common/smart/settings/settings";
import Standup from "@src/components/common/smart/standup/standup";
import Teams from "@src/components/common/smart/teams/teams";
import UserAccess from "@src/components/common/smart/userAccess/userAccess";
import Users from "@src/components/common/smart/users/users";
import {
  AuhtContextInterface,
  AuthContext,
} from "@src/components/hoc/AuthContext";
import ProtectedRoute from "@src/components/hoc/ProtectedRoute";
import Layout from "@src/components/shared/layout";
import { useGetFlagsQuery } from "@src/store/reducers/employees-api";

const AppRoutes = () => {
  const { userData } = useContext(AuthContext) as AuhtContextInterface;
  const { data: Flags = [], isLoading } = useGetFlagsQuery();
  const allFlags = Object.assign({}, ...Flags);
  return (
    <>
      {!isLoading ? (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/onbaord" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            {userData?.is_superuser ? (
              <>
                <Route path="settings/" element={<AdminSettings />} />
                <Route path="organizations/" element={<Organization />} />
                <Route path="modules/" element={<Modules />} />
                <Route
                  path="organizations/modules/"
                  element={<OrganizationModules />}
                />
              </>
            ) : (
              <>
                {allFlags.show_employees_module && (
                  <>
                    <Route path="employees/" element={<Employee />} />
                    <Route
                      path="employees/:employeeId"
                      element={<EmployeeSection />}
                    />
                  </>
                )}
                <Route path="profile/" element={<ProfilePage />} />
                {allFlags.show_users_module && (
                  <>
                    <Route path="users/" element={<Users />} />
                    <Route
                      path="users/:userId/access/"
                      element={<UserAccess />}
                    />
                  </>
                )}
                {allFlags.show_accounts_module && (
                  <Route path="accounts/" element={<Accounts />} />
                )}
                {allFlags.show_payroll_module && (
                  <Route path="payroll/" element={<Payroll />} />
                )}
                <Route path="leaves/" element={<Leaves />} />
                <Route path="teams/" element={<Teams />} />
                <Route path="reports/" element={<Reports />} />
                <Route path="attendance/" element={<Attendance />} />
                <Route path="standups/" element={<Standup />} />
                <Route path="settings/department" element={<Department />} />
                <Route
                  path="settings/employment-type"
                  element={<EmployementType />}
                />
                <Route path="settings/program" element={<Program />} />
                <Route path="settings/institute" element={<Institute />} />
                <Route path="settings/company" element={<Company />} />
                <Route path="settings/currency" element={<Currency />} />
                <Route path="settings/" element={<Settings />} />
              </>
            )}
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      ) : (
        <p>Loading ...</p>
      )}
    </>
  );
};
export default AppRoutes;
