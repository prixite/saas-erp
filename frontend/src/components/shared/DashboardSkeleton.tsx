import Skeleton from '@mui/material/Skeleton';
import { Grid } from '@mui/material';

export default function DashboardSkeleton() {
  return (
      <Grid container rowSpacing={5} columnSpacing={2} xs={12} sm={12} md={12} lg={12} xl={12}>
            <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                <Skeleton animation="wave" variant="rectangular" width={'100%'} height={242} />
            </Grid>
            <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                <Skeleton animation="wave" variant="rectangular" width={'100%'} height={242} />
            </Grid>
            <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                <Skeleton animation="wave" variant="rectangular" width={'100%'} height={242} />
            </Grid>
            <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                <Skeleton animation="wave" variant="rectangular" width={'100%'} height={242} />
            </Grid>
            <Grid item xs={8} sm={8} md={8} lg={8} xl={8}>
                <Skeleton animation="wave" variant="rectangular" width={'100%'} height={605} />
            </Grid>
            <Grid  item xs={4} sm={4} md={4} lg={4} xl={4}>
                <Skeleton animation="wave" variant="rectangular" width={'100%'} height={605} />
            </Grid>
      </Grid>
  )
}