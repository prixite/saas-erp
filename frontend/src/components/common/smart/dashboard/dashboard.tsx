import { Typography, Box } from "@mui/material";
import useWindowSize from "@src/components/shared/custom-hooks/useWindowSize";
import DashboardSkeleton from "@src/components/shared/loaders/dashboardSkeleton/DashboardSkeleton";
import MobileDashboardSkeleton from "@src/components/shared/loaders/dashboardSkeleton/MobileDashboardSkeleton";
import RowSkeletonCard from "@src/components/shared/loaders/rowSkeletonCard/RowSkeletonCard";
import { LocalizationInterface } from "@src/helpers/interfaces/localizationinterfaces";
import { localizedData } from "@src/helpers/utils/language";
import { mobileWidth } from "@src/helpers/utils/utils";

const Dashboard = () => {
  const [browserWidth] = useWindowSize();
  const constantData: LocalizationInterface = localizedData();
  const { dashboardHeading } = constantData.Dashboard;
  return (
    <Box>
      {browserWidth > mobileWidth ? (
        <>
          <Typography variant="h1">{dashboardHeading}</Typography>
          <DashboardSkeleton />
          <RowSkeletonCard />
        </>
      ) : (
        <>
          <MobileDashboardSkeleton />
        </>
      )}
    </Box>
  );
};
export default Dashboard;
