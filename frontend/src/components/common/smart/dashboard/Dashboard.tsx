import Layout from "@src/components/shared/layout";
import DashboardSkeleton from "@src/components/shared/loaders/dashboardSkeleton/DashboardSkeleton";
import RowSkeletonCard from "@src/components/shared/loaders/rowSkeletonCard/RowSkeletonCard";

import { useGetEmployeesQuery } from "@src/store/reducers/employees-api";

const Dashboard = () => {
  const { data, isSuccess } = useGetEmployeesQuery();
  return (
    <Layout>
      {isSuccess ? (
        <div>{data.map((item) => item.name)}</div>
      ) : (
        <>
          <DashboardSkeleton />
        </>
      )}
      {/* To Test Display Skeleton! */}
      {/* <DashboardSkeleton /> */}
      {new Array(20).fill(0).map((_, index) => (
        <RowSkeletonCard key={index} />
      ))}
    </Layout>
  );
};
export default Dashboard;
