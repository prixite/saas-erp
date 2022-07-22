import EmployeeBio from "@src/components/employee/employee-bio";
import EmployeeDetails from "@src/components/employee/employee-details";
import Layout from "@src/components/shared/layout";

const Employee = () => {
  return (
    <Layout>
      <EmployeeBio />
      <EmployeeDetails />
    </Layout>
  );
};
export default Employee;
