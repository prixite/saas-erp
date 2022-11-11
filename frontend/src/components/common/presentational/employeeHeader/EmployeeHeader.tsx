import { useState } from "react";
import { Menu, MenuItem } from "@mui/material";
import "./employeeHeader.scss";
import deleteIcon from "@src/assets/svgs/Delete.svg";
import editIcon from "@src/assets/svgs/Edit.svg";
import profileIcon from "@src/assets/svgs/Ellipse20Pic.svg";
import emailIcon from "@src/assets/svgs/Email_Frame.svg";
import phoneIcon from "@src/assets/svgs/Phone_Frame.svg";
import ThreeDotter from "@src/assets/svgs/ThreeDotter.svg";
import { LocalizationInterface } from "@src/helpers/interfaces/localizationinterfaces";
import { localizedData } from "@src/helpers/utils/language";

function EmployeeHeader() {
  const constantData: LocalizationInterface = localizedData();
  const { editBtn, deleteBtn } = constantData.EmployeeHeader;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <div className="employee-Header-main">
        <div className="empoyee-Header-Div-One">
          {/* <h2>One</h2> */}

          <img
            className="profile-pic"
            src={profileIcon}
            alt="profile pic"
            style={{
              height: "60px",
              width: "60px",
              margin: "24px 12px 24px 24px",
            }}
          />
        </div>
        <div className="employee-Header-Div-Two">
          <div className="div-two-child-one">
            <div className="oneItem-one">Nolan Aminoff</div>
            <div className="oneItem-two">
              <p
                className="textPX"
                style={{
                  fontSize: "12px",
                  lineHeight: "14px",
                  letterSpacing: "-0.011rem",
                  color: "black",
                }}
              >
                PX-01
              </p>
            </div>
            <div className="oneItem-three">
              <p
                style={{
                  width: "58px",
                  height: "14px",
                  fontFamily: "Lato",
                  fontStyle: "normal",
                  fontWeight: "400",
                  fontSize: "12px",
                  lineHeight: "14px",
                  letterSpacing: "-0.011em",
                  color: "#970000",
                  flex: "none",
                  order: "0",
                  flexGrow: "0",
                }}
              >
                Permanent
              </p>
            </div>
          </div>
          <div className="div-two-child-two">
            <div className="twoItem-one">Sr Software Engineer</div>
            <div className="twoItem-two">
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
              <p>nolan.aminoff@gamil.com</p>
            </div>
            <div className="twoItem-three">
              <img
                className="profile-pic"
                src={phoneIcon}
                alt="phone"
                style={{
                  height: "20px",
                  width: "20px",
                  marginRight: "11.33px",
                  background: "rgba(255,205,205, 0.2)",
                }}
              />
              03336722892
            </div>
          </div>
        </div>
        <div className="employee-Header-Div-Three">
          <div className="container-Icon">
            <img
              className="profile-pic"
              src={ThreeDotter}
              onClick={handleClick}
              alt="menu"
              style={{
                height: "20px",
                width: "20px",
                border: "none",
              }}
            />
            <Menu
              PaperProps={{ sx: { width: "115px", height: "92px" } }}
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
                  justifyContent: "space-between",
                  fontSize: "14px",
                  fontWeight: "400",
                }}
                onClick={handleClose}
              >
                <img src={editIcon} alt="edit" />
                {editBtn}
              </MenuItem>
              <MenuItem
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "14px",
                  fontWeight: "400",
                }}
                onClick={handleClose}
              >
                <img src={deleteIcon} alt="delete" />
                {deleteBtn}
              </MenuItem>
            </Menu>
          </div>
        </div>
      </div>
    </>
  );
}

export default EmployeeHeader;
