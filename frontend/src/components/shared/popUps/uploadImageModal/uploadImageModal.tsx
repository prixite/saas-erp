import { Box, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import crossIcon from "@src/assets/svgs/cross.svg";
import groupIcon from "@src/assets/svgs/group.svg";
import "@src/components/shared/popUps/uploadImageModal/uploadImageModal.scss";
import { LocalizationInterface } from "@src/helpers/interfaces/localizationinterfaces";
import { localizedData } from "@src/helpers/utils/language";

interface Props {
  open: boolean;
  handleClose: () => void;
}
const UploadImageModal = ({ open, handleClose }: Props) => {
  const constantData: LocalizationInterface = localizedData();
  const { uploadImage, dragToAdjust, saveChanges } = constantData.Modals;
  return (
    <Box>
      <Dialog open={open} onClose={handleClose} className="UploadImageModal">
        <DialogTitle>
          <Box className="modal-header-cls">
            <Box className="heading-text-box">
              <Typography className="heading-text">{uploadImage}</Typography>
              <Typography className="subheading-text">
                {dragToAdjust}
              </Typography>
            </Box>
            <Box className="cross-icon-box" onClick={handleClose}>
              <img src={crossIcon} className="cross-btn" />
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent className="UploadImageModal__Content">
          <Box className="content-cls">
            <img src={groupIcon} className="group-btn" />
          </Box>
        </DialogContent>
        <DialogActions className="UploadImageModal__Actions">
          <Button className="saveBtn">{saveChanges}</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UploadImageModal;
