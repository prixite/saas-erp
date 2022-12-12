import { toast } from "react-toastify";
import { timeOut } from "@src/helpers/constants/constants";
import { EmployeeData } from "@src/helpers/interfaces/employees-modal";

const deleteEmployeeService = async (rowCellId: number, deleteEmployee) => {
  await deleteEmployee({
    id: rowCellId,
  }).unwrap();
};
const addNewEmployeeService = async (
  employeeObject: EmployeeData[],
  createEmployee
) => {
  await createEmployee(employeeObject)
    .unwrap()
    .then(async () => {
      toast.success("New Employee Added.", {
        autoClose: timeOut,
        pauseOnHover: false,
      });
    });
};

export { deleteEmployeeService, addNewEmployeeService };
