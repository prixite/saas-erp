import { Grid } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import "@src/components/shared/loaders/dashboardSkeleton/dashboardSkeleton.scss";

export default function DashboardSkeleton() {
  return (
    <Grid
      container
      rowSpacing={2}
      columnSpacing={2}
      sm={12}
      md={12}
      lg={12}
      xl={12}
      className={`dashboardSkeleton`}
    >
      <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
        <Skeleton
          animation="wave"
          variant="rectangular"
          width={"100%"}
          height={242}
          sx={{
            backgroundColor: "#FFCDCD",
            opacity: 0.2,
            borderRadius: "12px",
          }}
        />
      </Grid>
      <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
        <Skeleton
          animation="wave"
          variant="rectangular"
          width={"100%"}
          height={242}
          sx={{
            backgroundColor: "#FFCDCD",
            opacity: 0.2,
            borderRadius: "12px",
          }}
        />
      </Grid>
      <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
        <Skeleton
          animation="wave"
          variant="rectangular"
          width={"100%"}
          height={242}
          sx={{
            backgroundColor: "#FFCDCD",
            opacity: 0.2,
            borderRadius: "12px",
          }}
        />
      </Grid>
      <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
        <Skeleton
          animation="wave"
          variant="rectangular"
          width={"100%"}
          height={242}
          sx={{
            backgroundColor: "#FFCDCD",
            opacity: 0.2,
            borderRadius: "12px",
          }}
        />
      </Grid>
      <Grid item xs={8} sm={8} md={8} lg={8} xl={8}>
        <Skeleton
          animation="wave"
          variant="rectangular"
          width={"100%"}
          height={605}
          sx={{
            backgroundColor: "#FFCDCD",
            opacity: 0.2,
            borderRadius: "12px",
          }}
        />
      </Grid>
      <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
        <Skeleton
          animation="wave"
          variant="rectangular"
          width={"100%"}
          height={605}
          sx={{
            backgroundColor: "#FFCDCD",
            opacity: 0.2,
            borderRadius: "12px",
          }}
        />
      </Grid>
    </Grid>
  );
}
