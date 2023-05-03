import React, { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Box, Typography, Button, Tooltip, IconButton } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import moment from "moment";
import { toast } from "react-toastify";
import DeleteIcon from "@src/assets/svgs/DeleteIcon.svg";
import EditIcon from "@src/assets/svgs/Edit.svg";
import FilterIcon from "@src/assets/svgs/filterButtonIcon.svg";
import NotfoundIcon from "@src/assets/svgs/requestIcon.svg";
import Input from "@src/components/shared/formControls/textInput/textInput";
import RowSkeletonCard from "@src/components/shared/loaders/rowSkeletonCard/RowSkeletonCard";
import CreateTeamModal from "@src/components/shared/popUps/createTeam/createTeam";
import DeleteModal from "@src/components/shared/popUps/deleteModal/deleteModal";
import { employeeConstants, timeOut } from "@src/helpers/constants/constants";
import {
  teamTypes,
  EmployeeBasic,
} from "@src/helpers/interfaces/employees-modal";
import { LocalizationInterface } from "@src/helpers/interfaces/localizationinterfaces";
import { localizedData } from "@src/helpers/utils/language";
import { useDebounce, toastAPIError } from "@src/helpers/utils/utils";
import {
  useGetUserQuery,
  useGetTeamsQuery,
  useDeleteTeamMutation,
} from "@src/store/reducers/employees-api";
import "@src/components/common/smart/teams/teams.scss";

