import { useState, useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import "@src/components/common/presentational/checkingTime/checkingTime.scss";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import NotfoundIcon from "@src/assets/svgs/requestIcon.svg";
import ThreeDotter from "@src/assets/svgs/ThreeDotter.svg";
import RowSkeletonCard from "@src/components/shared/loaders/rowSkeletonCard/RowSkeletonCard";
import { employeeConstants } from "@src/helpers/constants/constants";
import { AttendanceTypes } from "@src/helpers/interfaces/employees-modal";
import { LocalizationInterface } from "@src/helpers/interfaces/localizationinterfaces";
import { localizedData } from "@src/helpers/utils/language";
import { useGetAttendacneQuery } from "@src/store/reducers/employees-api";
import "@src/components/common/smart/attendance/attendance.scss";

const CheckingTime = () => {
  const constantData: LocalizationInterface = localizedData();
  const { CheckingTime, ViewAll } = constantData.Attendance;
  const { data: rows = [], isLoading } = useGetAttendacneQuery();
  const navigate = useNavigate();
  const [dataLoading, setIsDataLoading] = useState(true);
  const { notFound } = constantData.Employee;
  const [attendanceData, setAttendanceData] = useState<AttendanceTypes[]>([]);

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Name",
      sortable: false,
      width: 200,
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
      field: "Check In",
      headerName: "Check In",
      sortable: false,
      width: 160,
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
      width: 160,
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
    if (!isLoading) {
      if (rows.length) {
        setAttendanceData(rows.slice(0, 3));
      } else {
        setAttendanceData([]);
      }
      setIsDataLoading(false);
    }
  }, [rows, isLoading]);
  return (
    <Box className="checking-time-section">
      <Box className="heading-section">
        <Typography className="heading-cls">{CheckingTime}</Typography>
        <Box className="menu-cls">
          <img className="menu-pic" src={ThreeDotter} alt="menu" />
        </Box>
      </Box>
      {!dataLoading ? (
        <>
          {attendanceData?.length ? (
            <div className="dataGridTable-main">
              <DataGrid
                className="dataGrid"
                rowHeight={75}
                autoHeight
                rows={[...attendanceData]}
                columns={columns}
                disableColumnFilter
                disableSelectionOnClick
                hideFooterPagination
                hideFooterSelectedRowCount
                disableColumnMenu
                disableColumnSelector
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
                }}
              />
              <Box className="view-all-btn">
                <Button
                  className="view-all"
                  onClick={() => navigate("attendance/")}
                >
                  {ViewAll}
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
          <RowSkeletonCard pathString="attendance" />
        </>
      )}
    </Box>
  );
};

export default CheckingTime;
