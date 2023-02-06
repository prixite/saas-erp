import { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import DeleteIcon from "@src/assets/svgs/DeleteIcon.svg";
import EditIcon from "@src/assets/svgs/Edit.svg";
import RowSkeletonCard from "@src/components/shared/loaders/rowSkeletonCard/RowSkeletonCard";
import DeleteModal from "@src/components/shared/popUps/deleteModal/deleteModal";
import UserModuleModal from "@src/components/shared/popUps/userModuleModal/userModuleModal";
import { timeOut } from "@src/helpers/constants/constants";
import { UserModuleRoleInterface } from "@src/helpers/interfaces/localizationinterfaces";
import { toastAPIError } from "@src/helpers/utils/utils";
import {
  useApiUsersAccessListQuery,
  useApiUsersAccessDestroyMutation,
} from "@src/store/api";
import "@src/components/common/smart/userAccess/userAccess.scss";
import { useGetUserQuery } from "@src/store/reducers/employees-api";

function UserAccess() {
  const [paramValue, setParamValue] = useState<number>(0);
  const { data: rows = [], isLoading } = useApiUsersAccessListQuery(
    {
      id: paramValue,
    },
    { skip: !paramValue }
  );
  const [deleteModule] = useApiUsersAccessDestroyMutation();
  const { data: userInfo } = useGetUserQuery();
  const [userData, setUserData] = useState<UserModuleRoleInterface[]>([]);
  const [pageSize, setPageSize] = useState<number>(10);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [dataLoading, setIsDataLoading] = useState(true);
  const [rowCellId, setRowCellId] = useState<number | undefined>(undefined);
  const [action, setAction] = useState("add");
  const [openModal, setOpenModal] = useState(false);
  const param = useParams();

  useEffect(() => {
    if (param && param.userId) {
      setParamValue(parseInt(param.userId));
    }
  }, [paramValue]);

  const handleModalOpen = () => {
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setRowCellId(undefined);
    setAction("add");
    setOpenModal(false);
  };

  const handleDeleteModalClose = () => {
    setOpenDeleteModal(false);
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
  const handleModuleDelete = async () => {
    await deleteModule({
      id: rowCellId as number,
    })
      .unwrap()
      .then(async () => {
        toast.success("Module deleted successfully", {
          autoClose: timeOut,
          pauseOnHover: false,
        });
        handleDeleteModalClose();
      })
      .catch((error) => {
        toastAPIError("Something went wrong.", error.status, error.data);
      });
  };

  const columns: GridColDef[] = [
    {
      field: "module",
      headerName: "Module",
      sortable: false,
      width: 300,
      renderCell: (cellValues) => {
        return (
          <p style={{ marginLeft: "20px" }}>{cellValues.row.module.name}</p>
        );
      },
    },
    {
      field: "role",
      headerName: "Role",
      sortable: false,
      width: 300,
      renderCell: (cellValues) => {
        return <p style={{ marginLeft: "20px" }}>{cellValues.row.role.name}</p>;
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 300,
      renderCell: (cellValues) => {
        return (
          <Box
            className="renderCell-joiningDate"
            style={{ marginLeft: "10px" }}
          >
            {userInfo?.allowed_modules.admin_modules.includes("employees") ||
            userInfo?.allowed_modules.owner_modules.includes("employees") ? (
              <>
                <IconButton
                  onClick={(event) =>
                    handleEditModalOpen(event, cellValues.row.id)
                  }
                  aria-label="edit"
                  id="edit-btn-id"
                  className="edit-btn"
                >
                  <img
                    className="profile-pic"
                    src={EditIcon}
                    alt="profile pic"
                  />
                </IconButton>
                <IconButton
                  onClick={(event) =>
                    handleDeleteModalOpen(event, cellValues.row.id)
                  }
                  aria-label="delete"
                  id="delete-btn-id"
                  className="delete-btn"
                >
                  <img
                    className="profile-pic"
                    src={DeleteIcon}
                    alt="profile pic"
                  />
                </IconButton>
              </>
            ) : (
              <p style={{ marginLeft: "20px" }}>View</p>
            )}
          </Box>
        );
      },
    },
  ];

  useEffect(() => {
    if (!isLoading) {
      if (rows.length) {
        setUserData(rows);
      } else {
        setUserData([]);
      }
      setIsDataLoading(false);
    }
  }, [rows, isLoading]);

  return (
    <Box className="userAccess-section">
      <Box
        className="top-bar-cls"
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        <Typography className="title-cls">{"User Access"}</Typography>
        <Box
          className="filter-section"
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          {userInfo?.allowed_modules.admin_modules.includes("employees") ||
          userInfo?.allowed_modules.owner_modules.includes("employees") ? (
            <Button
              variant="outlined"
              className="create-btn"
              style={{ borderRadius: "12px" }}
              startIcon={<AddIcon />}
              onClick={handleModalOpen}
            >
              <p id="create-btn-text">{"Create"}</p>
            </Button>
          ) : (
            ""
          )}
        </Box>
      </Box>
      {!dataLoading ? (
        <>
          {userData?.length ? (
            <div className="userAccess-main">
              <DataGrid
                className="dataGrid"
                rowHeight={80}
                autoHeight
                rows={[...userData]}
                columns={columns}
                disableColumnFilter
                disableColumnMenu
                disableSelectionOnClick
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
                      cursor: "pointer",
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
                    display: "none",
                  },
                }}
              />
            </div>
          ) : (
            <Box className="error-img">
              <Typography className="error-msg">
                {"No module found!"}
              </Typography>
            </Box>
          )}
        </>
      ) : (
        <>
          <RowSkeletonCard pathString="user/access/" />
        </>
      )}
      <UserModuleModal
        userModuleId={rowCellId}
        userId={paramValue}
        action={action}
        open={openModal}
        handleClose={handleModalClose}
      />
      <DeleteModal
        open={openDeleteModal}
        handleObjDelete={handleModuleDelete}
        handleClose={handleDeleteModalClose}
      />
    </Box>
  );
}
export default UserAccess;
