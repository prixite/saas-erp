import { Grid, Skeleton } from "@mui/material";
import "@src/components/shared/loaders/dashboardSkeleton/mobileDashboardSkeleton.scss";

function MobileDashboardSkeleton() {
  return (
    <Grid
      container
      rowSpacing={2}
      columnSpacing={2}
      sm={12}
      md={12}
      className="dashboardSkeleton"
      mt={1}
    >
      {new Array(7).fill(0).map((_, index) => (
        <Grid key={index} item xs={12} sm={12} md={12}>
          <Skeleton
            animation="wave"
            variant="rectangular"
            width={"100%"}
            height={142}
            sx={{
              backgroundColor: "#FFCDCD",
              opacity: 0.2,
              borderRadius: "12px",
            }}
          />
        </Grid>
      ))}
    </Grid>
  );
}

export default MobileDashboardSkeleton;
