import { useState } from "react";
import { Box, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slider from "@mui/material/Slider";
import TextField from "@mui/material/TextField";
import crossIcon from "@src/assets/svgs/cross.svg";
import "@src/components/shared/popUps/filterModal/filterModal.scss";
import submitIcon from "@src/assets/svgs/Frame.svg";
import resetIcon from "@src/assets/svgs/reset.svg";
import { LocalizationInterface } from "@src/helpers/interfaces/localizationinterfaces";
import { localizedData } from "@src/helpers/utils/language";

interface Props {
  open: boolean;
  handleClose: () => void;
}

function valuetext(value: number) {
  return `${value}°C`;
}

const FilterModal = ({ open, handleClose }: Props) => {
  const constantData: LocalizationInterface = localizedData();
  const {
    filterHeading,
    filterSubheading,
    filterSalaryHeading,
    filterResetBtn,
    filterSubmitBtn,
    filterNameLabel,
    filterDesignationLabel,
  } = constantData.Modals;
  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  const [nameError, setNameError] = useState("");
  const [designationErrror, setDesignationError] = useState("");
  const [value, setValue] = useState<number[]>([50, 80]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length) {
      setNameError("");
    }
    setName(e.target?.value);
  };
  const handleDesignation = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length) {
      setDesignationError("");
    }
    setDesignation(e.target?.value);
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose} className="FilterModal">
        <DialogTitle>
          <Box className="modal-header-cls">
            <Box className="heading-text-box">
              <Typography className="heading-text">{filterHeading}</Typography>
              <Typography className="subheading-text">
                {filterSubheading}
              </Typography>
            </Box>
            <Box className="cross-icon-box" onClick={handleClose}>
              <img src={crossIcon} className="cross-btn" />
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent className="FilterModal__Content">
          <Box className="fields-cls">
            <TextField
              margin="normal"
              className="text-field-cls"
              required
              fullWidth
              name="Name"
              label={filterNameLabel}
              onChange={handleName}
              value={name}
              autoComplete="family-name"
              InputLabelProps={{ className: "textfield_label" }}
            />
            <p className="errorText">{nameError}</p>
            <TextField
              margin="normal"
              className="text-field-cls"
              required
              fullWidth
              label={filterDesignationLabel}
              name="Designation"
              onChange={handleDesignation}
              value={designation}
              autoComplete="family-name"
              InputLabelProps={{ className: "textfield_label" }}
            />
            <p className="errorText">{designationErrror}</p>
          </Box>
          <Box className="salary-range-box">
            <Typography className="salary-range-text">
              {filterSalaryHeading}
            </Typography>
            <Slider
              getAriaLabel={() => "Temperature range"}
              value={value}
              onChange={handleChange}
              size="medium"
              valueLabelDisplay="on"
              getAriaValueText={valuetext}
            />
          </Box>
        </DialogContent>
        <DialogActions className="FilterModal__Actions">
          <Button className="resetBtn" onClick={handleClose}>
            <span>
              {" "}
              <img className="reset-img" src={resetIcon} alt="reset" />
            </span>{" "}
            {filterResetBtn}
          </Button>
          <Button className="submitBtn">
            {filterSubmitBtn}
            <span>
              {" "}
              <img className="submit-img" src={submitIcon} alt="submit" />
            </span>{" "}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default FilterModal;
