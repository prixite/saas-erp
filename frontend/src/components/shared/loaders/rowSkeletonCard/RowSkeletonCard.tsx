import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import "@src/components/shared/loaders/rowSkeletonCard/rowSkeletonCard.scss";

interface Props {
  pathString?: string;
}

function RowSkeletonCard({ pathString }: Props) {
  return (
    <>
      {pathString === "leaves" || pathString === "attendance"
        ? new Array(3).fill(0).map((_, index) => (
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
          ))
        : new Array(20).fill(0).map((_, index) => (
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
