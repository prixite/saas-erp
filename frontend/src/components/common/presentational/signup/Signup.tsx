import { useContext, useState } from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  TextField,
  Typography,
  Stack,
  CircularProgress,
  Switch,
  FormGroup,
  FormControlLabel,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Field, Form, Formik } from "formik";
import moment from "moment";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import appIcon from "@src/assets/svgs/sidebar.svg";
import {
  AuhtContextInterface,
  AuthContext,
} from "@src/components/hoc/AuthContext";
import { emailRegX, toastAPIError } from "@src/helpers/utils/utils";
import { useApiOwnerOnboardCreateMutation } from "@src/store/api";
import "@src/components/common/presentational/signup/Signup.scss";

const Signup = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext) as AuhtContextInterface;
  if (isAuthenticated) {
    return <Navigate to="/" />;
  }
  const [isEmployee, setIsEmployee] = useState(false);
  const [signup, { isLoading }] = useApiOwnerOnboardCreateMutation();

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
          date_of_joining: "",
          nic: "",
        }}
        validate={(values) => {
          const errors: {
            [key: string]: string;
          } = {};
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
          if (isEmployee) {
            if (!values.date_of_joining) {
              errors.date_of_joining = "Date of joining is required";
            }
            if (isNaN(values.nic)) {
              errors.nic = "Invalid number";
            }
            if (!isNaN(values.nic) && values.nic.length < 10) {
              errors.nic = "Nic should be at least 10 digits";
            }
          }
          return errors;
        }}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          let user_obj = {
            first_name: values.first_name,
            last_name: values.last_name,
            email: values.email,
            organization: {
              name: values.org_name,
              address: values.org_address,
            },
          };
          if (isEmployee) {
            user_obj = {
              ...user_obj,
              employee: {
                date_of_joining: moment(values.date_of_joining).format(
                  "YYYY-MM-DD"
                ),
                nic: values.nic,
              },
            };
          }
          signup({
            ownerOnBoarding: user_obj,
          })
            .unwrap()
            .then(() => {
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
        {() => (
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
            {isEmployee && (
              <>
                <Field
                  name="date_of_joining"
                  render={({ field, form }) => (
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        className="text-field-cls"
                        label="Date Of Joining"
                        value={field.value}
                        onChange={(newValue) => {
                          form.setFieldValue("date_of_joining", newValue);
                        }}
                        renderInput={(params) => (
                          <TextField
                            sx={{
                              "& .MuiInputBase-input": {
                                height: "21px",
                              },
                            }}
                            {...params}
                            InputLabelProps={{ className: "textfield_label" }}
                            error={
                              form.touched.date_of_joining &&
                              form.errors.date_of_joining
                            }
                            helperText={
                              form.touched.date_of_joining &&
                              form.errors.date_of_joining
                            }
                          />
                        )}
                      />
                    </LocalizationProvider>
                  )}
                />
                <Field
                  name="nic"
                  render={({ field, form }) => (
                    <TextField
                      {...field}
                      label="Nic"
                      variant="outlined"
                      margin="normal"
                      error={form.touched.nic && form.errors.nic}
                      helperText={form.touched.nic && form.errors.nic}
                    />
                  )}
                />
              </>
            )}
            <FormGroup>
              <FormControlLabel
                className="light-text"
                control={
                  <Switch
                    checked={isEmployee}
                    onChange={(event) => setIsEmployee(event.target.checked)}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                }
                label="Create self employee?"
              />
            </FormGroup>

            <Stack alignItems="center" mt={3}>
              <LoadingButton
                type="submit"
                className="btn"
                loading={isLoading}
                sx={{ m: "0px" }}
                endIcon={<ArrowForwardIcon />}
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
