import { Box, Stack, Typography } from "@mui/material";
import "@src/components/common/presentational/leavesCountBar/leavesCountBar.scss";
const LeavesCountBar = () => {
  return (
    <Stack className="stack-cls" direction="row" spacing={1}>
      <Box className="leave-cls">
        <Typography className="title-cls">Annual Leaves</Typography>
        <Typography className="value-cls">12/14</Typography>
      </Box>
      <Box className="leave-cls">
        <Typography className="title-cls">Causal Leaves</Typography>
        <Typography className="value-cls">12/14</Typography>
      </Box>
      <Box className="leave-cls">
        <Typography className="title-cls">Sick Leaves</Typography>
        <Typography className="value-cls">12/14</Typography>
      </Box>
    </Stack>
  );
};

export default LeavesCountBar;
