// import EmployeeBio from "@src/components/employee/employee-bio";
// import EmployeeDetails from "@src/components/employee/employee-details";
import EmployeeListing from "@src/components/common/presentational/employee/employee-listing";
import Layout from "@src/components/shared/layout";

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
