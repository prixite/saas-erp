import React, { Fragment, useState } from "react";
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
import ProfilePageHeader from "@src/components/common/presentational/profilePageHeader/ProfilePageHeader";
import { LocalizationInterface } from "@src/helpers/interfaces/localizationinterfaces";
import { localizedData } from "@src/helpers/utils/language";

import "@src/components/common/smart/profilePage/profilePage.scss";

const inputLabelColor = { color: "rgba(0, 0, 0, 0.8) !important" };
const label = { inputProps: { "aria-label": "Checkbox demo" } };
function ProfilePage() {
  const constantData: LocalizationInterface = localizedData();
  const {
    basicInformationHeading,
    changePasswordHeading,
    notificationHeading,
  } = constantData.ProfilePage;
  const [values, setValues] = useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
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
    <Fragment>
      {/* <EmployeeHeader /> */}
      <ProfilePageHeader />
      <div className="profilePage">
        <div className="basicInfo">
          {/* BasicInfo */}
          <div className="basicInfo__heading">
            {/* Basic Information heading Div */}
            <Typography className="basicInfo__heading__text" gutterBottom>
              {basicInformationHeading}
            </Typography>
          </div>

          <div className="basicInfo__namesAndEmails">
            <div className="firstName">
              {/* FirstName  */}
              <TextField
                className="firstName__textfield"
                id="outlined"
                label="First Name"
                defaultValue="First Name"
                size="medium"
                InputLabelProps={{
                  // style: { color: 'red' },
                  style: inputLabelColor,
                }}
              />
            </div>
            <div className="lastName">
              {/* Last Name */}
              <TextField
                className="lastName__textfield"
                id="outlined-required"
                label="Last Name"
                defaultValue="Last Name"
                size="medium"
                InputLabelProps={{
                  // style: { color: 'red' },
                  style: inputLabelColor,
                }}
              />
            </div>
            <div className="email">
              {/* Email */}
              <TextField
                className="email__textfield"
                id="outlined-required"
                label="Email Address"
                defaultValue="rabeel@gmail.com"
                size="medium"
                InputLabelProps={{
                  // style: { color: 'red' },
                  style: inputLabelColor,
                }}
              />
            </div>
          </div>

          <div className="basicInfo__phone">
            <TextField
              className="textfield"
              id="outlined-required"
              label="Phone Number"
              defaultValue="+92-XXX-4288775"
              // value={this.state.form_email}
              // onChange={this.handle_change('form_email')}
              InputLabelProps={{
                // style: { color: 'red' },
                style: inputLabelColor,
              }}
            />
          </div>
        </div>

        <div className="password">
          {/* Change Password */}
          <Typography className="password__heading" gutterBottom>
            {changePasswordHeading}
          </Typography>
          <div className="password__passwordfield">
            <div className="currentPassword">
              <TextField
                className="currentPassword__textfield"
                id="outlined-required"
                label="Current Password"
                defaultValue="Hello World"
                onChange={handleChange("password")}
                type={values.showPassword ? "text" : "password"}
                // value={values.password} <--
                InputProps={{
                  style: inputLabelColor,
                  // style: { color: 'blue' },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {values.showPassword ? (
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
                id="outlined-required"
                label="New Password Password"
                defaultValue="Hello World"
                onChange={handleChange("password")}
                type={values.showPassword ? "text" : "password"}
                // value={values.password} <--
                InputProps={{
                  style: inputLabelColor,
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {values.showPassword ? (
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
                id="outlined-required"
                label="Verify Password"
                defaultValue="Hello World"
                onChange={handleChange("password")}
                type={values.showPassword ? "text" : "password"}
                // value={values.password} <--
                InputProps={{
                  style: inputLabelColor,
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {values.showPassword ? (
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
          {/* Notification  */}
          <Typography
            className="notification__heading"
            variant="h4"
            gutterBottom
          >
            {notificationHeading}
          </Typography>
          <Grid className="notification__checkBoxDiv" flexDirection="column">
            <div className="A">
              <div className="A__billUpdates">Bill Updates</div>
              <div className="A__checkBoxContainer">
                <div className="A__checkBoxContainer__one">
                  <Typography variant="subtitle1">Email</Typography>
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
                </div>

                <div className="A__checkBoxContainer__two">
                  <Typography variant="subtitle1">Phone</Typography>
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
                </div>
              </div>
            </div>

            <div className="B">
              <div className="B__billUpdates">Text 1</div>
              <div className="B__checkBoxContainer">
                <div className="B__checkBoxContainer__one">
                  <Typography variant="subtitle1">checkbox 1</Typography>
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
                </div>

                <div className="B__checkBoxContainer__two">
                  <Typography variant="subtitle1">checkbox 2</Typography>
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
                </div>
              </div>
            </div>

            <div className="C">
              <div className="C__billUpdates">Text 2</div>
              <div className="C__checkBoxContainer">
                <div className="C__checkBoxContainer__one">
                  <Typography variant="subtitle1">checkbox 3</Typography>
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
                </div>

                <div className="C__checkBoxContainer__two">
                  <Typography variant="subtitle1">checkbox 4</Typography>
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
                </div>
              </div>
            </div>
          </Grid>
        </div>

        <div className="btns">
          <Stack spacing={2} direction="row">
            <Button className="btns__cancelBtn" variant="contained">
              Cancel
            </Button>
            <Button className="btns__saveBtn" variant="contained">
              Save
            </Button>
          </Stack>
        </div>
      </div>
    </Fragment>
  );
}

export default ProfilePage;
