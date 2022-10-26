import { Button } from "@mui/material";
import FilterIcon from "./FilterButtonSVG";

function FilterButton() {
  return (
    <>
      <Button
        className="filter-btn"
        id="filter-btn-id"
        variant="outlined"
        startIcon={<FilterIcon />}
      >
        {" "}
        <p>Filter</p>
      </Button>
    </>
  );
}
export default FilterButton;
