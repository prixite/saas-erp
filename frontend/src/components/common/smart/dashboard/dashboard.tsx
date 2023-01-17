import { Typography, Box, Grid } from "@mui/material";
import AttendanceSummary from "@src/components/common/presentational/attendanceSummary/attendanceSummary";
import CheckingTime from "@src/components/common/presentational/checkingTime/checkingTime";
import LeaveRequests from "@src/components/common/presentational/leaveRequests/leaveRequests";
import { LocalizationInterface } from "@src/helpers/interfaces/localizationinterfaces";
import { localizedData } from "@src/helpers/utils/language";

const Dashboard = () => {
  const constantData: LocalizationInterface = localizedData();
  const { dashboardHeading } = constantData.Dashboard;
  return (
    <Box sx={{ mt: "25px" }}>
      <Typography variant="h1">{dashboardHeading}</Typography>
      <AttendanceSummary />
      <Grid
        container
        className="dashboard-bottom"
        sx={{ mt: "22px" }}
        spacing={2}
      >
        <Grid item xs={8}>
          <LeaveRequests />
        </Grid>
        <Grid item xs={4}>
          <CheckingTime />
        </Grid>
      </Grid>
      {/* <DashboardSkeleton />
      <RowSkeletonCard /> */}
      {/* To Test Display Skeleton! */}
      {/* <DashboardSkeleton /> */}
    </Box>
  );
};
export default Dashboard;
