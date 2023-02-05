import { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import DeleteIcon from "@src/assets/svgs/DeleteIcon.svg";
import EditIcon from "@src/assets/svgs/Edit.svg";
import NotfoundIcon from "@src/assets/svgs/notfound.svg";
import RowSkeletonCard from "@src/components/shared/loaders/rowSkeletonCard/RowSkeletonCard";
import DeleteModal from "@src/components/shared/popUps/deleteModal/deleteModal";
import UserModal from "@src/components/shared/popUps/userModal/userModal";
import { timeOut } from "@src/helpers/constants/constants";
import { UserInterface } from "@src/helpers/interfaces/localizationinterfaces";
import { toastAPIError } from "@src/helpers/utils/utils";
import {
  useApiUsersListQuery,
  useApiUsersDestroyMutation,
} from "@src/store/api";
import { useGetFlagsQuery } from "@src/store/reducers/employees-api";
import "@src/components/common/smart/users/users.scss";

function User() {
  const { data: rows = [], isLoading } = useApiUsersListQuery();
  const [deleteUser] = useApiUsersDestroyMutation();
  const [userData, setUserData] = useState<UserInterface[]>([]);
  const [pageSize, setPageSize] = useState<number>(10);
  const { data: Flags = [] } = useGetFlagsQuery();
  const allFlags = Object.assign({}, ...Flags);
  const [dataLoading, setIsDataLoading] = useState(true);
  const [rowCellId, setRowCellId] = useState<number | undefined>(undefined);
  const [action, setAction] = useState("add");
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

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
    await deleteUser({ id: rowCellId as number })
      .unwrap()
      .then(async () => {
        toast.success("User deleted successfully", {
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
      field: "id",
      headerName: "ID",
      sortable: false,
      width: 100,
      renderCell: (cellValues) => {
        return <p style={{ marginLeft: "20px" }}>{cellValues.row.id}</p>;
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
              src={`${cellValues.row.image}`}
              alt="profile pic"
            />
            <p>{`${cellValues.row.first_name} ${cellValues.row.last_name}`}</p>
          </div>
        );
      },
    },
    {
      field: "email",
      headerName: "Email",
      sortable: false,
      width: 300,
      renderCell: (cellValues) => {
        return <p style={{ marginLeft: "20px" }}>{cellValues.row.email}</p>;
      },
    },
    {
      field: "contact_Number",
      headerName: "Contact Number",
      sortable: false,
      width: 300,
      renderCell: (cellValues) => {
        return (
          <p style={{ marginLeft: "20px" }}>{cellValues.row.contact_number}</p>
        );
      },
    },
    {
      field: "default_role",
      headerName: "Default Role",
      sortable: false,
      width: 300,
      renderCell: (cellValues) => {
        return (
          <p style={{ marginLeft: "20px" }}>
            {cellValues.row.default_role.name}
          </p>
        );
      },
    },
    {
      field: "access",
      headerName: "Access",
      width: 200,
      renderCell: (cellValues) => {
        return (
          <p
            onClick={() => navigate(`/users/${cellValues.row.id}/access`)}
            style={{ marginLeft: "20px" }}
          >
            View
          </p>
        );
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
            <IconButton
              onClick={(event) => handleEditModalOpen(event, cellValues.row.id)}
              aria-label="edit"
              id="edit-btn-id"
              className="edit-btn"
            >
              <img className="profile-pic" src={EditIcon} alt="profile pic" />
            </IconButton>
            <IconButton
              onClick={(event) =>
                handleDeleteModalOpen(event, cellValues.row.id)
              }
              aria-label="delete"
              id="delete-btn-id"
              className="delete-btn"
            >
              <img className="profile-pic" src={DeleteIcon} alt="profile pic" />
            </IconButton>
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
    <Box className="user-section">
      <Box
        className="top-bar-cls"
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        <Typography className="title-cls">{"User Module"}</Typography>
        <Button
          variant="outlined"
          className="create-btn"
          style={{ borderRadius: "12px" }}
          startIcon={<AddIcon />}
          onClick={handleModalOpen}
        >
          <p id="create-btn-text">{"Create"}</p>
        </Button>
      </Box>
      {!dataLoading ? (
        <>
          {userData?.length ? (
            <div className="user-main">
              <DataGrid
                className="dataGrid"
                rowHeight={80}
                autoHeight
                rows={[...userData]}
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
                    display: allFlags.show_pagination_module ? "block" : "none",
                  },
                }}
              />
            </div>
          ) : (
            <Box className="error-img">
              <img src={NotfoundIcon} alt="notfound" />
              <Typography className="error-msg">{"No user found!"}</Typography>
            </Box>
          )}
        </>
      ) : (
        <>
          <RowSkeletonCard pathString="user" />
        </>
      )}
      <UserModal
        userId={rowCellId}
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
export default User;
