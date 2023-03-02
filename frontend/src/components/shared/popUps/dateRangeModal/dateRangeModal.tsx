import { useState } from "react";
import { LoadingButton } from "@mui/lab";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { addDays } from "date-fns";
import { DateRangePicker } from "react-date-range";
import submitIcon from "@src/assets/svgs/Frame.svg";
import "@src/components/shared/popUps/dateRangeModal/dateRangeModal.scss";
import { LocalizationInterface } from "@src/helpers/interfaces/localizationinterfaces";
import { localizedData } from "@src/helpers/utils/language";

interface Props {
  open: boolean;
  handleClose: () => void;
}

const DateRangeModal = ({ open, handleClose }: Props) => {
  const constantData: LocalizationInterface = localizedData();
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);

  const { cancelBtn, saveBtn } = constantData.Modals;
  return (
    <>
      <Dialog open={open} onClose={handleClose} className="dateRangeModal">
        <DialogContent className="dateRangeModal__Content">
          <DateRangePicker
            onChange={(item) => setState([item.selection])}
            showSelectionPreview={true}
            moveRangeOnFirstSelection={false}
            months={2}
            ranges={state}
            direction="horizontal"
          />
        </DialogContent>
        <DialogActions className="dateRangeModal__Actions">
          <Button className="resetBtn" onClick={handleClose}>
            {cancelBtn}
          </Button>
          <LoadingButton className="submitBtn">
            <span style={{ display: "flex" }}>
              {saveBtn}
              <span>
                {" "}
                <img className="submit-img" src={submitIcon} alt="submit" />
              </span>{" "}
            </span>
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DateRangeModal;
