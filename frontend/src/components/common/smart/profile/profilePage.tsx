import React, { useEffect, useState } from "react";
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
import { useApiChangePasswordPartialUpdateMutation } from "@src/store/api";
import { useGetUserQuery } from "@src/store/reducers/employees-api";

import "@src/components/common/smart/profile/profilePage.scss";

const inputLabelColor = { color: "rgba(0, 0, 0, 0.8) !important" };
const label = { inputProps: { "aria-label": "Checkbox demo" } };
function ProfilePage() {
  const { data: userData, isSuccess } = useGetUserQuery();
  const [changePassword] = useApiChangePasswordPartialUpdateMutation();

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

  /* eslint-disable-next-line */
  const passwordReg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  /* eslint-disable-next-line */
  const nameRegex = /^[A-Za-z]*$/;
  const phoneRegex =
    /* eslint-disable-next-line */
    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
  /* eslint-disable-next-line */
  const emailRegex =
    /* eslint-disable-next-line */
    /^[^<>()[\]\\,;:\%#^\s@\"$*&/!@]+@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z0-9]+\.)+[a-zA-Z]{2,}))$/;

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      currentPassword: "",
      password: "",
      verifyPassword: "",
    },
    validationSchema: yup.object({
      firstname: yup
        .string()
        .matches(nameRegex, "First Name is required!")
        .required(firstNameRequired),
      lastname: yup
        .string()
        .matches(nameRegex, "Last Name is required!")
        .required(lastNameRequired),
      email: yup
        .string()
        .matches(emailRegex, "Invalid email!")
        .required(emailRequired),
      phone: yup
        .string()
        .matches(phoneRegex, "Invalid phone number!")
        .required(phoneRequired),
      currentPassword: yup.string(),
      password: yup.string().matches(passwordReg, "Not a strong password!"),
      verifyPassword: yup.string().when("password", {
        is: (val) => (val && val.length > 0 ? true : false),
        then: yup
          .string()
          .oneOf([yup.ref("password")], "Typed password does not match!"),
      }),
    }),
    validateOnChange: true,
    onSubmit: async (values) => {
      if (
        values.currentPassword.length &&
        values.password.length &&
        values.verifyPassword.length
      ) {
        const PatchedUserPassword = await {
          password: values.password.toString(), // New Password
          old_password: values.currentPassword.toString(), //current Password
        };
        await changePassword({
          patchedUserPassword: PatchedUserPassword,
        });
        resetForm();
      }
      resetForm();
    },
  });

  useEffect(() => {
    if (userData && isSuccess) {
      formik.setValues({
        email: userData?.email || "",
        firstname: userData?.first_name || "",
        lastname: userData?.last_name || "",
        phone: userData?.contact_number || "",
        currentPassword: "",
        password: "",
        verifyPassword: "",
      });
    }
  }, [userData, isSuccess]);

  const resetForm = () => {
    formik.setValues({
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      currentPassword: "",
      password: "",
      verifyPassword: "",
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
  return (
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
                onChange={(e) => {
                  if (nameRegex.test(e.target.value)) {
                    formik.handleChange(e);
                  }
                }}
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
                onChange={(e) => {
                  if (nameRegex.test(e.target.value)) {
                    formik.handleChange(e);
                  }
                }}
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
                onChange={(e) => {
                  formik.setFieldTouched("email");
                  formik.handleChange(e);
                }}
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
              type="phone"
              label="Phone Number"
              size="medium"
              inputProps={{
                autoComplete: "new-password",
              }}
              InputLabelProps={{
                style: inputLabelColor,
              }}
              value={formik.values.phone}
              onChange={(e) => {
                formik.setFieldTouched("phone");
                formik.handleChange(e);
              }}
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
                name="currentPassword"
                type={values.showCurrentPassword ? "text" : "password"}
                label="Current Password"
                value={formik.values.currentPassword}
                onChange={(e) => {
                  formik.setFieldTouched("currentPassword");
                  formik.handleChange(e);
                }}
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
              <p className="requiredText">
                {formik.touched.currentPassword &&
                  formik.errors.currentPassword}
              </p>
            </div>
            <div className="newPassword">
              <TextField
                className="newPassword__textfield"
                id="password"
                name="password"
                type={values.newPassword ? "text" : "password"}
                label="New Password"
                value={formik.values.password}
                onChange={(e) => {
                  formik.handleChange(e);
                  formik.setFieldTouched("password");
                }}
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
              <p className="requiredText">
                {formik.touched.password && formik.errors.password}
              </p>
            </div>
            <div className="verifyPassword">
              <TextField
                className="verifyPassword__textfield"
                id="verifyPass_1"
                name="verifyPassword"
                type={values.verifyPassword ? "text" : "password"}
                label="Verify Password"
                value={formik.values.verifyPassword}
                onChange={(e) => {
                  formik.setFieldTouched("verifyPassword");
                  formik.handleChange(e);
                }}
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
              <p className="requiredText">
                {formik.touched.verifyPassword && formik.errors.verifyPassword}
              </p>
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
          <Grid className="notification__checkBoxDiv" flexDirection="column">
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
            <Button type="submit" className="btns__saveBtn" variant="contained">
              <span className="btns__saveBtn__btnText">{saveBtn}</span>
            </Button>
          </Stack>
        </div>
      </form>
    </>
  );
}

export default ProfilePage;
