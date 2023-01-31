import { useState, useEffect } from "react";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid, GridCellParams, GridColDef } from "@mui/x-data-grid";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import DeleteIcon from "@src/assets/svgs/DeleteIcon.svg";
import EditIcon from "@src/assets/svgs/Edit.svg";
import NotfoundIcon from "@src/assets/svgs/notfound.svg";
import ShowIcon from "@src/assets/svgs/ShowIcon.svg";
import HeadBar from "@src/components/common/smart/dashboard/headbar/HeadBar";
import RowSkeletonCard from "@src/components/shared/loaders/rowSkeletonCard/RowSkeletonCard";
import DeleteModal from "@src/components/shared/popUps/deleteModal/deleteModal";
import EmployeeModal from "@src/components/shared/popUps/employeeModal/employeeModal";
import { employeeConstants, timeOut } from "@src/helpers/constants/constants";
import { Employee } from "@src/helpers/interfaces/employees-modal";
import {
  LocalizationInterface,
  UserInterface,
} from "@src/helpers/interfaces/localizationinterfaces";
import { localizedData } from "@src/helpers/utils/language";
import { toastAPIError } from "@src/helpers/utils/utils";
import {
  useGetEmployeesQuery,
  useGetFlagsQuery,
  useDeleteEmployeeMutation,
  useGetUserQuery,
} from "@src/store/reducers/employees-api";
import { useApiUsersListQuery } from "@src/store/api";
import "@src/components/common/smart/users/users.scss";

function User() {
  const { data: rows = [], isLoading } = useApiUsersListQuery();
  const constantData: LocalizationInterface = localizedData();
  const { notFound, employeeDeleteSuccess } = constantData.Employee;
  const [userData, setUserData] = useState<UserInterface[]>([]);
  const { data: userInfo } = useGetUserQuery();
  const [pageSize, setPageSize] = useState<number>(10);
  const [deleteEmployee] = useDeleteEmployeeMutation();
  const { data: Flags = [] } = useGetFlagsQuery();
  const allFlags = Object.assign({}, ...Flags);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [dataLoading, setIsDataLoading] = useState(true);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const [rowCellId, setRowCellId] = useState<number>(0);
  const [action, setAction] = useState("add");
  const [openModal, setOpenModal] = useState(false);

  const handleModalOpen = () => {
    setOpenModal(true);
  };
  const handleModalClose = () => {
    setOpenModal(false);
  };

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
          <p style={{ marginLeft: "20px" }}>{cellValues.row.default_role}</p>
        );
      },
    },
    {
      field: "access",
      headerName: "Access",
      width: 300,
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
      <EmployeeModal
        empId={rowCellId}
        action={action}
        open={openModal}
        handleClose={handleModalClose}
      />
    </Box>
  );
}
export default User;
