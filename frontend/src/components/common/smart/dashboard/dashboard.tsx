import { Typography, Box } from "@mui/material";
import DashboardSkeleton from "@src/components/shared/loaders/dashboardSkeleton/dashboardSkeleton";
import RowSkeletonCard from "@src/components/shared/loaders/rowSkeletonCard/rowSkeletonCard";

const Dashboard = () => {
  return (
    <Box>
      <Typography variant="h1">Dashboard</Typography>
      <DashboardSkeleton />
      <RowSkeletonCard />
      {/* To Test Display Skeleton! */}
      {/* <DashboardSkeleton /> */}
    </Box>
  );
};
export default Dashboard;
