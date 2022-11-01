import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
// import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
// import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Grid } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import EmployeeForm from "@src/components/common/presentational/employee/employee-form";
import Controls from "@src/components/shared/form-controls/Controls";
import PageHeader from "@src/components/shared/page-header";

const rows = [
  {
    id: 1,
    name: "Waqar",
    contact: "03465554403",
    joiningDate: "23-04-2022",
    Actions: "Edit | Delete",
  },
  {
    id: 2,
    name: "Umair",
    contact: "03465554403",
    joiningDate: "23-04-2022",
    Actions: "Edit | Delete",
  },
  {
    id: 3,
    name: "Hammad",
    contact: "03465554403",
    joiningDate: "23-04-2022",
    Actions: "Edit | Delete",
  },
  {
    id: 4,
    name: "Shafiq",
    contact: "03465554403",
    joiningDate: "23-04-2022",
    Actions: "Edit | Delete",
  },
  {
    id: 5,
    name: "Rabeel",
    contact: "03465554403",
    joiningDate: "23-04-2022",
    Actions: "Edit | Delete",
  },
  {
    id: 6,
    name: "Asfandiyar khan",
    contact: "03465554403",
    joiningDate: "23-04-2022",
    Actions: "Edit | Delete",
  },
  {
    id: 7,
    name: "Basit Ali",
    contact: "03465554403",
    joiningDate: "23-04-2022",
    Actions: "Edit | Delete",
  },
];

const columns = [
  { field: "id", headerName: "ID", width: 350 },
  { field: "name", headerName: "Name", width: 350 },
  { field: "contact", headerName: "Contact", width: 350 },
  { field: "joiningDate", headerName: "Joining Date", width: 350 },
  { field: "Actions", headerName: "Actions", width: 350 },
];

const EmployeeListing = () => {
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showListing, setShowListing] = useState(true);

  const addOrEdit = () => {
    if (recordForEdit === null) {
      //Do add operation
    } else {
      //Do edit/update operation
    }
  };
  return (
    <>
      <Grid></Grid>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <PageHeader
            title={
              showListing && showListing === true
                ? "Employee's Listing"
                : recordForEdit != null
                ? "Update Employee"
                : "Add Employee"
            }
            subTitle={
              showListing && showListing === true
                ? ""
                : recordForEdit != null
                ? "Fill the following fields to update an Employee"
                : "Fill the following fields to add an Employee"
            }
          />
        </Grid>
        {showListing === true && (
          <Grid item>
            <Controls.Button
              text="ADD EMPLOYEE"
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              // className={classes.addBtn}
              onClick={() => {
                setShowForm(true);
                setShowListing(false);
                setRecordForEdit(null);
              }}
            />
          </Grid>
        )}
      </Grid>

      {showListing && (
        <Grid
          container
          justifyContent="flex-start"
          alignItems="flex-start"
          style={{ marginTop: "20px" }}
        >
          <Grid item xs={12}>
            {showListing && (
              <>
                <DataGrid
                  rows={rows}
                  columns={columns}
                  autoHeight={true}
                  components={{
                    Toolbar: GridToolbar,
                  }}
                />
              </>
            )}
          </Grid>
        </Grid>
      )}
      {showForm && (
        <EmployeeForm
          recordForEdit={recordForEdit}
          addOrEdit={addOrEdit}
          setShowForm={setShowForm}
        />
      )}
    </>
  );
};
export default EmployeeListing;
