import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

export default function Animations() {
  return (
    <Box sx={{ width: "100%" }}>
      <Skeleton animation="wave" height={50} />
    </Box>
  );
}
