import { useState } from "react";
import { Grid } from "@mui/material";
import DocumentSection from "@src/components/common/presentational/documentSection/documentSection";
import EmployeeButtons from "@src/components/common/presentational/employeeButtons/EmployeeButtons";
import EmployeeHeader from "@src/components/common/presentational/employeeHeader/EmployeeHeader";
import AdditionalInformation from "../../presentational/additionalInformation/AdditionalInformation";
import Education from "../../presentational/education/Education";
import Experience from "../../presentational/experience/Experience";

function EmployeeSection() {
  const [buttonNameClicked, setButtonNameClicked] = useState<string>("BASIC");
  return (
    <>
      {/* <h1>EmployeeSection</h1> */}
      <EmployeeHeader />
      <EmployeeButtons setButtonNameClicked={setButtonNameClicked} />
      {buttonNameClicked === "BASIC" ? (
        <Grid xs={12} sm={12}>
          <AdditionalInformation />
          <Experience />
          <Education />
        </Grid>
      ) : buttonNameClicked === "DOCS" ? (
        <DocumentSection />
      ) : buttonNameClicked === "COMP" ? (
        <h1>COMP</h1>
      ) : (
        ""
      )}
    </>
  );
}

export default EmployeeSection;
