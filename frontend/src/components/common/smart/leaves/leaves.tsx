import { useState, useEffect } from "react";
import { Box, Typography, Button, Tooltip } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import moment from "moment";
import { useLocation } from "react-router-dom";
import FilterIcon from "@src/assets/svgs/filterButtonIcon.svg";
import NotfoundIcon from "@src/assets/svgs/requestIcon.svg";
import LeavesCountBar from "@src/components/common/presentational/leavesCountBar/leavesCountBar";
import Input from "@src/components/shared/formControls/textInput/textInput";
import RowSkeletonCard from "@src/components/shared/loaders/rowSkeletonCard/RowSkeletonCard";
import LeaveModal from "@src/components/shared/popUps/leaveTypeModal/leaveTypeModal";
import { employeeConstants } from "@src/helpers/constants/constants";
import { empLeaves } from "@src/helpers/interfaces/employees-modal";
import { LocalizationInterface } from "@src/helpers/interfaces/localizationinterfaces";
import { localizedData } from "@src/helpers/utils/language";
import { truncateString, useDebounce } from "@src/helpers/utils/utils";
import { useGetLeavesQuery } from "@src/store/reducers/employees-api";
import "@src/components/common/smart/leaves/leaves.scss";
interface Props {
  isLeavesData?: empLeaves[];
  isLeavesLoading: boolean;
}
const formatLeavesData = (leavesData) => {
  const data = leavesData.map((value) => ({
    id: value?.id,
    leave_type: value?.leave_type,
    leave_from: value?.leave_from,
    leave_to: value?.leave_to,
    emp_image: value?.employee?.image,
    emp_department: value?.employee?.department,
    emp_name: value?.employee?.name,
    emp_reason: value?.description,
    status: value?.status,
    hr_comment: value?.hr_comment,
  }));
  return data;
};

function customToolBar() {
  return (
    <GridToolbarContainer sx={{ justifyContent: "flex-end" }}>
      <GridToolbarExport
        csvOptions={{
          fileName: "EmployeeLeaveData",
          allColumns: true,
        }}
        printOptions={{ disableToolbarButton: true }}
      />
    </GridToolbarContainer>
  );
}

