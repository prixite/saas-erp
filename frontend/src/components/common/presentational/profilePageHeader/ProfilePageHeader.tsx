import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import profileIcon from "@src/assets/svgs/Ellipse20Pic.svg";
import emailIcon from "@src/assets/svgs/Email_Frame.svg";
import "@src/components/common/presentational/profilePageHeader/profilePageHeader.scss";

function ProfilePageHeader() {
  return (
    <>
      <div className="profile-Header-main">
        <div className="icon-Container">
          <img className="profile-pic" src={profileIcon} alt="profile pic" />
        </div>

        <div className="employee-Header-Div-Two">
          <div className="subContainer-row-one">
            <div className="name">
              {/* {employeeData?.user?.first_name} {employeeData?.user?.last_name} */}
              Akita
            </div>
          </div>

          <div className="subContainer-row-two">
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
              <p>Email</p>
              {/* <p>{employeeData?.user?.email}</p> */}
            </div>
            <div className="contact">
              <AccountCircleIcon />

              <p className="contactNumber">Number</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfilePageHeader;
