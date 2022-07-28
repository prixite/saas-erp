import { useState } from "react";
import { Button, Grid } from "@mui/material";
import Breadcrumbs from "@src/components/shared/layout/breadcrumbs";
import PageHeader from "@src/components/shared/page-header";
import Controls from "@src/components/shared/form-controls";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AddIcon from "@mui/icons-material/Add";
import EmployeeForm from "@src/components/employee/employee-form";

import MUIDataTable from "mui-datatables";

const columns = [
  {
    name: "id",
    value: "id",
    label: "ID",
    options: {
      filter: true,
      sort: false,
    },
  },
  {
    name: "name",
    value: "name",
    label: "Name",
    options: {
      filter: true,
      sort: false,
    },
  },

  {
    name: "contact",
    value: "contact",
    label: "Contact Number",
    options: {
      filter: true,
      sort: false,
    },
  },
  {
    name: "joiningDate",
    value: "joiningDate",
    label: "Joining Date",
    options: {
      filter: true,
      sort: false,
    },
  },

  {
    name: "",
    label: "Actions",
    options: {
      filter: false,
      sort: false,
      empty: true,
      customBodyRender: () => {
        return (
          <>
            <Grid style={{ display: "flex" }}>
              <Grid>
                {" "}
                <>
                  <EditOutlinedIcon fontSize="small" color="primary" />
                  <DeleteOutlineOutlinedIcon
                    fontSize="small"
                    color="primary"
                    sx={{ ml: 2 }}
                  />
                </>
              </Grid>
              <Grid></Grid>
            </Grid>
          </>
        );
      },
    },
  },
];

const data = [
  {
    id: "PX-05",
    name: "Muhammad Shafiq",
    contact: "03465554403",
    joiningDate: "14 May,2022",
  },
  {
    id: "PX-06",
    name: "Umair Khan",
    contact: "03465554403",
    joiningDate: "14 May,2022",
  },
  {
    id: "PX-06",
    name: "Waqar Ali",
    contact: "03129594346",
    joiningDate: "14 May,2022",
  },
  {
    id: "PX-07",
    name: "Hammad Yaqoub",
    contact: "03465554403",
    joiningDate: "14 May,2022",
  },
  {
    id: "PX-08",
    name: "Rabeel",
    contact: "03465554403",
    joiningDate: "14 May,2022",
  },
  {
    id: "PX-05",
    name: "Muhammad Shafiq",
    contact: "03465554403",
    joiningDate: "14 May,2022",
  },
  {
    id: "PX-05",
    name: "Muhammad Shafiq",
    contact: "03465554403",
    joiningDate: "14 May,2022",
  },
];

const options = {
  filter: true,
  filterType: "dropdown",
  selectableRows: "none",
  responsive: "standard",
  rowsPerPage: 10,
  rowsPerPageOptions: [20, 50, 70, 100],
};
const EmployeeListing = () => {
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showListing, setShowListing] = useState(true);

  const addOrEdit = (values, resetForm) => {
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

      {/* {loading || !records?.length ? (
    <Spinner />
  ) : ( */}
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
                <MUIDataTable
                  // title={"Employee List"}
                  data={data}
                  columns={columns}
                  options={options}
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

      {/* <ConfirmDialog
    confirmDialog={confirmDialog}
    setConfirmDialog={setConfirmDialog}
  /> */}
    </>
  );
};
export default EmployeeListing;
