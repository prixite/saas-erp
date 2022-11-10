import { Button } from "@mui/material";
import FilterIcon from "@src/assets/svgs/filterButtonIcon.svg";
import { LocalizationInterface } from "@src/helpers/interfaces/localizationinterfaces";
import { localizedData } from "@src/helpers/utils/language";

function FilterButton() {
  const constantData: LocalizationInterface = localizedData();
  const { filterButton } = constantData.Buttons;
  return (
    <>
      <Button
        className="filter-btn"
        id="filter-btn-id"
        variant="outlined"
        startIcon={
          <img className="profile-pic" src={FilterIcon} alt="profile pic" />
        }
      >
        {" "}
        <p>{filterButton}</p>
      </Button>
    </>
  );
}
export default FilterButton;
