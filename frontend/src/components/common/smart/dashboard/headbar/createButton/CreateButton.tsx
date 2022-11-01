import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import { LocalizationInterface } from "@src/helpers/interfaces/localizationinterfaces";
import { localizedData } from "@src/helpers/utils/language";

function CreateButton() {
  const constantData: LocalizationInterface = localizedData();
  const { createButton } = constantData.Buttons;
  return (
    <>
      <Button
        variant="outlined"
        className="create-btn"
        style={{ borderRadius: "12px" }}
        startIcon={<AddIcon />}
      >
        {" "}
        <p id="create-btn-text">{createButton}</p>
      </Button>
    </>
  );
}
export default CreateButton;
