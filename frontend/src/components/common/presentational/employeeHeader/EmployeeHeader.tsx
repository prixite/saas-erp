import { useState } from "react";
import { Box, Menu, MenuItem, Typography } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import deleteIcon from "@src/assets/svgs/Delete.svg";
import editIcon from "@src/assets/svgs/Edit.svg";
import emailIcon from "@src/assets/svgs/Email_Frame.svg";
import phoneIcon from "@src/assets/svgs/Phone.svg";
import ThreeDotter from "@src/assets/svgs/ThreeDotter.svg";
import DeleteModal from "@src/components/shared/popUps/deleteModal/deleteModal";
import EmployeeModal from "@src/components/shared/popUps/employeeModal/employeeModal";
import { timeOut } from "@src/helpers/constants/constants";
import { EmployeeData } from "@src/helpers/interfaces/employees-modal";
import "@src/components/common/presentational/employeeHeader/employeeHeader.scss";
import { LocalizationInterface } from "@src/helpers/interfaces/localizationinterfaces";
import { localizedData } from "@src/helpers/utils/language";
import { toastAPIError } from "@src/helpers/utils/utils";
import { useDeleteEmployeeMutation } from "@src/store/reducers/employees-api";
interface EmployeeHeaderType {
  employeeData?: EmployeeData;
}
function EmployeeHeader({ employeeData }: EmployeeHeaderType) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [action, setAction] = useState("add");
  const { employeeId } = useParams();
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [rowCellId, setRowCellId] = useState(0);
  const [deleteEmployee] = useDeleteEmployeeMutation();
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const constantData: LocalizationInterface = localizedData();
  const { editBtn, deleteBtn } = constantData.MenuButtons;
  const { employeeDeleteSuccess } = constantData.Employee;
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleEditModalOpen = () => {
    setAction("edit");
    setRowCellId(Number(employeeId || ""));
    setOpenModal(true);
    handleClose();
  };
  const handleModalClose = () => {
    setOpenModal(false);
  };
  const handleDeleteModalOpen = () => {
    setRowCellId(Number(employeeId || ""));
    setOpenDeleteModal(true);
    handleClose();
  };
  const handleDeleteModalClose = () => {
    setOpenDeleteModal(false);
  };
  const handleEmployeeDelete = async () => {
    await deleteEmployee({
      id: Number(employeeId || ""),
    })
      .unwrap()
      .then(async () => {
        toast.success(employeeDeleteSuccess, {
          autoClose: timeOut,
          pauseOnHover: false,
        });
        handleDeleteModalClose();
        navigate("/employees/");
        handleClose();
      })
      .catch((error) => {
        toastAPIError("Something went wrong.", error.status, error.data);
      });
  };
  return (
    <>
      <div className="employee-Header-main">
        <div className="icon-Container">
          <img
            className="profile-pic"
            src={employeeData?.user?.image}
            alt="profile pic"
          />
        </div>

        <div className="employee-Header-Div-Two">
          <div className="subContainer-row-one">
            <div className="name">
              {employeeData?.user?.first_name} {employeeData?.user?.last_name}
            </div>
            <div className="userID">
              <p className="paragraph">{employeeData?.org_id}</p>
            </div>
            <div className="userStatus">
              <p className="paragraph">{employeeData?.type?.title}</p>
            </div>
          </div>

          <div className="subContainer-row-two">
            <div className="designation">{employeeData?.designation}</div>
            <div className="email">
              <img
                className="profile-pic"
                src={emailIcon}
                alt="email"
                style={{
                  height: "20px",
                  width: "20px",
                  marginRight: "10.5px",
                }}
              />
              <p>{employeeData?.user?.email}</p>
            </div>
            <div className="contact">
              <img
                className="profile-pic"
                src={phoneIcon}
                alt="phone"
                style={{
                  height: "20px",
                  width: "20px",
                  marginRight: "11.33px",
                  background: "transparent",
                }}
              />
              {employeeData?.user?.contact_number}
            </div>
          </div>
        </div>

        <div className="employee-Header-Div-Three">
          <Box sx={{ cursor: "pointer" }} className="container-Icon">
            <img
              onClick={handleClick}
              className="profile-pic"
              src={ThreeDotter}
              alt="menu"
            />
            <Menu
              PaperProps={{
                sx: { width: "115px", height: "95px", overflow: "hidden" },
              }}
              id="demo-positioned-menu"
              aria-labelledby="client-options-button"
              anchorEl={anchorEl}
              open={open}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              className="dropdownMenu"
              onClose={handleClose}
            >
              <MenuItem
                sx={{
                  display: "flex",
                  fontSize: "14px",
                  fontWeight: "400",
                  marginTop: "3px",
                }}
                onClick={handleEditModalOpen}
              >
                <img src={editIcon} alt="edit" />
                <Typography sx={{ ml: "18px" }}>{editBtn}</Typography>
              </MenuItem>
              <MenuItem
                sx={{
                  display: "flex",
                  fontSize: "14px",
                  fontWeight: "400",
                }}
                onClick={() => handleDeleteModalOpen()}
              >
                <img src={deleteIcon} alt="delete" />
                <Typography sx={{ ml: "18px" }}>{deleteBtn}</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </div>
      </div>
      <EmployeeModal
        empId={rowCellId}
        action={action}
        open={openModal}
        handleClose={handleModalClose}
      />
      <DeleteModal
        open={openDeleteModal}
        handleEmployeeDelete={handleEmployeeDelete}
        handleClose={handleDeleteModalClose}
      />
    </>
  );
}

export default EmployeeHeader;
