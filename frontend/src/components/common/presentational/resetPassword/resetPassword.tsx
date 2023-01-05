import { useEffect, useState } from "react";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  Stack,
} from "@mui/material";
import { Field, Form, Formik } from "formik";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import HideIcon from "@src/assets/svgs/HideIcon.svg";
import showIcon from "@src/assets/svgs/Show.svg";
import appIcon from "@src/assets/svgs/sidebar.svg";
import { LocalizationInterface } from "@src/helpers/interfaces/localizationinterfaces";
import { localizedData } from "@src/helpers/utils/language";
import {
  useApiPasswordResetConfirmCreateMutation,
  useApiPasswordResetCompleteCreateMutation,
} from "@src/store/api";
import "@src/components/common/presentational/resetPassword/resetPassword.scss";

const ResetPassword = () => {
  const constantData: LocalizationInterface = localizedData();
  const {
    saas,
    erp,
    reset_password_title,
    reset_password_desc,
    save_password_text,
    password_text,
    confirm_password_text,
  } = constantData.AuthPages;

  const [confirm_password, { isSuccess }] =
    useApiPasswordResetConfirmCreateMutation();
  const [resetPassword] = useApiPasswordResetCompleteCreateMutation();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const navigate = useNavigate();

  useEffect(() => {
    confirm_password({
      passwordResetConfirm: {
        uidb64: params.get("uidb64"),
        token: params.get("token"),
      },
    })
      .unwrap()
      .catch(() => {
        toast.error("Something went wrong");
        navigate("/");
      });
  }, []);

  if (!params.get("token") || !params.get("uidb64")) {
    return <Navigate to="/login" />;
  }

  return (
    <Box className="reset-container">
      <img src={appIcon} className="logo" />
      <Typography className="bold-text lg-text">
        {saas} <span className="red-text">{erp}</span>
      </Typography>
      <Typography mt={3} className="bold-text">
        {reset_password_title}
      </Typography>
      <Typography className="light-text" fontWeight={700} mt={1} mb={5}>
        {reset_password_desc}
      </Typography>
      {isSuccess && (
        <Formik
          initialValues={{ password: "", confirm_password: "" }}
          validate={(values) => {
            const errors = {};
            if (!values.password) {
              errors.password = "Password is required";
            }
            if (!values.password) {
              errors.confirm_password = "Confirm Password is required";
            }
            if (values.password !== values.confirm_password) {
              errors.confirm_password = "Passwords do not match";
            }
            return errors;
          }}
          onSubmit={async (values) => {
            resetPassword({
              passwordResetComplete: {
                uidb64: params.get("uidb64"),
                password: values.password,
                password2: values.confirm_password,
              },
            })
              .unwrap()
              .then(() => {
                toast.success("Password reset successful");
                navigate("/");
              })
              .catch((err) => {
                toast.error(
                  err.data.password[0] ||
                    err.data.password2[0] ||
                    "Could not change password"
                );
              });
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Field
                name="password"
                type="password"
                render={({ field, form }) => {
                  const [showPassword, setShowPassword] = useState(false);
                  return (
                    <TextField
                      {...field}
                      label={password_text}
                      variant="outlined"
                      margin="normal"
                      error={form.touched.password && form.errors.password}
                      helperText={form.touched.password && form.errors.password}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              <img
                                className="eye"
                                src={showPassword ? showIcon : HideIcon}
                                alt="eye"
                              />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      type={showPassword ? "text" : "password"}
                    />
                  );
                }}
              />
              <Field
                name="confirm_password"
                type="password"
                render={({ field, form }) => {
                  const [showPassword, setShowPassword] = useState(false);
                  return (
                    <TextField
                      {...field}
                      label={confirm_password_text}
                      variant="outlined"
                      margin="normal"
                      error={
                        form.touched.confirm_password &&
                        form.errors.confirm_password
                      }
                      helperText={
                        form.touched.confirm_password &&
                        form.errors.confirm_password
                      }
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              <img
                                className="eye"
                                src={showPassword ? showIcon : HideIcon}
                                alt="eye"
                              />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      type={showPassword ? "text" : "password"}
                    />
                  );
                }}
              />
              <Stack alignItems="center" mt={3}>
                <Button
                  type="submit"
                  className="btn"
                  variant="contained"
                  disabled={isSubmitting}
                >
                  {save_password_text}
                </Button>
              </Stack>
            </Form>
          )}
        </Formik>
      )}
    </Box>
  );
};

export default ResetPassword;
