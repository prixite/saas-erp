import { useState } from "react";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  Stack,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import { emailRegX, phoneRegex } from "@src/helpers/utils/utils";
import HideIcon from "@src/assets/svgs/HideIcon.svg";
import showIcon from "@src/assets/svgs/Show.svg";
import appIcon from "@src/assets/svgs/sidebar.svg";
import "@src/components/common/smart/signup/Signup.scss";

const Signup = () => {
  const navigate = useNavigate();

  return (
    <Box className="signup_container">
      <img src={appIcon} className="logo" />
      <Typography className="bold-text lg-text">
        {"SaaS"} <span className="red-text">{"ERP"}</span>
      </Typography>
      <Typography mt={3} className="bold-text">
        {"Create an account 🚀"}
      </Typography>
      <Typography className="light-text" fontWeight={700} mt={1} mb={5}>
        {"Let’s get started and create your account."}
      </Typography>
      <Formik
        initialValues={{
          fullname: "",
          email: "",
          phone_number: "",
          password: "",
          confirm_password: "",
        }}
        validate={(values) => {
          console.log("phoneRegex", phoneRegex.test(values.phone_number));
          const errors = {};
          if (!values.fullname) {
            errors.fullname = "Name is required";
          }
          if (!values.email) {
            errors.email = "Email is required";
          } else if (!emailRegX.test(values.email)) {
            errors.email = "Invalid email address";
          }
          if (!values.phone_number) {
            errors.phone_number = "Phone number is required";
          } else if (!phoneRegex.test(values.phone_number)) {
            errors.phone_number = "Invalid phone number";
          }
          if (!values.password) {
            errors.password = "Password is required";
          }
          if (!values.confirm_password) {
            errors.confirm_password = "Confirm password is required";
          } else if (
            values.password &&
            values.confirm_password != values.password
          ) {
            errors.confirm_password = "Passwords do not match";
          }
          return errors;
        }}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          // eslint-disable-next-line no-unused-vars
          resetForm();
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="signupForm">
            <Field
              name="fullname"
              render={({ field, form }) => (
                <TextField
                  {...field}
                  label="Full Name"
                  variant="outlined"
                  margin="normal"
                  error={form.touched.fullname && form.errors.fullname}
                  helperText={form.touched.fullname && form.errors.fullname}
                />
              )}
            />
            <Field
              name="email"
              render={({ field, form }) => (
                <TextField
                  {...field}
                  label="Email Address"
                  variant="outlined"
                  margin="normal"
                  error={form.touched.email && form.errors.email}
                  helperText={form.touched.email && form.errors.email}
                />
              )}
            />
            <Field
              name="phone_number"
              render={({ field, form }) => (
                <TextField
                  {...field}
                  label="Phone Number"
                  variant="outlined"
                  margin="normal"
                  error={form.touched.phone_number && form.errors.phone_number}
                  helperText={
                    form.touched.phone_number && form.errors.phone_number
                  }
                />
              )}
            />
            <Field
              name="password"
              type="password"
              render={({ field, form }) => {
                const [showPassword, setShowPassword] = useState(false);
                return (
                  <TextField
                    {...field}
                    label="Password"
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
                    label="Confirm Password"
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
                endIcon={<ArrowForwardIcon />}
              >
                {"Create an account"}
              </Button>
              <Typography mt={5}>
                {"Alreday have an account? "}
                <span
                  onClick={() => navigate("/login")}
                  className="red-text pointer"
                >
                  {"Login"}
                </span>
              </Typography>
            </Stack>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default Signup;
