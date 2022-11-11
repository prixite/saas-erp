import { Menu, MenuItem } from "@mui/material";
import deleteIcon from "@src/assets/svgs/Delete.svg";
import editIcon from "@src/assets/svgs/Edit.svg";
import { LocalizationInterface } from "@src/helpers/interfaces/localizationinterfaces";
import { localizedData } from "@src/helpers/utils/language";

interface Props {
  open: boolean;
  handleClose: () => void;
  anchorEl: null;
}

const MenuButtons = ({ open, handleClose, anchorEl }: Props) => {
  const constantData: LocalizationInterface = localizedData();
  const { editBtn, deleteBtn } = constantData.MenuButtons;

  return (
    <Menu
      PaperProps={{ sx: { width: "115px", height: "92px" } }}
      id="demo-positioned-menu"
      aria-labelledby="client-options-button"
      anchorEl={anchorEl}
      open={open}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      className="dropdownMenu"
      onClose={handleClose}
    >
      <MenuItem
        sx={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: "14px",
          fontWeight: "400",
        }}
        onClick={handleClose}
      >
        <img src={editIcon} alt="edit" />
        {editBtn}
      </MenuItem>
      <MenuItem
        sx={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: "14px",
          fontWeight: "400",
        }}
        onClick={handleClose}
      >
        <img src={deleteIcon} alt="delete" />
        {deleteBtn}
      </MenuItem>
    </Menu>
  );
};

export default MenuButtons;
