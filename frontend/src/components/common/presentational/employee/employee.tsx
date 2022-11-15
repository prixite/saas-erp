import { Box } from "@mui/system";
import DataGridTable from "@src/components/common/presentational/dataGridTable/DataGridTable";
import HeadBar from "@src/components/common/smart/dashboard/headbar/HeadBar";

const Employee = () => {
  return (
    <Box>
      <>
        <HeadBar />
        <DataGridTable />
      </>
    </Box>
  );
};
export default Employee;
