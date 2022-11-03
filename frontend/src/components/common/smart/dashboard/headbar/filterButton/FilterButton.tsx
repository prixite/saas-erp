import { Button } from "@mui/material";
import { LocalizationInterface } from "@src/helpers/interfaces/localizationinterfaces";
import { localizedData } from "@src/helpers/utils/language";
import FilterIcon from "./FilterButtonSVG";

function FilterButton() {
  const constantData: LocalizationInterface = localizedData();
  const { filterButton } = constantData.Buttons;
  return (
    <>
      <Button
        className="filter-btn"
        id="filter-btn-id"
        variant="outlined"
        startIcon={<FilterIcon />}
      >
        {" "}
        <p>{filterButton}</p>
      </Button>
    </>
  );
}
export default FilterButton;
