import { useEffect } from "react";
import EmployeeSection from "@src/components/common/smart/employeeSection/EmployeeSection";
import { useApiMeRetrieveQuery } from "@src/store/reducers/generated";
function EmployeeView() {
  const data = useApiMeRetrieveQuery();
  useEffect(() => {
    console.log("data", data);
  }, [data]);

  return <EmployeeSection />;
}

export default EmployeeView;
