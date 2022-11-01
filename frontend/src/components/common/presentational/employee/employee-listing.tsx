import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
// import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
// import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Grid } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import EmployeeForm from "@src/components/common/presentational/employee/employee-form";
import Controls from "@src/components/shared/form-controls/Controls";
import Breadcrumbs from "@src/components/shared/layout/breadcrumbs";
import PageHeader from "@src/components/shared/page-header";
import { rows, columns } from "@src/helpers/constants/constants";

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
      <Grid>
        <Breadcrumbs />
      </Grid>
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