function Leaves({ isLeavesData, isLeavesLoading }: Props) {
  const { data: rows, isLoading } = useGetLeavesQuery({});
  const constantData: LocalizationInterface = localizedData();
  const [dataLoading, setIsDataLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const location = useLocation();
  const { notFound } = constantData.Employee;
  const { LeavesManagement, Actions } = constantData.Leaves;
  const { filterButton } = constantData.Buttons;
  const debouncedSearchTerm = useDebounce(query, 500);
  const [leavesData, setLeavesData] = useState<empLeaves[]>([]);
  const [pageSize, setPageSize] = useState<number>(10);
  const [rowData, setRowData] = useState();

  const columns: GridColDef[] = [
    {
      field: "emp_name",
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
              src={`${cellValues.row?.emp_image}`}
              alt="profile pic"
            />
            <p>{cellValues?.row?.emp_name}</p>
          </div>
        );
      },
    },
    {
      field: "leave_type",
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
      field: "emp_department",
      headerName: "Department",
      sortable: false,
      width: 200,
      renderCell: (cellValues) => {
        return (
          <p style={{ marginLeft: "20px", textTransform: "capitalize" }}>
            {cellValues?.row?.emp_department}
          </p>
        );
      },
    },
    {
      field: "leave_from",
      headerName: "Leave From",
      sortable: false,
      width: 250,
      renderCell: (cellValues) => {
        return (
          <p style={{ marginLeft: "20px" }}>
            {moment(cellValues?.row?.leave_from).format("ll")}
          </p>
        );
      },
    },
    {
      field: "leave_to",
      headerName: "Leave To",
      sortable: false,
      width: 250,
      renderCell: (cellValues) => {
        return (
          <p style={{ marginLeft: "20px" }}>
            {moment(cellValues?.row?.leave_to).format("ll")}
          </p>
        );
      },
    },
    {
      field: "emp_reason",
      headerName: "Reason",
      sortable: false,
      width: 400,
      renderCell: (cellValues) => {
        return (
          <Tooltip title={cellValues?.row?.emp_reason}>
            <p style={{ marginLeft: "21px" }}>
              {" "}
              {truncateString(cellValues?.row?.emp_reason, 40)}
            </p>
          </Tooltip>
        );
      },
    },

    {
      field: "hr_comment",
      headerName: "Hr Comments",
      sortable: false,
      width: 350,
      renderCell: (cellValues) => {
        return (
          <Tooltip title={cellValues?.row?.hr_comment}>
            <p style={{ marginLeft: "20px" }}>
              {truncateString(cellValues?.row?.hr_comment, 40)}
            </p>
          </Tooltip>
        );
      },
    },
    {
      field: "status",
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
    {
      field: "actions",
      headerName: "Actions",
      width: 250,

      renderCell: (cellValues) => {
        return (
          <Box
            sx={{
              width: "91px",
              height: "28px",
              borderRadius: "16px",
              border: "0.5px solid",
              borderColor: "#e7e7e7",
              color: "#696969",
              display: "flex",
              cursor: "pointer",
              alignItems: "center",
              justifyContent: "center",
              textTransform: "capitalize",
              fontSize: "12px",
              fontWeight: "400",
            }}
            onClick={(event) => handleModalOpen(event, cellValues?.row)}
          >
            {Actions}
          </Box>
        );
      },
    },
  ];
  const handleModalClose = () => {
    setOpenModal(false);
  };
  const handleModalOpen = (
    event: React.MouseEvent<HTMLElement>,
    row: empLeaves
  ) => {
    event.stopPropagation();
    setRowData(row);
    setOpenModal(true);
  };

  useEffect(() => {
    if (location.pathname.includes("leaves")) {
      if (rows && !isLoading) {
        if (rows.length) {
          setLeavesData(rows);
        } else {
          setLeavesData([]);
        }
        setIsDataLoading(false);
      }
    } else {
      if (isLeavesData && !isLeavesLoading) {
        if (isLeavesData.length) {
          setLeavesData(isLeavesData);
        } else {
          setLeavesData([]);
        }
        setIsDataLoading(false);
      }
    }
  }, [rows, isLoading, isLeavesData, isLeavesLoading]);
  useEffect(() => {
    if (rows && location.pathname.includes("leaves")) {
      if (debouncedSearchTerm.length >= 3) {
        setLeavesData(
          rows.filter((userData: empLeaves) => {
            return userData?.employee?.name
              .trim()
              .toLowerCase()
              .includes(debouncedSearchTerm.trim().toLowerCase());
          })
        );
      } else {
        setLeavesData(rows);
      }
    }
  }, [debouncedSearchTerm, rows]);

  return (
    <Box className="leavesDataGridTable-section">
      {!location.pathname.includes("reports") ? (
        <>
          <Box
            className="top-bar-cls"
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Typography className="title-cls">{LeavesManagement}</Typography>
            <Box
              className="filter-section"
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Box className="search">
                <Input setSearchText={setQuery} />
              </Box>
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
                  <p className="btn">{filterButton}</p>
                </Button>
              </Box>
            </Box>
          </Box>
          <Box className="search1">
            <Input setSearchText={setQuery} />
          </Box>

          <LeavesCountBar employeeLeavesData={leavesData} />
        </>
      ) : (
        ""
      )}

      {!dataLoading ? (
        <>
          {leavesData?.length ? (
            <div className="dataGridTable-main">
              <DataGrid
                className="dataGrid"
                autoHeight
                rows={formatLeavesData(leavesData)}
                columns={columns}
                components={{
                  Toolbar: customToolBar,
                }}
                rowHeight={80}
                //slotProps={{ toolbar: { csvOptions: { allColumns: true } } }}
                disableColumnFilter
                disableSelectionOnClick
                disableColumnMenu
                disableColumnSelector
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                pageSize={pageSize}
                rowsPerPageOptions={[10, 13]}
                pagination
                density="standard"
                loading={
                  location.pathname.includes("reports")
                    ? isLeavesLoading
                    : isLoading
                }
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
      <LeaveModal
        open={openModal}
        handleClose={handleModalClose}
        empData={rowData}
      />
    </Box>
  );
}
export default Leaves;
