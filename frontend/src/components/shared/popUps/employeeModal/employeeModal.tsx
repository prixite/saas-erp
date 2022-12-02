import { useState } from "react";
import { Box, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import crossIcon from "@src/assets/svgs/cross.svg";
import "@src/components/shared/popUps/employeeModal/employeeModal.scss";
import submitIcon from "@src/assets/svgs/Frame.svg";
import lineIcon from "@src/assets/svgs/line.svg";
import lineredIcon from "@src/assets/svgs/linered.svg";
import PageOne from "@src/components/shared/popUps/employeeModal/pageOne";
import PageThree from "@src/components/shared/popUps/employeeModal/pageThree";
import PageTwo from "@src/components/shared/popUps/employeeModal/pageTwo";
import { LocalizationInterface } from "@src/helpers/interfaces/localizationinterfaces";
import { localizedData } from "@src/helpers/utils/language";

interface Props {
  open: boolean;
  handleClose: () => void;
}

const EmployeeModal = ({ open, handleClose }: Props) => {
  const constantData: LocalizationInterface = localizedData();
  const {
    createEmployeeHeading,
    createEmployeeSubheading,
    createEmployeeClose,
    createEmployeeNext,
    stepOne,
    stepTwo,
    stepThree,
    basicInformation,
    experience,
    education,
  } = constantData.Modals;
  const [page, setPage] = useState("1");

  const moveToNextPage = () => {
    if (page == "1") {
      setPage("2");
    } else if (page === "2") {
      setPage("3");
    } else {
      setPage("1");
    }
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose} className="EmployeeModal">
        <DialogTitle>
          <Box className="modal-header-cls">
            <Box className="heading-text-box">
              <Typography className="heading-text">
                {createEmployeeHeading}
              </Typography>
              <Typography className="subheading-text">
                {createEmployeeSubheading}
              </Typography>
            </Box>
            <Box className="cross-icon-box" onClick={handleClose}>
              <img src={crossIcon} className="cross-btn" />
            </Box>
          </Box>
          <Box className="steps-btns-cls">
            <Box className="step-box">
              <Typography
                style={{ color: page === "1" ? "black" : "#6C6C6C" }}
                className="step-cls"
              >
                {stepOne}
              </Typography>
              <Typography
                style={{ color: page === "1" ? "black" : "#6C6C6C" }}
                className="step-value-cls"
              >
                {basicInformation}
              </Typography>
              <img
                className="divider-cls"
                src={page === "1" ? lineredIcon : lineIcon}
                alt="line"
              />
            </Box>
            <Box className="step-box">
              <Typography
                style={{ color: page === "2" ? "black" : "#6C6C6C" }}
                className="step-cls"
              >
                {stepTwo}
              </Typography>
              <Typography
                style={{ color: page === "2" ? "black" : "#6C6C6C" }}
                className="step-value-cls"
              >
                {experience}
              </Typography>
              <img
                className="divider-cls"
                src={page === "2" ? lineredIcon : lineIcon}
                alt="line"
              />
            </Box>
            <Box className="step-box">
              <Typography
                style={{ color: page === "3" ? "black" : "#6C6C6C" }}
                className="step-cls"
              >
                {stepThree}
              </Typography>
              <Typography
                style={{ color: page === "3" ? "black" : "#6C6C6C" }}
                className="step-value-cls"
              >
                {education}
              </Typography>
              <img
                className="divider-cls"
                src={page === "3" ? lineredIcon : lineIcon}
                alt="line"
              />
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent className="FilterModal__Content">
          <Box className="content-cls">
            {page === "1" ? (
              <PageOne />
            ) : page === "2" ? (
              <PageTwo />
            ) : (
              <PageThree />
            )}
          </Box>
        </DialogContent>
        <DialogActions className="EmployeeModal__Actions">
          <Button className="resetBtn" onClick={handleClose}>
            <span>
              {" "}
              <img className="reset-img" src={crossIcon} alt="reset" />
            </span>{" "}
            {createEmployeeClose}
          </Button>
          <Button onClick={moveToNextPage} className="submitBtn">
            {createEmployeeNext}
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

export default EmployeeModal;
