import { useState } from "react";
import { Box, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
// import { useDemoData } from '@mui/x-data-grid-generator';
//for Dummy Purpose
// import { useNavigate } from "react-router-dom";
import profileIcon from "@src/assets/svgs/profile_Pic_dummy.svg";
import DeleteIconSVG from "@src/components/shared/dataGrid/Icons/DeleteIconSVG";
import EditIconSVG from "@src/components/shared/dataGrid/Icons/EditIconSVG";
import ShowIconSVG from "@src/components/shared/dataGrid/Icons/ShowIconSVG";
import "./dataGridTable.scss";

function DataGridTable() {
  // const navigate = useNavigate();
  const [pageSize, setPageSize] = useState<number>(10);
  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 0.5,
      sortable: false,
      // width: 206,
      headerAlign: "start",
      renderCell: (cellValues) => {
        return (
          <p className="para" style={{ marginLeft: "20px" }}>
            {cellValues?.row?.id}
          </p>
        );
      },
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      sortable: false,
      // width: 206,
      headerAlign: "start",
      renderCell: (cellValues) => {
        return (
          <div
            style={{
              marginLeft: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <img
              style={{
                width: "32px",
                height: "32px",
                left: "241px",
                top: "154px",
                marginRight: "8px",
              }}
              src={profileIcon}
              alt="profile pic"
            />
            <p>{cellValues?.row?.name}</p>
          </div>
        );
      },
    },
    {
      field: "contact_Number",
      headerName: "Contact Number",
      flex: 1,
      sortable: false,
      // width: 206,
      headerAlign: "start",
      renderCell: (cellValues) => {
        return (
          <p style={{ marginLeft: "20px" }}>
            {cellValues?.row?.contact_Number}
          </p>
        );
      },
    },
    {
      field: "joining_Date",
      headerName: "Joining Date",
      // type: "number",
      flex: 1,
      sortable: false,
      // width: 206,
      headerAlign: "start",
      renderCell: (cellValues) => {
        return (
          <p style={{ marginLeft: "20px" }}>{cellValues?.row?.joining_Date}</p>
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      headerAlign: "start",
      flex: 1,
      renderCell: () => {
        return (
          <Box
            className="renderCell-joiningDate"
            style={{ marginLeft: "20px" }}
          >
            <IconButton aria-label="edit" id="edit-btn-id" className="edit-btn">
              <EditIconSVG />
            </IconButton>
            <IconButton
              aria-label="Show"
              id="show-btn-id"
              className="delete-btn"
            >
              <ShowIconSVG />
            </IconButton>
            <IconButton
              aria-label="delete"
              id="delete-btn-id"
              className="delete-btn"
            >
              <DeleteIconSVG />
            </IconButton>
          </Box>
        );
      },
      width: 180,
      valueGetter: (params) =>
        `${params.getValue(params.id, "firstName") || ""} ${
          params.getValue(params.id, "contact_Number") || ""
        }`,
    },
  ];

  const rows = [
    {
      id: 1,
      name: "Rabeel Qaiser",
      contact_Number: "03334255834",
      joining_Date: "Sept 16, 2022",
      actions: "xyz",
    },
    {
      id: 2,
      name: "Suzan Talor",
      contact_Number: "03334255834",
      joining_Date: "Sept 16, 2022",
      actions: "xyz",
    },
    {
      id: 3,
      name: "Meer Alba",
      contact_Number: "03334255834",
      joining_Date: "Sept 16, 2022",
      actions: "xyz",
    },
    {
      id: 4,
      name: "Janzi King",
      contact_Number: "03334255834",
      joining_Date: "Sept 16, 2022",
      actions: "xyz",
    },
    {
      id: 5,
      name: "Umair Khan",
      contact_Number: "03334255834",
      joining_Date: "Sept 16, 2022",
      actions: "xyz",
    },
    {
      id: 6,
      name: "Ali Kareem",
      contact_Number: "03334255834",
      joining_Date: "Sept 16, 2022",
      actions: "xyz",
    },
    {
      id: 7,
      name: "Congo Pierce",
      contact_Number: "03334255834",
      joining_Date: "Sept 16, 2022",
      actions: "xyz",
    },
    {
      id: 8,
      name: "Libya Sing",
      contact_Number: "03334255834",
      joining_Date: "Sept 16, 2022",
      actions: "xyz",
    },
    {
      id: 9,
      name: "Susan Doll",
      contact_Number: "03334255834",
      joining_Date: "Sept 16, 2022",
      actions: "xyz",
    },
    {
      id: 10,
      name: "Georgina Sanchez",
      contact_Number: "03334255834",
      joining_Date: "Sept 16, 2022",
      actions: "xyz",
    },
    {
      id: 11,
      name: "Brad, Sir",
      contact_Number: "03334255834",
      joining_Date: "Sept 16, 2022",
      actions: "xyz",
    },
    {
      id: 12,
      name: "Maad Iqbal",
      contact_Number: "03334255834",
      joining_Date: "Sept 16, 2022",
      actions: "xyz",
    },
    {
      id: 13,
      name: "Zizi Zalkov",
      contact_Number: "03334255834",
      joining_Date: "Sept 16, 2022",
      actions: "xyz",
    },
  ];

  // const [finalCellClickInfo, setFinalCellClickInfo] = useState(null);
  const handleOnCellClick = () => {
    //params => can be used to log click info
    // setFinalCellClickInfo((prevState) => (prevState = params));
    // navigate(`/react/employee/Employee`);
  };

  return (
    <div className="dataGridTable-main">
      <DataGrid
        className="dataGrid"
        rowHeight={80}
        autoHeight
        rows={rows}
        columns={columns}
        disableColumnFilter
        disableColumnMenu
        disableColumnSelector
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[5, 10, 20]}
        pagination
        density="standard"
        onCellClick={handleOnCellClick}
        sx={{
          cursor: "pointer",
          "& renderCell-joiningDate MuiBox-root css-0:focus": {
            outline: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#(207,207,207, 0.2)",
            fontFamily: "Lato",
            fontStyle: "normal",
            fontWeight: "600",
            fontSize: "14px",
            lineHeight: "18px",
            letterSpacing: "-0.011em",
            color: "#6C6C6C",
            ":focus": {
              outline: "white",
            },
          },
          "& .css-1jbbcbn-MuiDataGrid-columnHeaderTitle": {
            width: "101px",
            height: "18px",
            fontFamily: "Lato",
            fontStyle: "normal",
            fontWeight: "600",
            fontSize: "14px",
            lineHeight: "18px",
            letterSpacing: "-0.011em",
            color: "#6C6C6C",
            marginLeft: "20px",
            marginTop: "16px",
            marginBottom: "16px",
            marginRight: "16px",
          },
          "& .MuiDataGrid-virtualScrollerRenderZone": {
            "& .MuiDataGrid-row": {
              backgroundColor: "white",
            },
          },
          "& .MuiDataGrid-cell:focus, .MuiDataGrid-cell:focus-within": {
            outline: "none",
          },
          "& .css-1lk0jn-MuiDataGrid-root .MuiDataGrid-columnSeparator--sideRight":
            {
              opacity: 0,
            },
          "& .css-iibd7p-MuiDataGrid-root.MuiDataGrid-autoHeight": {
            border: "white",
          },
          "& .MuiDataGrid-columnSeparator": {
            visibility: "hidden",
            display: "none",
          },
          "& .MuiDataGrid-cell:hover": {
            color: "black",
          },
          // boxShadow: 3,
          // border: 2,
          "& .MuiDataGrid-row:hover": {
            backgroundColor: "#F5F5F5",
            // color: "red"
          },
          "& .MuiDataGrid-row.Mui-selected:hover, .css-vgcejw-MuiDataGrid-root .MuiDataGrid-row.Mui-selected.Mui-hovered":
            {
              backgroundColor: "white",
            },
          "&.MuiDataGrid-root .MuiDataGrid-cell:focus, .MuiDataGrid-root .MuiDataGrid-cell:focus-within":
            {
              outline: "none",
            },
          "& .css-17jjc08-MuiDataGrid-footerContainer": {
            // display: "none",
          },
        }}
      />
    </div>
  );
}

export default DataGridTable;
