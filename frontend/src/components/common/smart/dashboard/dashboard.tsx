import { Typography, Box } from "@mui/material";
import HeadBar from "@src/components/common/smart/dashboard/headbar/HeadBar";
import DashboardSkeleton from "@src/components/shared/loaders/dashboardSkeleton/dashboardSkeleton";
import RowSkeletonCard from "@src/components/shared/loaders/rowSkeletonCard/rowSkeletonCard";

import { useGetEmployeesQuery } from "@src/store/reducers/employees-api";

const Dashboard = () => {
  const { data, isSuccess } = useGetEmployeesQuery();
  return (
    <Box>
      <Typography variant="h1">Dashboard</Typography>
      {isSuccess ? (
        <>
          <HeadBar />
          <div>{data.map((item) => item.name)}</div>
        </>
      ) : (
        <>
          <DashboardSkeleton />
          <RowSkeletonCard />
        </>
      )}
      {/* To Test Display Skeleton! */}
      {/* <DashboardSkeleton /> */}
    </Box>
  );
};
export default Dashboard;
