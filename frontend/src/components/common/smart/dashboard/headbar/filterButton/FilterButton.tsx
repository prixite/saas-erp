import TuneIcon from "@mui/icons-material/Tune";
import { Button } from "@mui/material";

function FilterButton() {
  return (
    <>
      <Button
        className="filter-btn"
        id="filter-btn-id"
        variant="outlined"
        startIcon={<TuneIcon />}
      >
        {" "}
        <p id="filter-btn-text">Filter</p>
      </Button>
    </>
  );
}
export default FilterButton;
