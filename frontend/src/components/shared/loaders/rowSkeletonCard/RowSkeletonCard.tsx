import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import "./rowSkeletonCard.scss";

function RowSkeletonCard() {
  return (
    <div className="row-skeleton">
      <Box sx={{ width: "100%" }}>
        <Skeleton
          animation="wave"
          height={50}
          sx={{
            backgroundColor: "#FFCDCD",
            opacity: 0.2,
            borderRadius: "12px",
          }}
        />
      </Box>
    </div>
  );
}
export default RowSkeletonCard;
