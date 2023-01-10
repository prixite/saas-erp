import { useContext } from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {
  Box,
  Button,
  TextField,
  Typography,
  Stack,
  CircularProgress,
} from "@mui/material";
import { Field, Form, Formik } from "formik";
import { Navigate, useNavigate } from "react-router-dom";
import {
  AuhtContextInterface,
  AuthContext,
} from "@src/components/hoc/AuthContext";
import appIcon from "@src/assets/svgs/sidebar.svg";
import { emailRegX } from "@src/helpers/utils/utils";
import { useApiOwnerOnboardCreateMutation } from "@src/store/api";
import "@src/components/common/presentational/signup/Signup.scss";
import { toastAPIError } from "@src/helpers/utils/utils";
import { LoadingButton } from "@mui/lab";
import { toast } from "react-toastify";

const Signup = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext) as AuhtContextInterface;
  const [signup, { isLoading }] = useApiOwnerOnboardCreateMutation();

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

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
          first_name: "",
          last_name: "",
          email: "",
          org_name: "",
          org_address: "",
        }}
        validate={(values) => {
          const errors = {};
          if (!values.first_name) {
            errors.first_name = "First name is required";
          }
          if (!values.last_name) {
            errors.last_name = "Last name is required";
          }
          if (!values.email) {
            errors.email = "Email is required";
          } else if (!emailRegX.test(values.email)) {
            errors.email = "Invalid email address";
          }
          if (!values.org_name) {
            errors.org_name = "Organization name is required";
          }
          if (!values.org_address) {
            errors.org_address = "Organization address is required";
          }
          return errors;
        }}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          signup({
            ownerOnBoarding: {
              first_name: values.first_name,
              last_name: values.last_name,
              email: values.email,
              organization: {
                name: values.org_name,
                address: values.org_address,
              },
            },
          })
            .unwrap()
            .then((data) => {
              resetForm();
              setSubmitting(false);
              toast.success(
                "Please follow the instructions we sent to your email to reset your password."
              );
            })
            .catch((error) => {
              toastAPIError("Something went wrong.", error.status, error.data);
            });
        }}
      >
        {({ isSubmitting }) => (
          <Form className="signupForm">
            <Field
              name="first_name"
              render={({ field, form }) => (
                <TextField
                  {...field}
                  label="First Name"
                  variant="outlined"
                  margin="normal"
                  error={form.touched.first_name && form.errors.first_name}
                  helperText={form.touched.first_name && form.errors.first_name}
                />
              )}
            />
            <Field
              name="last_name"
              render={({ field, form }) => (
                <TextField
                  {...field}
                  label="Last Name"
                  variant="outlined"
                  margin="normal"
                  error={form.touched.last_name && form.errors.last_name}
                  helperText={form.touched.last_name && form.errors.last_name}
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
              name="org_name"
              render={({ field, form }) => (
                <TextField
                  {...field}
                  label="Organization Name"
                  variant="outlined"
                  margin="normal"
                  error={form.touched.org_name && form.errors.org_name}
                  helperText={form.touched.org_name && form.errors.org_name}
                />
              )}
            />
            <Field
              name="org_address"
              render={({ field, form }) => (
                <TextField
                  {...field}
                  label="Organization Address"
                  variant="outlined"
                  margin="normal"
                  error={form.touched.org_address && form.errors.org_address}
                  helperText={
                    form.touched.org_address && form.errors.org_address
                  }
                />
              )}
            />
            <Stack alignItems="center" mt={3}>
              <LoadingButton
                type="submit"
                className="btn"
                loading={isLoading}
                sx={{ m: "0px" }}
                loadingIndicator={
                  <CircularProgress
                    sx={{
                      color: "white",
                    }}
                    size={16}
                  />
                }
              >
                {"Create an account"}
              </LoadingButton>
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
