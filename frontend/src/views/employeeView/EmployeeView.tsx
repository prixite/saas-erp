import EmployeeSection from "@src/components/common/smart/employeeSection/EmployeeSection";
import { useApiMeRetrieveQuery } from "@src/store/reducers/generated";
import { useEffect } from "react";
function EmployeeView() {
  const data = useApiMeRetrieveQuery();
  useEffect(() => {
    console.log("data", data);
  }, [data]);

  return <EmployeeSection />;
}

export default EmployeeView;
