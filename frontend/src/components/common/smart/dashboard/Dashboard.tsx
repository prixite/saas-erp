import HeadBar from "@src/components/common/smart/dashboard/headbar/HeadBar";
import DataGridTable from "@src/components/shared/dataGrid/DataGridTable";
import Layout from "@src/components/shared/layout";
import DashboardSkeleton from "@src/components/shared/loaders/dashboardSkeleton/dashboardSkeleton";
import RowSkeletonCard from "@src/components/shared/loaders/rowSkeletonCard/rowSkeletonCard";

import { useGetEmployeesQuery } from "@src/store/reducers/employees-api";

const Dashboard = () => {
  const { data, isSuccess } = useGetEmployeesQuery();
  return (
    <Layout>
      {isSuccess ? (
        <>
          <HeadBar />
          <DataGridTable />
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
    </Layout>
  );
};
export default Dashboard;
