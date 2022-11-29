import { Navigate, Route, Routes } from "react-router-dom";
import Employee from "@src/components/common/presentational/employee/employee";
import Accounts from "@src/components/common/smart/accounts/accounts";
import Dashboard from "@src/components/common/smart/dashboard/dashboard";
import EmployeeSection from "@src/components/common/smart/employeeSection/EmployeeSection";
import Payroll from "@src/components/common/smart/payroll/payroll";
import ProfilePage from "@src/components/common/smart/profile/profilePage";
import Users from "@src/components/common/smart/users/users";
import Layout from "@src/components/shared/layout";

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/react/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="employees/" element={<Employee />} />
          <Route path="employees/:employeeId" element={<EmployeeSection />} />
          <Route path="profile/" element={<ProfilePage />} />
          <Route path="users/" element={<Users />} />
          <Route path="accounts/" element={<Accounts />} />
          <Route path="payroll/" element={<Payroll />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </>
  );
};
export default AppRoutes;
