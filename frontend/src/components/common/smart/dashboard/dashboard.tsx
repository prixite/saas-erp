import { Typography, Box } from "@mui/material";
import DataGridTable from "@src/components/shared/dataGrid/DataGridTable";

const Dashboard = () => {
  return (
    <Box>
      <Typography variant="h1">Dashboard</Typography>
      <DataGridTable />
    </Box>
  );
};
export default Dashboard;
