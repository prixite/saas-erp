import { Box, Button, TextField, Typography, Stack } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import appIcon from "@src/assets/svgs/sidebar.svg";
import backIcon from "@src/assets/svgs/thinbackarrow.svg";
import { LocalizationInterface } from "@src/helpers/interfaces/localizationinterfaces";
import "@src/components/common/presentational/forgotPassword/forgotPassword.scss";
import { localizedData } from "@src/helpers/utils/language";
import { emailRegX } from "@src/helpers/utils/utils";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const constantData: LocalizationInterface = localizedData();
  const {
    saas,
    erp,
    forgot_password_title,
    forgot_password_desc,
    email_text,
    reset_password_btn,
    Back_to,
    login_text,
    email_required_text,
    invalid_email_text,
  } = constantData.AuthPages;
  return (
    <Box className="forgot-container">
      <img src={appIcon} className="logo" />
      <Typography className="bold-text lg-text">
        {saas} <span className="red-text">{erp}</span>
      </Typography>
      <Typography mt={3} className="bold-text">
        {forgot_password_title}
      </Typography>
      <Typography className="light-text" fontWeight={700} mt={1} mb={5}>
        {forgot_password_desc}
      </Typography>
      <Formik
        initialValues={{ email: "", password: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            errors.email = { email_required_text };
          } else if (!emailRegX.test(values.email)) {
            errors.email = { invalid_email_text };
          }
          return errors;
        }}
        // onSubmit={async () => {}}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field
              name="email"
              render={({ field, form }) => (
                <TextField
                  {...field}
                  label={email_text}
                  sx={{ width: "455px" }}
                  variant="outlined"
                  margin="normal"
                  error={form.touched.email && form.errors.email}
                  helperText={form.touched.email && form.errors.email}
                />
              )}
            />
            <Stack alignItems="center" mt={3}>
              <Button
                type="submit"
                className="btn"
                variant="contained"
                disabled={isSubmitting}
              >
                {reset_password_btn}
              </Button>
              <Box className="move-to-login" onClick={() => navigate("/login")}>
                <Box className="back-btn-cls">
                  <img src={backIcon} alt="back" />
                </Box>
                <Typography mt={5}>
                  {Back_to}{" "}
                  <span className="red-text pointer">{login_text}</span>
                </Typography>
              </Box>
            </Stack>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default ForgotPassword;
