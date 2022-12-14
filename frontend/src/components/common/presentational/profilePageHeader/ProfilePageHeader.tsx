import emailIcon from "@src/assets/svgs/Email_Frame.svg";
import phoneIcon from "@src/assets/svgs/Phone.svg";
import { useGetUserQuery } from "@src/store/reducers/employees-api";
import "@src/components/common/presentational/profilePageHeader/profilePageHeader.scss";

function ProfilePageHeader() {
  const { data: userData } = useGetUserQuery();
  return (
    <>
      <div className="profile-Header-main">
        <div className="icon-Container">
          <img
            className="profile-pic"
            src={userData?.image}
            alt="profile pic"
          />
        </div>

        <div className="employee-Header-Div-Two">
          <div className="subContainer-row-one">
            <div className="name">
              {userData?.first_name} {userData?.last_name}
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
              <p>{userData?.email}</p>
            </div>
            <div className="contact">
              <img
                className="profile-pic"
                src={phoneIcon}
                alt="email"
                style={{
                  height: "20px",
                  width: "20px",
                  marginRight: "10.5px",
                }}
              />
              <p>{userData?.contact_number}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfilePageHeader;
