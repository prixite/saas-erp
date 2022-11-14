import profileIcon from "@src/assets/svgs/Ellipse20Pic.svg";
import emailIcon from "@src/assets/svgs/Email_Frame.svg";
import phoneIcon from "@src/assets/svgs/Phone_Frame.svg";
import ThreeDotter from "@src/assets/svgs/ThreeDotter.svg";
import { EmployeeData } from "@src/helpers/interfaces/employees-modal";
import "@src/components/common/presentational/employeeHeader/employeeHeader.scss";
interface EmployeeHeaderType {
  employeeData?: EmployeeData;
}
function EmployeeHeader({ employeeData }: EmployeeHeaderType) {
  return (
    <>
      <div className="employee-Header-main">
        <div className="iconContainer">
          <img className="profile-pic" src={profileIcon} alt="profile pic" />
        </div>

        <div className="employee-Header-Div-Two">
          <div className="subContainer-row-one">
            <div className="name">
              {employeeData?.user?.first_name} {employeeData?.user?.last_name}
            </div>
            <div className="userID">
              <p className="userID">PX-01</p>
            </div>
            <div className="userStatus">
              <p className="paragraph">Permanent</p>
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
                  background: "rgba(255,205,205, 0.2)",
                }}
              />
              {employeeData?.contact_number}
            </div>
          </div>
        </div>

        <div className="employee-Header-Div-Three">
          <div className="container-Icon">
            <img className="profile-pic" src={ThreeDotter} alt="menu" />
          </div>
        </div>
      </div>
    </>
  );
}

export default EmployeeHeader;
