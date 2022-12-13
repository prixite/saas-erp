const deleteEmployeeService = async (rowCellId: number, deleteEmployee) => {
  await deleteEmployee({
    id: rowCellId,
  }).unwrap();
};

export { deleteEmployeeService };
