import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Button, Box } from "@mui/material";
import EmployeeModal from "@src/components/shared/popUps/employeeModal/employeeModal";
import { LocalizationInterface } from "@src/helpers/interfaces/localizationinterfaces";
import { localizedData } from "@src/helpers/utils/language";

function CreateButton() {
  const constantData: LocalizationInterface = localizedData();
  const [openModal, setOpenModal] = useState(false);
  const { createButton } = constantData.Buttons;
  const handleModalOpen = () => {
    setOpenModal(true);
  };
  const handleModalClose = () => {
    setOpenModal(false);
  };
  return (
    <Box>
      <Button
        variant="outlined"
        className="create-btn"
        style={{ borderRadius: "12px" }}
        startIcon={<AddIcon />}
        onClick={handleModalOpen}
      >
        {" "}
        <p id="create-btn-text">{createButton}</p>
      </Button>
      <EmployeeModal open={openModal} handleClose={handleModalClose} />
    </Box>
  );
}
export default CreateButton;
