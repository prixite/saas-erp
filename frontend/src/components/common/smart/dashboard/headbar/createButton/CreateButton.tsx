import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";

function CreateButton() {
  return (
    <>
      <Button
        variant="outlined"
        className="create-btn"
        style={{ borderRadius: "12px" }}
        startIcon={<AddIcon />}
      >
        {" "}
        <p id="create-btn-text">Create</p>
      </Button>
    </>
  );
}
export default CreateButton;
