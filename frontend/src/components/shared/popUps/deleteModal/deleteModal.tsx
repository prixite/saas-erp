import { Box, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import deleteIcon from "@src/assets/svgs/deleteone.svg";
import { LocalizationInterface } from "@src/helpers/interfaces/localizationinterfaces";
import { localizedData } from "@src/helpers/utils/language";
import "@src/components/shared/popUps/deleteModal/deleteModal.scss";

interface Props {
  open: boolean;
  handleClose: () => void;
  handleObjDelete: () => void;
}

const DeleteModal = ({ open, handleClose, handleObjDelete }: Props) => {
  const constantData: LocalizationInterface = localizedData();
  const { wantToDelete, yes, no } = constantData.Modals;

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
              onClick={handleClose}
              className="resetBtn"
              sx={{ ml: "12px !important" }}
            >
              {no}
            </Button>
            <Button
              onClick={handleObjDelete}
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
