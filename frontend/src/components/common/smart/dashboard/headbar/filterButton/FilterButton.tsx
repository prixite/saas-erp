import { useState } from "react";
import { Button, Box } from "@mui/material";
import FilterIcon from "@src/assets/svgs/filterButtonIcon.svg";
import FilterModal from "@src/components/shared/popUps/filterModal/filterModal";
import { LocalizationInterface } from "@src/helpers/interfaces/localizationinterfaces";
import { localizedData } from "@src/helpers/utils/language";

function FilterButton() {
  const constantData: LocalizationInterface = localizedData();
  const [openModal, setOpenModal] = useState(false);
  const { filterButton } = constantData.Buttons;
  const handleModalOpen = () => {
    setOpenModal(true);
  };
  const handleModalClose = () => {
    setOpenModal(false);
  };
  return (
    <Box>
      <Button
        className="filter-btn"
        id="filter-btn-id"
        variant="outlined"
        startIcon={
          <img className="profile-pic" src={FilterIcon} alt="profile pic" />
        }
        onClick={handleModalOpen}
      >
        {" "}
        <p>{filterButton}</p>
      </Button>
      <FilterModal open={openModal} handleClose={handleModalClose} />
    </Box>
  );
}
export default FilterButton;
