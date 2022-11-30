import { useState } from "react";
import { Box } from "@mui/material";
import emailIcon from "@src/assets/svgs/Email_Frame.svg";
import phoneIcon from "@src/assets/svgs/Phone.svg";
import ThreeDotter from "@src/assets/svgs/ThreeDotter.svg";
import MenuButtons from "@src/components/shared/menuButtons/menuButtons";
import { EmployeeData } from "@src/helpers/interfaces/employees-modal";
import "@src/components/common/presentational/employeeHeader/employeeHeader.scss";
interface EmployeeHeaderType {
  employeeData?: EmployeeData;
}
function EmployeeHeader({ employeeData }: EmployeeHeaderType) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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
              <p className="paragraph">{employeeData?.type}</p>
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
              {employeeData?.user.contact_number}
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
            <MenuButtons
              anchorEl={anchorEl}
              open={open}
              handleClose={handleClose}
            />
          </Box>
        </div>
      </div>
    </>
  );
}

export default EmployeeHeader;
