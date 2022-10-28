// import EmployeeBio from "@src/components/employee/employee-bio";
// import EmployeeDetails from "@src/components/employee/employee-details";
import { Box } from "@mui/system";
import EmployeeListing from "@src/components/common/presentational/employee/employee-listing";
import HeadBar from "@src/components/common/smart/dashboard/headbar/HeadBar";
import { useGetEmployeesQuery } from "@src/store/reducers/employees-api";

const Employee = () => {
  const { data, isSuccess } = useGetEmployeesQuery();
  return (
    <Box>
      {isSuccess ? (
        <>
          <HeadBar />
          <div>{data.map((item) => item.name)}</div>
          {/* <EmployeeBio />
      <EmployeeDetails /> */}
          <EmployeeListing />
        </>
      ) : (
        ""
      )}
    </Box>
  );
};
export default Employee;
