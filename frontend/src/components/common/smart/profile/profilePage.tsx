import React, { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import { pink } from "@mui/material/colors";
import Stack from "@mui/material/Stack";
import { useFormik } from "formik";
import * as yup from "yup";
import ProfilePageHeader from "@src/components/common/presentational/profilePageHeader/ProfilePageHeader";
import { LocalizationInterface } from "@src/helpers/interfaces/localizationinterfaces";
import { localizedData } from "@src/helpers/utils/language";
import { useGetUserQuery } from "@src/store/reducers/employees-api";
import "@src/components/common/smart/profile/profilePage.scss";

const inputLabelColor = { color: "rgba(0, 0, 0, 0.8) !important" };
const label = { inputProps: { "aria-label": "Checkbox demo" } };
function ProfilePage() {
  const { data: userData, isSuccess } = useGetUserQuery();

  const constantData: LocalizationInterface = localizedData();
  const {
    basicInformationHeading,
    changePasswordHeading,
    notificationHeading,
    newsLetterLabel,
    billUpdatesLabel,
    newTeamMembersLabel,
    emailSub,
    phoneSub,
    saveBtn,
    cancelBtn,
    firstNameRequired,
    lastNameRequired,
    emailRequired,
    phoneRequired,
  } = constantData.ProfilePage;

  const formik = useFormik({
    initialValues: {
      firstname: userData?.first_name,
      lastname: userData?.last_name,
      email: userData?.email,
      phone: userData?.contact_number || "",
    },
    validationSchema: yup.object({
      firstname: yup
        .string()
        /* eslint-disable-next-line */
        .matches(/^[A-Za-z ]*$/, "First Name must contain pure letters.")
        .required(firstNameRequired),
      lastname: yup
        .string()
        /* eslint-disable-next-line */
        .matches(/^[A-Za-z ]*$/, "Last Name must contain pure letters.")
        .required(lastNameRequired),
      email: yup
        .string()
        .matches(
          /* eslint-disable-next-line */
          /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
          "Incorrect E-mail format!"
        )
        .required(emailRequired),
      phone: yup
        .string()
        /* eslint-disable-next-line */
        .matches(/^(\+1)[0-9]{10}$/, "Phone number must contain numbers only!")
        .required(phoneRequired),
    }),
    validateOnChange: true,
    onSubmit: () => {
      resetForm();
    },
  });

  const resetForm = () => {
    formik.setValues({
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
    });
  };
  const [values, setValues] = useState({
    currentPassword: "",
    showCurrentPassword: false,
    newPassword: false,
    verifyPassword: false,
  });

  const handleClickShowVerifyPassword = () => {
    setValues({
      ...values,
      verifyPassword: !values.verifyPassword,
    });
  };
  const handleClickShowNewPassword = () => {
    setValues({
      ...values,
      newPassword: !values.newPassword,
    });
  };
  const handleClickShowCurrentPassword = () => {
    setValues({
      ...values,
      showCurrentPassword: !values.showCurrentPassword,
    });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };
  return (
    <>
      {isSuccess ? (
        <>
          <ProfilePageHeader />
          <form className="profilePage" onSubmit={formik.handleSubmit}>
            <div className="basicInfo">
              <div className="basicInfo__heading">
                <Typography className="basicInfo__heading__text" gutterBottom>
                  {basicInformationHeading}
                </Typography>
              </div>

              <div className="basicInfo__namesAndEmails">
                <div className="firstName">
                  <TextField
                    className="firstName__textfield"
                    autoComplete="off"
                    id="firstName-id"
                    name="firstname"
                    label="First Name"
                    InputLabelProps={{
                      style: inputLabelColor,
                    }}
                    value={formik.values.firstname}
                    onChange={formik.handleChange}
                    defaultValue={userData.first_name}
                  />
                  <p className="requiredText">
                    {formik.touched.firstname && formik.errors.firstname}
                  </p>
                </div>
                <div className="lastName">
                  <TextField
                    className="lastName__textfield"
                    autoComplete="off"
                    id="lastname_id"
                    name="lastname"
                    label="Last Name"
                    size="medium"
                    InputLabelProps={{
                      style: inputLabelColor,
                    }}
                    value={formik.values.lastname}
                    onChange={formik.handleChange}
                    defaultValue={userData.last_name}
                  />
                  <p className="requiredText">
                    {formik.touched.lastname && formik.errors.lastname}
                  </p>
                </div>
                <div className="email">
                  <TextField
                    className="email__textfield"
                    id="email-id"
                    name="email"
                    type="new-password"
                    label="Email Address"
                    size="medium"
                    inputProps={{
                      autoComplete: "new-password",
                    }}
                    InputLabelProps={{
                      style: inputLabelColor,
                    }}
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    defaultValue={userData.email}
                  />
                  <p className="requiredText">
                    {formik.touched.email && formik.errors.email}
                  </p>
                </div>
              </div>

              <div className="basicInfo__phone">
                <TextField
                  className="textfield"
                  id="phone_id_1"
                  name="phone"
                  type="new-password"
                  label="Phone Number"
                  // placeholder="XX-XXX-XXXXXXX"
                  size="medium"
                  inputProps={{
                    autoComplete: "new-password",
                  }}
                  InputLabelProps={{
                    style: inputLabelColor,
                  }}
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  defaultValue={userData?.contact_number}
                />
                <p className="requiredText">
                  {formik.touched.phone && formik.errors.phone}
                </p>
              </div>
            </div>

            <div className="password">
              <Typography className="password__heading" gutterBottom>
                {changePasswordHeading}
              </Typography>
              <div className="password__passwordfield">
                <div className="currentPassword">
                  <TextField
                    className="currentPassword__textfield"
                    id="currPass_1"
                    type={values.showCurrentPassword ? "text" : "password"}
                    label="Current Password"
                    onChange={handleChange("password")}
                    InputProps={{
                      autoComplete: "new-password",
                      style: inputLabelColor,
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowCurrentPassword}
                            onMouseDown={handleMouseDownPassword}
                          >
                            {values.showCurrentPassword ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>
                <div className="newPassword">
                  <TextField
                    className="newPassword__textfield"
                    id="newPass_1"
                    type={values.newPassword ? "text" : "password"}
                    label="New Password"
                    onChange={handleChange("password")}
                    InputProps={{
                      autoComplete: "new-password",
                      style: inputLabelColor,
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowNewPassword}
                            onMouseDown={handleMouseDownPassword}
                          >
                            {values.newPassword ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>
                <div className="verifyPassword">
                  <TextField
                    className="verifyPassword__textfield"
                    name="password"
                    id="verifyPass_1"
                    type={values.verifyPassword ? "text" : "password"}
                    label="Verify Password"
                    onChange={handleChange("password")}
                    InputProps={{
                      autoComplete: "new-password",
                      style: inputLabelColor,
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowVerifyPassword}
                            onMouseDown={handleMouseDownPassword}
                          >
                            {values.verifyPassword ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="notification">
              <Typography
                className="notification__heading"
                variant="h4"
                gutterBottom
              >
                {notificationHeading}
              </Typography>
              <Grid
                className="notification__checkBoxDiv"
                flexDirection="column"
              >
                <div className="A">
                  <div className="A__billUpdates">{billUpdatesLabel}</div>
                  <div className="A__checkBoxContainer">
                    <div className="A__checkBoxContainer__one">
                      <Checkbox
                        {...label}
                        defaultChecked
                        sx={{
                          color: pink[800],
                          "&.Mui-checked": {
                            color: pink[600],
                          },
                        }}
                      />
                      <Typography variant="subtitle1">{emailSub}</Typography>
                    </div>

                    <div className="A__checkBoxContainer__two">
                      <Checkbox
                        {...label}
                        defaultChecked
                        sx={{
                          color: pink[800],
                          "&.Mui-checked": {
                            color: pink[600],
                          },
                        }}
                      />
                      <Typography variant="subtitle1">{phoneSub}</Typography>
                    </div>
                  </div>
                </div>

                <div className="B">
                  <div className="B__billUpdates">{newTeamMembersLabel}</div>
                  <div className="B__checkBoxContainer">
                    <div className="B__checkBoxContainer__one">
                      <Checkbox
                        {...label}
                        defaultChecked
                        sx={{
                          color: pink[800],
                          "&.Mui-checked": {
                            color: pink[600],
                          },
                        }}
                      />
                      <Typography variant="subtitle1"></Typography>
                    </div>

                    <div className="B__checkBoxContainer__two">
                      <Checkbox
                        {...label}
                        defaultChecked
                        sx={{
                          color: pink[800],
                          "&.Mui-checked": {
                            color: pink[600],
                          },
                        }}
                      />
                      <Typography variant="subtitle1"></Typography>
                    </div>
                  </div>
                </div>

                <div className="C">
                  <div className="C__billUpdates">{newsLetterLabel}</div>
                  <div className="C__checkBoxContainer">
                    <div className="C__checkBoxContainer__one">
                      <Checkbox
                        {...label}
                        defaultChecked
                        sx={{
                          color: pink[800],
                          "&.Mui-checked": {
                            color: pink[600],
                          },
                        }}
                      />
                      <Typography variant="subtitle1"></Typography>
                    </div>

                    <div className="C__checkBoxContainer__two">
                      <Checkbox
                        {...label}
                        defaultChecked
                        sx={{
                          color: pink[800],
                          "&.Mui-checked": {
                            color: pink[600],
                          },
                        }}
                      />
                      <Typography variant="subtitle1"></Typography>
                    </div>
                  </div>
                </div>
              </Grid>
            </div>

            <div className="btns">
              <Stack spacing={2} direction="row">
                <Button
                  onClick={resetForm}
                  className="btns__cancelBtn"
                  style={{ backgroundColor: "transparent" }}
                  variant="contained"
                >
                  <span className="btns__cancelBtn__btnText">{cancelBtn}</span>
                </Button>
                <Button
                  type="submit"
                  className="btns__saveBtn"
                  variant="contained"
                >
                  <span className="btns__saveBtn__btnText">{saveBtn}</span>
                </Button>
              </Stack>
            </div>
          </form>
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default ProfilePage;