function Teams() {
  const { data: rows = [], isLoading } = useGetTeamsQuery();
  const { data: userData } = useGetUserQuery();
  const [deleteTeam] = useDeleteTeamMutation();
  const constantData: LocalizationInterface = localizedData();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [dataLoading, setIsDataLoading] = useState(true);
  const [action, setAction] = useState("add");
  const [rowCellId, setRowCellId] = useState<number>(0);
  const [openModal, setOpenModal] = useState(false);
  const [query, setQuery] = useState("");
  const { notFound } = constantData.Employee;
  const debouncedSearchTerm = useDebounce(query, 500);
  const { Teams, AddTeam, TeamDeleteSuccess } = constantData.Teams;
  const { filterButton } = constantData.Buttons;
  const [teamsData, setTeamsData] = useState<teamTypes[]>([]);
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
            {cellValues?.row?.id}
          </p>
        );
      },
    },
    {
      field: "name",
      headerName: "Name",
      sortable: false,
      width: 200,
      renderCell: (cellValues) => {
        return (
          <p style={{ marginLeft: "20px", textTransform: "capitalize" }}>
            {cellValues?.row?.name}
          </p>
        );
      },
    },
    {
      field: "members",
      headerName: "Members",
      sortable: false,
      width: 200,
      renderCell: (cellValues) => {
        return (
          <Box style={{ marginLeft: "20px", width: "100%", display: "flex" }}>
            {cellValues?.row?.members.length <= 5
              ? cellValues?.row?.members?.map((item: EmployeeBasic) => {
                  return (
                    <Tooltip
                      title={`${item?.first_name} ${item?.last_name}`}
                      key={item?.id}
                    >
                      <Box sx={{ display: "flex" }}>
                        <img
                          style={{
                            height: "32px",
                            width: "32px",
                            marginRight: "-10px",
                            borderRadius: "50%",
                          }}
                          src={item?.image}
                          alt="profile pic"
                        />
                      </Box>
                    </Tooltip>
                  );
                })
              : cellValues?.row?.members
                  ?.slice(0, 5)
                  .map((item: EmployeeBasic) => {
                    return (
                      <Box sx={{ display: "flex" }} key={item?.id}>
                        <img
                          style={{
                            height: "32px",
                            width: "32px",
                            marginRight: "-10px",
                            borderRadius: "50%",
                          }}
                          src={item?.image}
                          alt="profile pic"
                        />
                      </Box>
                    );
                  })}
            {cellValues?.row?.members.length > 5 && (
              <Tooltip
                title={cellValues?.row?.members.map((item: EmployeeBasic) => (
                  <React.Fragment key={item?.id}>
                    {`${item?.first_name} ${item?.last_name}, `}
                  </React.Fragment>
                ))}
              >
                <Box
                  sx={{
                    height: "32px",
                    width: "32px",
                    marginRight: "-10px",
                    borderRadius: "50%",
                    background: "#FFE9E9",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    sx={{ color: "#FF2F2F" }}
                  >{`+ ${cellValues?.row?.members.length}`}</Typography>
                </Box>
              </Tooltip>
            )}
          </Box>
        );
      },
    },
    {
      field: "created_at",
      headerName: "Created At",
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
      field: "updated_at",
      headerName: "Updated At",
      sortable: false,
      width: 250,
      renderCell: (cellValues) => {
        return (
          <p style={{ marginLeft: "20px" }}>
            {moment(cellValues?.row?.updated_at).format("ll")}
          </p>
        );
      },
    },

    {
      field: "actions",
      headerName: "Actions",
      width: 350,
      renderCell: (cellValues) => {
        return userData?.allowed_modules.admin_modules.includes("stndup") ||
          userData?.allowed_modules.owner_modules.includes("standup") ? (
          <Box
            className="renderCell-joiningDate"
            style={{ marginLeft: "10px" }}
          >
            <IconButton
              onClick={(event) =>
                handleEditModalOpen(event, cellValues?.row?.id)
              }
              aria-label="edit"
              id="edit-btn-id"
              className="edit-btn"
            >
              <img className="profile-pic" src={EditIcon} alt="profile pic" />
            </IconButton>
            <IconButton
              onClick={(event) =>
                handleDeleteModalOpen(event, cellValues?.row?.id)
              }
              aria-label="delete"
              id="delete-btn-id"
              className="delete-btn"
            >
              <img className="profile-pic" src={DeleteIcon} alt="profile pic" />
            </IconButton>
          </Box>
        ) : (
          ""
        );
      },
    },
  ];
  const handleModalClose = () => {
    setOpenModal(false);
    setAction("add");
  };
  const handleEditModalOpen = (
    event: React.MouseEvent<HTMLElement>,
    cellId: number
  ) => {
    event.stopPropagation();
    setAction("edit");
    setRowCellId(cellId);
    setOpenModal(true);
  };
  const handleDeleteModalOpen = (
    event: React.MouseEvent<HTMLElement>,
    cellId: number
  ) => {
    event.stopPropagation();
    setRowCellId(cellId);
    setOpenDeleteModal(true);
  };
  const handleTeamDelete = async () => {
    await deleteTeam({
      id: rowCellId,
    })
      .unwrap()
      .then(async () => {
        toast.success(TeamDeleteSuccess, {
          autoClose: timeOut,
          pauseOnHover: false,
        });
        handleDeleteModalClose();
      })
      .catch((error) => {
        toastAPIError("Something went wrong.", error.status, error.data);
      });
  };
  useEffect(() => {
    if (!isLoading) {
      if (rows.length) {
        setTeamsData(rows);
      } else {
        setTeamsData([]);
      }
      setIsDataLoading(false);
    }
  }, [rows, isLoading]);
  const handleDeleteModalClose = () => {
    setOpenDeleteModal(false);
  };
  useEffect(() => {
    if (debouncedSearchTerm.length >= 3) {
      setTeamsData(
        rows.filter((team: teamTypes) => {
          return team?.name
            .trim()
            .toLowerCase()
            .includes(debouncedSearchTerm.trim().toLowerCase());
        })
      );
    } else {
      setTeamsData(rows);
    }
  }, [debouncedSearchTerm, rows]);

  return (
    <Box className="teamsDataGridTable-section">
      <Box
        className="top-bar-cls"
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        <Typography className="title-cls">{Teams}</Typography>
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
              <p className="filter">{filterButton}</p>
            </Button>
          </Box>
          {userData?.allowed_modules.admin_modules.includes("standup") ||
          userData?.allowed_modules.owner_modules.includes("standup") ? (
            <Box className="add-standup-btn">
              <Button
                variant="outlined"
                className="add-btn"
                style={{ borderRadius: "12px" }}
                startIcon={<AddIcon />}
                onClick={() => {
                  setAction("add");
                  setOpenModal(true);
                }}
              >
                {" "}
                <Typography className="team">{AddTeam}</Typography>
              </Button>
            </Box>
          ) : (
            ""
          )}
        </Box>
      </Box>
      <Box className="search1">
        <Input setSearchText={setQuery} />
      </Box>

      {!dataLoading ? (
        <>
          {teamsData?.length ? (
            <div className="dataGridTable-main">
              <DataGrid
                className="dataGrid"
                rowHeight={80}
                autoHeight
                rows={[...teamsData]}
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
      <CreateTeamModal
        teamId={rowCellId}
        action={action}
        open={openModal}
        handleClose={handleModalClose}
      />
      <DeleteModal
        open={openDeleteModal}
        handleObjDelete={handleTeamDelete}
        handleClose={handleDeleteModalClose}
      />
    </Box>
  );
}
export default Teams;
