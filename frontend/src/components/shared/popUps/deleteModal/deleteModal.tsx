import { Box, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { useNavigate } from "react-router-dom";
import deleteIcon from "@src/assets/svgs/delete.svg";
import { LocalizationInterface } from "@src/helpers/interfaces/localizationinterfaces";
import { localizedData } from "@src/helpers/utils/language";
import "@src/components/shared/popUps/deleteModal/deleteModal.scss";

interface Props {
  open: boolean;
  handleClose: () => void;
}

const DeleteModal = ({ open, handleClose }: Props) => {
  const constantData: LocalizationInterface = localizedData();
  const navigate = useNavigate();
  const { wantToDelete, yes, no } = constantData.Modals;

  const moveToListing = () => {
    navigate("/employees");
    handleClose();
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose} className="DeleteModal">
        <DialogContent className="DeleteModal__Content">
          <Box className="content-cls">
            <img className="hey-img" src={deleteIcon} alt="delete" />
            <Typography className="want-to-delete">{wantToDelete}</Typography>
          </Box>
        </DialogContent>
        <DialogActions className="DeleteModal__Actions">
          <>
            <Button
              onClick={moveToListing}
              className="resetBtn"
              sx={{ ml: "12px !important" }}
            >
              {no}
            </Button>
            <Button
              onClick={moveToListing}
              className="submitBtn"
              sx={{ ml: "12px !important" }}
            >
              {yes}
            </Button>
          </>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteModal;
