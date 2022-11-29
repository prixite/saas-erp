import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import "./employeeButtons.scss";
import { styled } from "@mui/material/styles";
import MuiToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { LocalizationInterface } from "@src/helpers/interfaces/localizationinterfaces";
import { localizedData } from "@src/helpers/utils/language";

interface EmployeeButtonType {
  setButtonNameClicked: React.Dispatch<React.SetStateAction<string>>;
}

interface toggleButtonType {
  selectedcolor: string;
}
const ToggleButton = styled(MuiToggleButton)(
  ({ selectedcolor }: toggleButtonType) => ({
    "&.Mui-selected, &.Mui-selected:hover": {
      color: "white",
      backgroundColor: selectedcolor,
    },
  })
);

function EmployeeButtons({ setButtonNameClicked }: EmployeeButtonType) {
  const constantData: LocalizationInterface = localizedData();
  const { basicBtn, docsBtn, compBtn } = constantData.EmployeeButtons;

  const [alignment, setAlignment] = useState<string | null>("left");

  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string | null
  ) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };

  useEffect(() => {
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
            selectedcolor="red"
            className="button-Basic"
            style={{ borderRadius: "12px", marginRight: "12px" }}
          >
            <span
              className="button-Basic__text"
              style={{ color: `${alignment === "left" ? "white" : "black"}` }}
            >
              {basicBtn}
            </span>
          </ToggleButton>

          <ToggleButton
            value="center"
            selectedcolor="red"
            style={{ borderRadius: "12px", marginRight: "12px" }}
            className="button-Docs"
          >
            <span
              className="button-Docs__text"
              style={{ color: `${alignment === "center" ? "white" : "black"}` }}
            >
              {docsBtn}
            </span>
          </ToggleButton>

          <ToggleButton
            value="right"
            selectedcolor="red"
            style={{ borderRadius: "12px" }}
            className="button-Comp"
          >
            <span
              className="button-Comp__text"
              style={{ color: `${alignment === "right" ? "white" : "black"}` }}
            >
              {compBtn}
            </span>
          </ToggleButton>
        </ToggleButtonGroup>
      </Grid>
    </>
  );
}

export default EmployeeButtons;
