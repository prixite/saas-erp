import { Typography, Box } from "@mui/material";
import Layout from "@src/components/shared/layout";
import DashboardSkeleton from "@src/components/shared/loaders/dashboardSkeleton/dashboardSkeleton";
import RowSkeletonCard from "@src/components/shared/loaders/rowSkeletonCard/rowSkeletonCard";

import { useGetEmployeesQuery } from "@src/store/reducers/employees-api";

const Dashboard = () => {
  const { data, isSuccess } = useGetEmployeesQuery();
  return (
    <Layout>
      <Box>
        <Typography variant="h1">Dashboard</Typography>
        {isSuccess ? (
          <div>{data.map((item) => item.name)}</div>
        ) : (
          <>
            <DashboardSkeleton />
            <RowSkeletonCard />
          </>
        )}
        {/* To Test Display Skeleton! */}
        {/* <DashboardSkeleton /> */}
      </Box>
    </Layout>
  );
};
export default Dashboard;
