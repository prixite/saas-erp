import "./employeeHeader.scss";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import profileIcon from "@src/assets/svgs/Ellipse20Pic.svg";
import emailIcon from "@src/assets/svgs/Email_Frame.svg";
import phoneIcon from "@src/assets/svgs/Phone_Frame.svg";
import ThreeDotter from "@src/assets/svgs/ThreeDotter.svg";
import { useGetEmployeeDataQuery } from "@src/store/reducers/employees-api";

function EmployeeHeader() {
  const param = useParams();
  const [paramValue, setParamValue] = useState<number>(0);
  const { data: EmployeeData } = useGetEmployeeDataQuery({ id: paramValue });

  useEffect(() => {
    if (param && param.employeeId !== undefined) {
      setParamValue(parseInt(param.employeeId));
    }
  }, [paramValue]);

  return (
    <>
      <div className="employee-Header-main">
        <div className="empoyee-Header-Div-One">
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
            <div className="oneItem-one">
              {/* FirstName LastName */}
              {EmployeeData?.user?.first_name} {EmployeeData?.user?.last_name}
            </div>
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
            <div className="twoItem-one">
              {/* Designation */}
              {EmployeeData?.designation}
            </div>
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
              <p>
                {/* Email */}
                {EmployeeData?.user.email}
              </p>
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
              {/* Number */}
              {EmployeeData?.contact_number}
            </div>
          </div>
        </div>
        <div className="employee-Header-Div-Three">
          <div className="container-Icon">
            <img
              className="profile-pic"
              src={ThreeDotter}
              alt="menu"
              style={{
                height: "20px",
                width: "20px",
                border: "none",
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default EmployeeHeader;
