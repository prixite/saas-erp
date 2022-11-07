import { useMemo, useState } from "react";
import { Grid } from "@mui/material";
import "./employeeButtons.scss";
import { styled } from "@mui/material/styles";
import MuiToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
interface EmployeeButtonType {
  setButtonNameClicked: React.Dispatch<React.SetStateAction<string>>;
}

interface toggleButtonType {
  selectedColor: string;
}
const ToggleButton = styled(MuiToggleButton)(
  ({ selectedColor }: toggleButtonType) => ({
    "&.Mui-selected, &.Mui-selected:hover": {
      color: "white",
      backgroundColor: selectedColor,
    },
  })
);

function EmployeeButtons({ setButtonNameClicked }: EmployeeButtonType) {
  const [alignment, setAlignment] = useState<string | null>("left");

  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string | null
  ) => {
    setAlignment(newAlignment);
  };

  useMemo(() => {
    if (alignment === "left") {
      setButtonNameClicked("BASIC");
    } else if (alignment === "center") {
      setButtonNameClicked("DOCS");
    } else if (alignment === "right") {
      setButtonNameClicked("COMP");
    } else {
      setButtonNameClicked("BASIC");
    }
  }, [alignment]);

  return (
    <>
      <Grid container className="employeeButton-main">
        <ToggleButtonGroup
          value={alignment}
          exclusive
          onChange={handleAlignment}
          className="toggleGroup"
        >
          <ToggleButton
            value="left"
            selectedColor="red"
            className="buttonOne"
            style={{ borderRadius: "12px", marginRight: "12px" }}
          >
            <span
              className="button-one-text"
              style={{ color: `${alignment === "left" ? "white" : "black"}` }}
            >
              Basic Information
            </span>
          </ToggleButton>

          <ToggleButton
            value="center"
            selectedColor="red"
            style={{ borderRadius: "12px", marginRight: "12px" }}
            className="buttonTwo"
          >
            <span
              className="button-two-text"
              style={{ color: `${alignment === "center" ? "white" : "black"}` }}
            >
              Documents
            </span>
          </ToggleButton>

          <ToggleButton
            value="right"
            selectedColor="red"
            style={{ borderRadius: "12px" }}
            className="buttonThree"
          >
            <span
              className="button-three-text"
              style={{ color: `${alignment === "right" ? "white" : "black"}` }}
            >
              Compensation and benefits
            </span>
          </ToggleButton>
        </ToggleButtonGroup>
      </Grid>
    </>
  );
}

export default EmployeeButtons;
