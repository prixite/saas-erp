import EmployeeButtons from "@src/components/common/presentational/employeeButtons/EmployeeButtons";
import EmployeeHeader from "@src/components/common/presentational/employeeHeader/EmployeeHeader";
import AdditionalInformation from "../../presentational/additionalInformation/AdditionalInformation";
import Education from "../../presentational/education/Education";
import Experience from "../../presentational/experience/Experience";

function EmployeeSection() {
  return (
    <>
      {/* <h1>EmployeeSection</h1> */}
      <EmployeeHeader />
      <EmployeeButtons />
      <AdditionalInformation />
      <Experience />
      <Education />
    </>
  );
}

export default EmployeeSection;
