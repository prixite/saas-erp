// import EmployeeBio from "@src/components/employee/employee-bio";
// import EmployeeDetails from "@src/components/employee/employee-details";
import Layout from "@src/components/shared/layout";
import EmployeeListing from "@src/components/employee/employee-listing";

const Employee = () => {
  return (
    <Layout>
      {/* <EmployeeBio />
      <EmployeeDetails /> */}
      <EmployeeListing />
    </Layout>
  );
};
export default Employee;
