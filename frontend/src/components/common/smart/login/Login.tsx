import { useContext, useState } from "react";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Checkbox,
  Typography,
  FormControlLabel,
  Stack,
} from "@mui/material";
import { Field, Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import HideIcon from "@src/assets/svgs/HideIcon.svg";
import showIcon from "@src/assets/svgs/Show.svg";
import appIcon from "@src/assets/svgs/sidebar.svg";
import { useApiTokenCreateMutation } from "@src/store/api";
import "@src/components/common/smart/login/login.scss";
import { AuthContext } from "@src/components/hoc/AuthContext";

const Login = () => {
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const [generateToken] = useApiTokenCreateMutation();

  const { signIn } = useContext(AuthContext);

  return (
    <Box className="container">
      <img src={appIcon} className="logo" />
      <Typography className="bold-text lg-text">
        {"SaaS"} <span className="red-text">{"ERP"}</span>
      </Typography>
      <Typography mt={3} className="bold-text">
        {"Welcome Back!☀️"}
      </Typography>
      <Typography className="light-text" fontWeight={700} mt={1} mb={5}>
        {"Please enter your details to login to the system."}
      </Typography>
      <Formik
        initialValues={{ email: "", password: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            errors.email = "Email is required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }
          if (!values.password) {
            errors.password = "Password isrequired";
          }
          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const resp = await generateToken({ authToken: values }).unwrap();
            localStorage.setItem("token", resp.token);
            signIn();
            navigate("/");
          } catch (error) {
            toast.error(error.data.error[0]);
          }
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
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
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <FormControlLabel
                control={<Checkbox name="rememberMe" />}
                label="Remember me"
                checked={rememberMe}
                className="light-text"
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <Typography
                className="light-text pointer"
                onClick={() => navigate("/forgot-password")}
              >
                {"Forgot Password"}
              </Typography>
            </Stack>
            <Stack alignItems="center" mt={3}>
              <Button
                type="submit"
                className="btn"
                variant="contained"
                disabled={isSubmitting}
              >
                Login
              </Button>
              <Typography mt={5}>
                {"Don’t have an account yet? "}
                <span
                  onClick={() => navigate("/signup")}
                  className="red-text pointer"
                >
                  {"Sign Up"}
                </span>
              </Typography>
            </Stack>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default Login;
