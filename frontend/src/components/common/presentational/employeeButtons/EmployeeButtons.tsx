import { Button, Grid } from "@mui/material";
import "./employeeButtons.scss";

interface EmployeeButtonType {
  setButtonNameClicked: React.Dispatch<React.SetStateAction<string>>;
}
function EmployeeButtons({ setButtonNameClicked }: EmployeeButtonType) {
  const BasicInformationHandler = () => {
    setButtonNameClicked("BASIC");
  };
  const DocumentsHandler = () => {
    setButtonNameClicked("DOCS");
  };
  const CompensationBenefitsHandler = () => {
    setButtonNameClicked("COMP");
  };
  return (
    <>
      {/* // <div>EmployeeButtons</div> */}
      <Grid container className="employeeButton-main">
        <Grid item className="button-container-one">
          <Button
            className="buttonOne"
            variant="contained"
            color="secondary"
            //   startIcon={<DeleteIcon />}
            onClick={BasicInformationHandler}
          >
            <p className="buttone-one-text">Basic Information </p>
          </Button>
        </Grid>

        <Grid item className="button-container-two">
          <Button
            className="buttonTwo"
            variant="contained"
            color="secondary"
            //   startIcon={<DeleteIcon />}
            onClick={DocumentsHandler}
          >
            <p className="buttone-two-text">Documents </p>
          </Button>
        </Grid>

        <Grid item className="button-container-three">
          <Button
            className="buttonThree"
            variant="contained"
            color="secondary"
            //   startIcon={<DeleteIcon />}
            onClick={CompensationBenefitsHandler}
          >
            <p className="buttone-three-text">Compensation and benefits </p>
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

export default EmployeeButtons;
