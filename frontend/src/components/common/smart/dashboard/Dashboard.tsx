import Layout from "@src/components/shared/layout";
import DashboardSkeleton from "@src/components/shared/loaders/DashboardSkeleton";
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
    </Layout>
  );
};
export default Dashboard;
