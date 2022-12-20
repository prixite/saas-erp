import { useRef } from "react";
import { Box } from "@mui/material";
import { useFormik } from "formik";

import cameraIcon from "@src/assets/svgs/camera.svg";
import emailIcon from "@src/assets/svgs/Email_Frame.svg";
import phoneIcon from "@src/assets/svgs/Phone.svg";
import PreviewImage from "@src/components/common/presentational/previewImage/previewImage";
import { useGetUserQuery } from "@src/store/reducers/employees-api";

import "@src/components/common/presentational/profilePageHeader/profilePageHeader.scss";

function ProfilePageHeader() {
  const { data: userData } = useGetUserQuery();
  const fileRef = useRef<HTMLInputElement>(null);
  const formik = useFormik({
    initialValues: {
      file: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <>
      <div className="profile-Header-main">
        <div className="icon-Container">
          <input
            ref={fileRef}
            hidden
            type="file"
            onChange={(e) => {
              formik.setFieldValue(
                "file",
                (e.target as HTMLInputElement)?.files?.[0]
              );
            }}
          />
          {formik.values.file ? (
            <PreviewImage file={formik.values.file} />
          ) : (
            <img
              className="profile-pic"
              src={userData?.image}
              alt="profile pic"
            />
          )}
          <Box
            className="upload-btn-icon"
            onClick={() => {
              fileRef?.current?.click();
            }}
          >
            <img className="upload-pic" src={cameraIcon} alt="upload pic" />
          </Box>
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
