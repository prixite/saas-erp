import React, { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import Stack from "@mui/material/Stack";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import * as yup from "yup";
import { timeOut } from "@src/helpers/constants/constants";
import { LocalizationInterface } from "@src/helpers/interfaces/localizationinterfaces";
import { localizedData } from "@src/helpers/utils/language";
import { toastAPIError } from "@src/helpers/utils/utils";
import { useUpdateOwnerPasswordMutation } from "@src/store/reducers/employees-api";
import "@src/components/common/presentational/changePassword/changePassword.scss";

const inputLabelColor = { color: "rgba(0, 0, 0, 0.8) !important" };
function ChangePassword() {
  const [loading, setLoading] = useState(false);
  const [changeOwnerPassword] = useUpdateOwnerPasswordMutation();

  const constantData: LocalizationInterface = localizedData();
  const {
    changePasswordHeading,
    saveBtn,
    passwordMatch,
    currentPasswordRequired,
    newPasswordRequired,
    verifyPasswordRequired,
  } = constantData.ProfilePage;

  const formik = useFormik({
    initialValues: {
      password: "",
      newpassword: "",
      verifynewpassword: "",
    },
    validationSchema: yup.object({
      password: yup.string().required(currentPasswordRequired),
      newpassword: yup.string().required(newPasswordRequired),
      verifynewpassword: yup
        .string()
        .required(verifyPasswordRequired)
        .oneOf([yup.ref("newpassword"), null], passwordMatch),
    }),
    validateOnChange: true,
    onSubmit: () => {
      handleChangePassword();
    },
  });
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
  const handleChangePassword = async () => {
    setLoading(true);
    const updatedObj = getPasswordObject();
    await changeOwnerPassword({ updatedObj: updatedObj })
      .unwrap()
      .then(async () => {
        toast.success("Password successfully updated.", {
          autoClose: timeOut,
          pauseOnHover: false,
        });
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        toastAPIError("Something went wrong.", error.status, error.data);
      });
  };
  const getPasswordObject = () => {
    return {
      password: formik.values.newpassword,
      old_password: formik.values.password,
    };
  };

  return (
    <>
      <form className="passwordPage">
        <div className="password">
          <Typography className="password__heading" gutterBottom>
            {changePasswordHeading}
          </Typography>
          <div className="password__passwordfield">
            <div className="currentPassword">
              <TextField
                className="currentPassword__textfield"
                name="password"
                type={values.showCurrentPassword ? "text" : "password"}
                label="Current Password"
                onChange={formik.handleChange}
                InputProps={{
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
                {formik.touched.password && formik.errors.password}
              </p>
            </div>
            <div className="newPassword">
              <TextField
                className="newPassword__textfield"
                type={values.newPassword ? "text" : "password"}
                label="New Password"
                name="newpassword"
                onChange={formik.handleChange}
                InputProps={{
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
                {formik.touched.newpassword && formik.errors.newpassword}
              </p>
            </div>
            <div className="verifyPassword">
              <TextField
                className="verifyPassword__textfield"
                type={values.verifyPassword ? "text" : "password"}
                label="Verify Password"
                name="verifynewpassword"
                onChange={formik.handleChange}
                InputProps={{
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
                {formik.touched.verifynewpassword &&
                  formik.errors.verifynewpassword}
              </p>
            </div>
          </div>
          <div className="btns">
            <Stack direction="row">
              <LoadingButton
                loading={loading}
                className="btns__saveBtn"
                onClick={() => {
                  formik.handleSubmit();
                }}
              >
                <span className="btns__saveBtn__btnText">{saveBtn}</span>
              </LoadingButton>
            </Stack>
          </div>
        </div>
      </form>
    </>
  );
}

export default ChangePassword;
