import { useState } from "react";
import { Box, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@src/assets/svgs/DeleteIcon.svg";
import EditIcon from "@src/assets/svgs/Edit.svg";
import profileIcon from "@src/assets/svgs/profile_pic.svg";
import ShowIcon from "@src/assets/svgs/ShowIcon.svg";
import { datarows } from "@src/helpers/constants/constants";

import "./dataGridTable.scss";

function DataGridTable() {
  const navigate = useNavigate();
  const [pageSize, setPageSize] = useState<number>(10);
  const columns = [
    {
      field: "id",
      headerName: "ID",
      sortable: false,
      width: 200,
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
      sortable: false,
      width: 400,
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
      sortable: false,
      width: 400,
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
      sortable: false,
      width: 400,
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
      width: 400,
      renderCell: () => {
        return (
          <Box
            className="renderCell-joiningDate"
            style={{ marginLeft: "20px" }}
          >
            <IconButton
              onClick={handleIconClicks}
              aria-label="edit"
              id="edit-btn-id"
              className="edit-btn"
            >
              {/* EditIconSVG  */}
              <img className="profile-pic" src={EditIcon} alt="profile pic" />
            </IconButton>
            <IconButton
              aria-label="Show"
              id="show-btn-id"
              className="delete-btn"
            >
              {/* ShowIconSVG */}
              <img className="profile-pic" src={ShowIcon} alt="profile pic" />
            </IconButton>
            <IconButton
              onClick={handleIconClicks}
              aria-label="delete"
              id="delete-btn-id"
              className="delete-btn"
            >
              {/* DeleteIconSVG */}
              <img className="profile-pic" src={DeleteIcon} alt="profile pic" />
            </IconButton>
          </Box>
        );
      },
      valueGetter: (params) =>
        `${params.getValue(params.id, "firstName") || ""} ${
          params.getValue(params.id, "contact_Number") || ""
        }`,
    },
  ];

  const handleIconClicks = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
  };

  // const [finalCellClickInfo, setFinalCellClickInfo] = useState(null);
  const handleOnCellClick = (params) => {
    //params => can be used to log click info
    // setFinalCellClickInfo((prevState) => (prevState = params));
    // console.log("params", params.row.id);
    navigate(`/react/employees/${params.row.id}`);
  };

  return (
    <div className="dataGridTable-main">
      <DataGrid
        className="dataGrid"
        rowHeight={80}
        autoHeight
        rows={datarows}
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
          "& .MuiDataGrid-row:hover": {
            backgroundColor: "#F5F5F5",
          },
          "& .MuiDataGrid-row.Mui-selected:hover, .css-vgcejw-MuiDataGrid-root .MuiDataGrid-row.Mui-selected.Mui-hovered":
            {
              backgroundColor: "white",
            },
          "&.MuiDataGrid-root .MuiDataGrid-cell:focus, .MuiDataGrid-root .MuiDataGrid-cell:focus-within":
            {
              outline: "none",
            },
          "&.MuiDataGrid-root .MuiDataGrid-columnHeader:focus, .MuiDataGrid-root .MuiDataGrid-cell:focus":
            {
              outline: "none",
            },
          "& .css-17jjc08-MuiDataGrid-footerContainer": {},
        }}
      />
    </div>
  );
}

export default DataGridTable;
