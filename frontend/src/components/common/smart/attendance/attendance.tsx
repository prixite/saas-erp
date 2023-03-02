import { useState, useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import moment from "moment";
import { useLocation } from "react-router-dom";
import FilterIcon from "@src/assets/svgs/filterButtonIcon.svg";
import NotfoundIcon from "@src/assets/svgs/requestIcon.svg";
import Input from "@src/components/shared/formControls/textInput/textInput";
import RowSkeletonCard from "@src/components/shared/loaders/rowSkeletonCard/RowSkeletonCard";
import { employeeConstants } from "@src/helpers/constants/constants";
import { AttendanceTypes } from "@src/helpers/interfaces/employees-modal";
import { LocalizationInterface } from "@src/helpers/interfaces/localizationinterfaces";
import { localizedData } from "@src/helpers/utils/language";
import { useDebounce } from "@src/helpers/utils/utils";
import { useGetAttendacneQuery } from "@src/store/reducers/employees-api";
import "@src/components/common/smart/attendance/attendance.scss";

function Attendance() {
  const { data: rows, isLoading } = useGetAttendacneQuery();
  const constantData: LocalizationInterface = localizedData();
  const location = useLocation();
  const [dataLoading, setIsDataLoading] = useState(true);
  const [query, setQuery] = useState("");
  const { notFound } = constantData.Employee;
  const debouncedSearchTerm = useDebounce(query, 500);
  const { attendance } = constantData.Attendance;
  const { filterButton } = constantData.Buttons;
  const [attendanceData, setAttendanceData] = useState<AttendanceTypes[]>([]);
  const [pageSize, setPageSize] = useState<number>(10);

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      sortable: false,
      width: 200,
      renderCell: (cellValues) => {
        return (
          <p className="para" style={{ marginLeft: "20px" }}>
            {cellValues?.row?.employee?.id}
          </p>
        );
      },
    },
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
      field: "Department",
      headerName: "Department",
      sortable: false,
      width: 200,
      renderCell: (cellValues) => {
        return (
          <p className="para" style={{ marginLeft: "20px" }}>
            {cellValues?.row?.employee?.department}
          </p>
        );
      },
    },
    {
      field: "Date",
      headerName: "Date",
      sortable: false,
      width: 250,
      renderCell: (cellValues) => {
        return (
          <p style={{ marginLeft: "20px" }}>
            {moment(cellValues?.row?.time_in).format("ll")}
          </p>
        );
      },
    },
    {
      field: "Check In",
      headerName: "Check In",
      sortable: false,
      width: 300,
      renderCell: (cellValues) => {
        return (
          <p style={{ marginLeft: "20px" }}>
            {cellValues?.row?.time_in
              ? moment(cellValues?.row?.time_in).format("LT")
              : ""}
          </p>
        );
      },
    },
    {
      field: "Check Out",
      headerName: "Check Out",
      sortable: false,
      width: 300,
      renderCell: (cellValues) => {
        return (
          <p style={{ marginLeft: "20px" }}>
            {cellValues?.row?.time_out
              ? moment(cellValues?.row?.time_out).format("LT")
              : ""}
          </p>
        );
      },
    },
  ];
  useEffect(() => {
    if (rows && !isLoading) {
      if (rows.length) {
        setAttendanceData(rows);
      } else {
        setAttendanceData([]);
      }
      setIsDataLoading(false);
    }
  }, [rows, isLoading]);
  useEffect(() => {
    if (rows) {
      if (debouncedSearchTerm.length >= 3) {
        setAttendanceData(
          rows.filter((userData: AttendanceTypes) => {
            return userData?.employee?.name
              .trim()
              .toLowerCase()
              .includes(debouncedSearchTerm.trim().toLowerCase());
          })
        );
      } else {
        setAttendanceData(rows);
      }
    }
  }, [debouncedSearchTerm, rows]);

  return (
    <Box className="attendanceDataGridTable-section">
      {!location.pathname.includes("reports") ? (
        <Box
          className="top-bar-cls"
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Typography className="title-cls">{attendance}</Typography>
          <Box
            className="filter-section"
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Input setSearchText={setQuery} />
            <Box className="filter-btn-cls">
              <Button
                className="filter-btn"
                id="filter-btn-id"
                variant="outlined"
                startIcon={
                  <img
                    className="profile-pic"
                    src={FilterIcon}
                    alt="profile pic"
                  />
                }
              >
                {" "}
                <p>{filterButton}</p>
              </Button>
            </Box>
          </Box>
        </Box>
      ) : (
        ""
      )}
      {!dataLoading ? (
        <>
          {attendanceData?.length ? (
            <div className="dataGridTable-main">
              <DataGrid
                className="dataGrid"
                rowHeight={80}
                autoHeight
                rows={[...attendanceData]}
                columns={columns}
                disableColumnFilter
                disableSelectionOnClick
                disableColumnMenu
                disableColumnSelector
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                pageSize={pageSize}
                rowsPerPageOptions={[10, 13]}
                pagination
                density="standard"
                loading={isLoading}
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
                    width: "130px",
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
                  "& .MuiTablePagination-root:last-child": {
                    display: "block",
                  },
                }}
              />
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
          <RowSkeletonCard pathString="employees" />
        </>
      )}
    </Box>
  );
}
export default Attendance;
