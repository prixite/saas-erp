import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import "./rowSkeletonCard.scss";

function RowSkeletonCard() {
  return (
    <>
      {new Array(20).fill(0).map((_, index) => (
        <div className="row-skeleton" key={index}>
          <Box sx={{ width: "100%" }}>
            <Skeleton
              animation="wave"
              height={90}
              sx={{
                backgroundColor: "#FFCDCD",
                opacity: 0.2,
                borderRadius: "12px",
              }}
            />
          </Box>
        </div>
      ))}
    </>
  );
}
export default RowSkeletonCard;
