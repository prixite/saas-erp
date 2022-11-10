import { useState } from "react";
import { Button, Box } from "@mui/material";
import FilterModal from "@src/components/shared/popUps/filterModal/filterModal";
import { LocalizationInterface } from "@src/helpers/interfaces/localizationinterfaces";
import { localizedData } from "@src/helpers/utils/language";
import FilterIcon from "./FilterButtonSVG";

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
        startIcon={<FilterIcon />}
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
