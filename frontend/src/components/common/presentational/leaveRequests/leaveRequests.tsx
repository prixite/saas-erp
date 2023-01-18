import "@src/components/common/presentational/leaveRequests/leaveRequests.scss";
import { useState, useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import NotfoundIcon from "@src/assets/svgs/requestIcon.svg";
import ThreeDotter from "@src/assets/svgs/ThreeDotter.svg";
import RowSkeletonCard from "@src/components/shared/loaders/rowSkeletonCard/RowSkeletonCard";
import { employeeConstants } from "@src/helpers/constants/constants";
import { empLeaves } from "@src/helpers/interfaces/employees-modal";
import { LocalizationInterface } from "@src/helpers/interfaces/localizationinterfaces";
import { localizedData } from "@src/helpers/utils/language";
import { useGetLeavesQuery } from "@src/store/reducers/employees-api";
import "@src/components/common/smart/leaves/leaves.scss";

const LeaveRequests = () => {
  const { data: rows = [], isLoading } = useGetLeavesQuery();
  const constantData: LocalizationInterface = localizedData();
  const [dataLoading, setIsDataLoading] = useState(true);
  const { notFound } = constantData.Employee;
  const { LeaveRequests, ViewAllLeaves } = constantData.Leaves;
  const [leavesData, setLeavesData] = useState<empLeaves[]>([]);
  const navigate = useNavigate();

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Name",
      sortable: false,
      width: 300,
      renderCell: (cellValues) => {
        return (
          <div
            style={{
              marginLeft: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              textTransform: "capitalize",
            }}
          >
            <img
              style={{
                height: "32px",
                width: "32px",
                left: "241px",
                top: "154px",
                marginRight: "8px",
                borderRadius: "50%",
              }}
              src={`${cellValues.row?.employee?.image}`}
              alt="profile pic"
            />
            <p>{cellValues?.row?.employee?.name}</p>
          </div>
        );
      },
    },
    {
      field: "Leave_Type",
      headerName: "Leave Type",
      sortable: false,
      width: 300,
      renderCell: (cellValues) => {
        return (
          <p style={{ marginLeft: "20px", textTransform: "capitalize" }}>
            {cellValues?.row?.leave_type}
          </p>
        );
      },
    },
    {
      field: "Department",
      headerName: "Department",
      sortable: false,
      width: 200,
      renderCell: (cellValues) => {
        return (
          <p style={{ marginLeft: "20px", textTransform: "capitalize" }}>
            {cellValues?.row?.employee?.department}
          </p>
        );
      },
    },
    {
      field: "Status",
      headerName: "Status",
      sortable: false,
      width: 300,
      renderCell: (cellValues) => {
        return (
          <Box
            sx={{
              color:
                cellValues?.row?.status === "approved"
                  ? "green"
                  : cellValues?.row?.status === "pending"
                  ? "blue"
                  : "red",
              width: "91px",
              height: "28px",
              borderRadius: "16px",
              border: "1px solid",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textTransform: "capitalize",
              background:
                cellValues?.row?.status === "approved"
                  ? " #E9FFE6;"
                  : cellValues?.row?.status === "pending"
                  ? "#E3F2FD"
                  : "#FFF1F1",
              fontSize: "12px",
              fontWeight: "400",
            }}
          >
            {cellValues?.row?.status}
          </Box>
        );
      },
    },
  ];

  useEffect(() => {
    if (!isLoading) {
      if (rows.length) {
        setLeavesData(rows.slice(0, 3));
      } else {
        setLeavesData([]);
      }
      setIsDataLoading(false);
    }
  }, [rows, isLoading]);
  return (
    <Box className="leave-requests-section">
      <Box className="heading-section">
        <Typography className="heading-cls">{LeaveRequests}</Typography>
        <Box className="menu-cls">
          <img className="menu-pic" src={ThreeDotter} alt="menu" />
        </Box>
      </Box>
      {!dataLoading ? (
        <>
          {leavesData?.length ? (
            <div className="dataGridTable-main">
              <DataGrid
                className="dataGrid"
                rowHeight={75}
                autoHeight
                rows={[...leavesData]}
                columns={columns}
                disableColumnFilter
                disableSelectionOnClick
                hideFooterPagination
                hideFooterSelectedRowCount
                disableColumnMenu
                disableColumnSelector
                density="standard"
                sx={{
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
                    cursor: "default !important",
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
                }}
              />
              <Box className="view-all-btn">
                <Button
                  className="view-all"
                  onClick={() => navigate("leaves/")}
                >
                  {ViewAllLeaves}
                </Button>
              </Box>
            </div>
          ) : (
            <Box className="error-img">
              <img src={NotfoundIcon} alt="notfound" />
              <Typography className="error-msg">
                {employeeConstants.employees}
                {notFound}
              </Typography>
            </Box>
          )}
        </>
      ) : (
        <>
          <RowSkeletonCard pathString="leaves" />
        </>
      )}
    </Box>
  );
};

export default LeaveRequests;
