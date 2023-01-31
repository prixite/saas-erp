import { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import {
  Box,
  Typography,
  InputAdornment,
  TextField,
  Tooltip,
  Button,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import moment from "moment";
import FilterIcon from "@src/assets/svgs/filterButtonIcon.svg";
import NotfoundIcon from "@src/assets/svgs/requestIcon.svg";
import searchBox from "@src/assets/svgs/searchBox.svg";
import RowSkeletonCard from "@src/components/shared/loaders/rowSkeletonCard/RowSkeletonCard";
import AddStandupModal from "@src/components/shared/popUps/addStandup/addStandup";
import CreateStandupModal from "@src/components/shared/popUps/createStandup/createStandup";
import { employeeConstants } from "@src/helpers/constants/constants";
import { empLeaves } from "@src/helpers/interfaces/employees-modal";
import { LocalizationInterface } from "@src/helpers/interfaces/localizationinterfaces";
import { localizedData } from "@src/helpers/utils/language";
import { truncateString } from "@src/helpers/utils/utils";
import {
  useGetStandupUpdatesQuery,
  useGetUserQuery,
} from "@src/store/reducers/employees-api";
import "@src/components/common/smart/standup/standup.scss";

function Standup() {
  const { data: rows = [], isLoading } = useGetStandupUpdatesQuery();
  const { data: userData } = useGetUserQuery();
  const constantData: LocalizationInterface = localizedData();
  const [checkState, setCheckState] = useState(false);
  const [dataLoading, setIsDataLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const { notFound } = constantData.Employee;
  const { standup, createStandup, addStandup } = constantData.Standup;
  const { filterButton } = constantData.Buttons;
  const [leavesData, setLeavesData] = useState<empLeaves[]>([]);
  const [pageSize, setPageSize] = useState<number>(10);

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
      field: "Date",
      headerName: "Date",
      sortable: false,
      width: 250,
      renderCell: (cellValues) => {
        return (
          <p style={{ marginLeft: "20px" }}>
            {moment(cellValues?.row?.created_at).format("ll")}
          </p>
        );
      },
    },
    {
      field: "Time",
      headerName: "Time",
      sortable: false,
      width: 250,
      renderCell: (cellValues) => {
        return <p style={{ marginLeft: "20px" }}>{cellValues?.row?.time}</p>;
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
                cellValues?.row?.status === "joined"
                  ? "green"
                  : cellValues?.row?.status === "missed"
                  ? "red"
                  : "grey",
              width: "91px",
              height: "28px",
              borderRadius: "16px",
              border: "1px solid",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textTransform: "capitalize",
              background:
                cellValues?.row?.status === "joined"
                  ? " #E9FFE6;"
                  : cellValues?.row?.status === "missed"
                  ? "#FFF1F1"
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
      field: "Work done yesterday",
      headerName: "Work done yesterday",
      sortable: false,
      width: 300,
      renderCell: (cellValues) => {
        return (
          <Tooltip title={cellValues?.row?.work_done_yesterday}>
            <p style={{ marginLeft: "21px" }}>
              {" "}
              {truncateString(cellValues?.row?.work_done_yesterday, 40)}
            </p>
          </Tooltip>
        );
      },
    },
    {
      field: "Work to do",
      headerName: "Work to do",
      sortable: false,
      width: 300,
      renderCell: (cellValues) => {
        return (
          <Tooltip title={cellValues?.row?.work_to_do}>
            <p style={{ marginLeft: "21px" }}>
              {" "}
              {truncateString(cellValues?.row?.work_to_do, 40)}
            </p>
          </Tooltip>
        );
      },
    },
    {
      field: "Blockers",
      headerName: "Blockers",
      sortable: false,
      width: 300,
      renderCell: (cellValues) => {
        return (
          <Tooltip title={cellValues?.row?.blockers}>
            <p style={{ marginLeft: "21px" }}>
              {" "}
              {truncateString(cellValues?.row?.blockers, 40)}
            </p>
          </Tooltip>
        );
      },
    },
  ];
  const handleModalClose = () => {
    setCheckState(false);
    setOpenModal(false);
  };
  const handleCreateModalClose = () => {
    setCheckState(false);
    setOpenCreateModal(false);
  };
  useEffect(() => {
    if (!isLoading) {
      if (rows.length) {
        setLeavesData(rows);
      } else {
        setLeavesData([]);
      }
      setIsDataLoading(false);
    }
  }, [rows, isLoading]);
  return (
    <Box className="standupDataGridTable-section">
      <Box
        className="top-bar-cls"
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        <Typography className="title-cls">{standup}</Typography>
        <Box
          className="filter-section"
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Box className="text-cls">
            <TextField
              className="searchbox"
              id="search-headbox"
              variant="outlined"
              placeholder="Search Employee here"
              sx={{
                "& label.Mui-focused": {
                  color: "#999999",
                },
                "& .MuiInput-underline:after": {
                  borderBottomColor: "#E7E7E7",
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#E7E7E7",
                  },
                  "&:hover fieldset": {
                    borderColor: "#999999",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#999999",
                  },
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    {/* SearchBoxSVG */}
                    <img
                      className="profile-pic"
                      src={searchBox}
                      alt="profile pic"
                    />
                  </InputAdornment>
                ),
              }}
            />
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
              <p>{filterButton}</p>
            </Button>
          </Box>
          {userData?.allowed_modules.admin_modules.includes("employees") ||
          userData?.allowed_modules.owner_modules.includes("employees") ? (
            <Box className="create-standup-btn">
              <Button
                variant="outlined"
                className="create-btn"
                style={{ borderRadius: "12px" }}
                startIcon={<AddIcon />}
                onClick={() => {
                  setCheckState(true);
                  setOpenCreateModal(true);
                }}
              >
                {" "}
                <Typography>{createStandup}</Typography>
              </Button>
            </Box>
          ) : (
            ""
          )}
          {userData?.allowed_modules.admin_modules.includes("employees") ||
          userData?.allowed_modules.owner_modules.includes("employees") ||
          userData?.allowed_modules.member_modules.includes("employees") ? (
            <Box className="add-standup-btn">
              <Button
                variant="outlined"
                className="add-btn"
                style={{ borderRadius: "12px" }}
                startIcon={<AddIcon />}
                onClick={() => {
                  setCheckState(true);
                  setOpenModal(true);
                }}
              >
                {" "}
                <Typography>{addStandup}</Typography>
              </Button>
            </Box>
          ) : (
            ""
          )}
        </Box>
      </Box>
      {!dataLoading ? (
        <>
          {leavesData?.length ? (
            <div className="dataGridTable-main">
              <DataGrid
                className="dataGrid"
                rowHeight={80}
                autoHeight
                rows={[...leavesData]}
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
      <AddStandupModal
        open={openModal}
        handleClose={handleModalClose}
        checkState={checkState}
      />
      <CreateStandupModal
        open={openCreateModal}
        checkState={checkState}
        handleClose={handleCreateModalClose}
      />
    </Box>
  );
}
export default Standup;
