import { Typography, Box } from "@mui/material";
import DashboardSkeleton from "@src/components/shared/loaders/dashboardSkeleton/DashboardSkeleton";
import RowSkeletonCard from "@src/components/shared/loaders/rowSkeletonCard/RowSkeletonCard";
import { LocalizationInterface } from "@src/helpers/interfaces/localizationinterfaces";
import { localizedData } from "@src/helpers/utils/language";

const Dashboard = () => {
  const constantData: LocalizationInterface = localizedData();
  const { dashboardHeading } = constantData.Dashboard;
  return (
    <Box>
      <Typography variant="h1">{dashboardHeading}</Typography>
      <DashboardSkeleton />
      <RowSkeletonCard />
      {/* To Test Display Skeleton! */}
      {/* <DashboardSkeleton /> */}
    </Box>
  );
};
export default Dashboard;
