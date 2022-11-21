import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import AdditionalInformation from "@src/components/common/presentational/additionalInformation/AdditionalInformation";
import BenefitsSection from "@src/components/common/presentational/benefitsSection/benefitsSection";
import DocumentSection from "@src/components/common/presentational/documentSection/documentSection";
import Education from "@src/components/common/presentational/education/Education";
import EmployeeButtons from "@src/components/common/presentational/employeeButtons/EmployeeButtons";
import EmployeeHeader from "@src/components/common/presentational/employeeHeader/EmployeeHeader";
import Experience from "@src/components/common/presentational/experience/Experience";
import { useGetEmployeeDataQuery } from "@src/store/reducers/employees-api";

function EmployeeSection() {
  const param = useParams();
  const [paramValue, setParamValue] = useState<number>(0);
  const { data: EmployeeData, isLoading } = useGetEmployeeDataQuery({
    id: paramValue,
  });
  useEffect(() => {
    if (param && param.employeeId !== undefined) {
      setParamValue(parseInt(param.employeeId));
    }
  }, [paramValue]);
  const [buttonNameClicked, setButtonNameClicked] = useState<string>("BASIC");
  return (
    <>
      <EmployeeHeader isLoading={isLoading} employeeData={EmployeeData} />
      <EmployeeButtons setButtonNameClicked={setButtonNameClicked} />
      {buttonNameClicked === "BASIC" ? (
        <Grid>
          <AdditionalInformation employeeData={EmployeeData} />
          <Experience isLoading={isLoading} employeeData={EmployeeData} />
          <Education isLoading={isLoading} employeeData={EmployeeData} />
        </Grid>
      ) : buttonNameClicked === "DOCS" ? (
        <DocumentSection />
      ) : buttonNameClicked === "COMP" ? (
        <BenefitsSection />
      ) : (
        ""
      )}
    </>
  );
}

export default EmployeeSection;
