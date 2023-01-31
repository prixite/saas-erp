import { Navigate, Route, Routes } from "react-router-dom";
import Employee from "@src/components/common/presentational/employee/employee";
import ForgotPassword from "@src/components/common/presentational/forgotPassword/forgotPassword";
import Login from "@src/components/common/presentational/login/Login";
import ResetPassword from "@src/components/common/presentational/resetPassword/resetPassword";
import Signup from "@src/components/common/presentational/signup/Signup";
import Accounts from "@src/components/common/smart/accounts/accounts";
import AdminSettings from "@src/components/common/smart/adminSettings/adminSettings";
import Dashboard from "@src/components/common/smart/dashboard/dashboard";
import EmployeeSection from "@src/components/common/smart/employeeSection/EmployeeSection";
import Leaves from "@src/components/common/smart/leaves/leaves";
import Modules from "@src/components/common/smart/modules/modules";
import OrganizationModules from "@src/components/common/smart/organizationModules/organizationModules";
import Organization from "@src/components/common/smart/organizations/organization";
import Payroll from "@src/components/common/smart/payroll/payroll";
import ProfilePage from "@src/components/common/smart/profile/profilePage";
import Standup from "@src/components/common/smart/standup/standup";
import Users from "@src/components/common/smart/users/users";
import AdminRoute from "@src/components/hoc/AdminRoute";
import ProtectedRoute from "@src/components/hoc/ProtectedRoute";
import Layout from "@src/components/shared/layout";
import { useGetFlagsQuery } from "@src/store/reducers/employees-api";

const AppRoutes = () => {
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
              <Route path="users/" element={<Users />} />
            )}
            {allFlags.show_accounts_module && (
              <Route path="accounts/" element={<Accounts />} />
            )}
            {allFlags.show_payroll_module && (
              <Route path="payroll/" element={<Payroll />} />
            )}
            <Route path="leaves/" element={<Leaves />} />
            <Route path="standup/" element={<Standup />} />
          </Route>
          <Route
            path="/"
            element={
              <AdminRoute>
                <Layout />
              </AdminRoute>
            }
          >
            <Route path="settings/" element={<AdminSettings />} />
            <Route path="organizations/" element={<Organization />} />
            <Route path="modules/" element={<Modules />} />
            <Route
              path="organizations/modules/"
              element={<OrganizationModules />}
            />
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
