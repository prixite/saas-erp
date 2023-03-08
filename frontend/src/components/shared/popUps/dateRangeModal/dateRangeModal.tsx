import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";
import "@src/components/shared/popUps/dateRangeModal/dateRangeModal.scss";

interface Props {
  open: boolean;
  handleClose: () => void;
  setDate: (arg) => void;
  state: unknown;
}

const DateRangeModal = ({ open, handleClose, setDate, state }: Props) => {
  return (
    <>
      <Dialog open={open} onClose={handleClose} className="dateRangeModal">
        <DialogContent className="dateRangeModal__Content">
          <DateRangePicker
            onChange={(item) => setDate([item.selection])}
            showSelectionPreview={true}
            moveRangeOnFirstSelection={false}
            months={2}
            ranges={state}
            direction="horizontal"
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DateRangeModal;
