import Layout from "@src/components/shared/layout";
import { useGetEmployeesQuery } from "@src/services/employees-api";

const Dashboard = () => {
  const { data, isLoading, error, isFetching, isSuccess } =
    useGetEmployeesQuery();
  return (
    <Layout>
      {isLoading && <h2>Loading..........</h2>}
      {isFetching && <h2>Fetching..........</h2>}
      {error && <h2>something went wrong..........</h2>}
      {isSuccess && <div>{data.map((item) => item.name)}</div>}
    </Layout>
  );
};
export default Dashboard;
