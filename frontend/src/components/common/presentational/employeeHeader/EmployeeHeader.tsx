import { useState } from "react";
import { Box, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import emailIcon from "@src/assets/svgs/Email_Frame.svg";
import NotfoundIcon from "@src/assets/svgs/notfound.svg";
import phoneIcon from "@src/assets/svgs/Phone.svg";
import ThreeDotter from "@src/assets/svgs/ThreeDotter.svg";
import MenuButtons from "@src/components/shared/menuButtons/menuButtons";
import { employeeConstants } from "@src/helpers/constants/constants";
import { EmployeeData } from "@src/helpers/interfaces/employees-modal";
import { LocalizationInterface } from "@src/helpers/interfaces/localizationinterfaces";
import { localizedData } from "@src/helpers/utils/language";
import "@src/components/common/presentational/employeeHeader/employeeHeader.scss";
interface EmployeeHeaderType {
  employeeData?: EmployeeData;
  isLoading: boolean;
}
function EmployeeHeader({ employeeData, isLoading }: EmployeeHeaderType) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const constantData: LocalizationInterface = localizedData();
  const { notFound } = constantData.Employee;
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className="employee-Header-main">
      {!isLoading ? (
        <>
          {employeeData ? (
            <>
              <div className="icon-Container">
                <img
                  className="profile-pic"
                  src={employeeData?.user?.avatar}
                  alt="profile pic"
                />
              </div>

              <div className="employee-Header-Div-Two">
                <div className="subContainer-row-one">
                  <div className="name">
                    {employeeData?.user?.first_name}{" "}
                    {employeeData?.user?.last_name}
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
                    {employeeData?.contact_number}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <Box className="error-img">
              <img src={NotfoundIcon} alt="notfound" />
              <Typography className="error-msg">
                {employeeConstants.employeesdetail}
                {notFound}
              </Typography>
            </Box>
          )}
        </>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            mt: "25px",
          }}
        >
          <CircularProgress />
        </Box>
      )}

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
  );
}

export default EmployeeHeader;
