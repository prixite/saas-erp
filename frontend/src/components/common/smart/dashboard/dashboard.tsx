import DashboardSkeleton from "@src/components/shared/DashboardSkeleton";
import Layout from "@src/components/shared/layout";
import { useGetEmployeesQuery } from "@src/store/reducers/employees-api";

const Dashboard = () => {
  const { data, isSuccess } = useGetEmployeesQuery();
  return (
    <Layout>
      {isSuccess ? (
        <div>{data.map((item) => item.name)}</div>
      ) : (
        <DashboardSkeleton />
      )}
    </Layout>
  );
};
export default Dashboard;
