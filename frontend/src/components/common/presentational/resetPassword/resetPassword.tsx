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
import { Field, Form, Formik } from "formik";
import HideIcon from "@src/assets/svgs/HideIcon.svg";
import showIcon from "@src/assets/svgs/Show.svg";
import appIcon from "@src/assets/svgs/sidebar.svg";
import { LocalizationInterface } from "@src/helpers/interfaces/localizationinterfaces";
import "@src/components/common/presentational/resetPassword/resetPassword.scss";
import { localizedData } from "@src/helpers/utils/language";

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
    password_required_text,
    confirm_password_required_text,
  } = constantData.AuthPages;
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
      <Formik
        initialValues={{ email: "", password: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.password) {
            errors.password = { password_required_text };
          }
          if (!values.password) {
            errors.confirm_password = { confirm_password_required_text };
          }
          return errors;
        }}
        // onSubmit={async () => {}}
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
    </Box>
  );
};

export default ResetPassword;
