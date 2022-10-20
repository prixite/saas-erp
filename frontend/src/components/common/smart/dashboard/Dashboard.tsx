import Layout from "@src/components/shared/layout";
import { useGetEmployeesQuery } from "@src/store/reducers/employees-api";
import DashboardSkeleton from "./DashboardSkeleton";

const Dashboard = () => {
  const { data, isSuccess } = useGetEmployeesQuery();
  return (
    <Layout>
      {isSuccess ? (
        <div>{data.map((item) => item.name)}</div>
      ) : (
        <>{/* <DashboardSkeleton /> */}</>
      )}
      {/* Keeping the Skeleton Effect visible for now! */}
      <DashboardSkeleton />
    </Layout>
  );
};
export default Dashboard;
