import { Box } from "@mui/system";
import HeadBar from "@src/components/common/smart/dashboard/headbar/HeadBar";
import DataGridTable from "@src/components/shared/dataGrid/DataGridTable";
import { useGetEmployeesQuery } from "@src/store/reducers/employees-api";

const Employee = () => {
  const { data, isSuccess } = useGetEmployeesQuery();
  return (
    <Box>
      {isSuccess ? (
        <>
          <HeadBar />
          <DataGridTable />
          <div>{data.map((item) => item.name)}</div>
          {/* <EmployeeBio />
            <EmployeeDetails />
           <EmployeeListing />  */}
        </>
      ) : (
        ""
      )}
    </Box>
  );
};
export default Employee;
