// import EmployeeBio from "@src/components/employee/employee-bio";
// import EmployeeDetails from "@src/components/employee/employee-details";
import { Box } from "@mui/system";
import DataGridTable from "@src/components/common/presentational/dataGridTable/DataGridTable";
// import EmployeeListing from "@src/components/common/presentational/employee/employee-listing";
import HeadBar from "@src/components/common/smart/dashboard/headbar/HeadBar";

const Employee = () => {
  return (
    <Box>
      <>
        <HeadBar />
        {/* <div>{data.map((item) => item.name)}</div> */}
        {/* <EmployeeBio />
          <EmployeeDetails /> */}
        {/* <EmployeeListing /> */}
        <DataGridTable />
      </>
    </Box>
  );
};
export default Employee;
