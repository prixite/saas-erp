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
import "@src/components/common/smart/profile/profilePage.scss";

const inputLabelColor = { color: "rgba(0, 0, 0, 0.8) !important" };
const label = { inputProps: { "aria-label": "Checkbox demo" } };
function ProfilePage() {
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
  } = constantData.ProfilePage;
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
  const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  return (
    <Fragment>
      <ProfilePageHeader />
      <div className="profilePage">
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
                id="outlined-required"
                label="First Name"
                placeholder="First Name"
                InputLabelProps={{
                  style: inputLabelColor,
                }}
              />
            </div>
            <div className="lastName">
              <TextField
                className="lastName__textfield"
                autoComplete="off"
                id="outlined-required"
                label="Last Name"
                placeholder="Last Name"
                size="medium"
                InputLabelProps={{
                  style: inputLabelColor,
                }}
              />
            </div>
            <div className="email">
              <TextField
                className="email__textfield"
                id=""
                type="new-password"
                label="Email Address"
                placeholder="Email"
                size="medium"
                inputProps={{
                  autoComplete: "new-password",
                }}
                InputLabelProps={{
                  style: inputLabelColor,
                }}
              />
            </div>
          </div>

          <div className="basicInfo__phone">
            <TextField
              className="textfield"
              id=""
              type="new-password"
              label="Phone Number"
              placeholder="XX-XXX-XXXXXXX"
              size="medium"
              inputProps={{
                autoComplete: "new-password",
              }}
              InputLabelProps={{
                style: inputLabelColor,
              }}
            />
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
                id=""
                type={values.showCurrentPassword ? "text" : "password"}
                label="Current Password"
                onChange={handleChange("password")}
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
            </div>
            <div className="newPassword">
              <TextField
                className="newPassword__textfield"
                id=""
                type={values.newPassword ? "text" : "password"}
                label="New Password"
                onChange={handleChange("password")}
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
            </div>
            <div className="verifyPassword">
              <TextField
                className="verifyPassword__textfield"
                name="password"
                id=""
                type={values.verifyPassword ? "text" : "password"}
                label="Verify Password"
                onChange={handleChange("password")}
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
                    defaultChecked
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
                    defaultChecked
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
                    defaultChecked
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
                    defaultChecked
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
              className="btns__cancelBtn"
              style={{ backgroundColor: "transparent" }}
              variant="contained"
            >
              <span className="btns__cancelBtn__btnText">{cancelBtn}</span>
            </Button>
            <Button className="btns__saveBtn" variant="contained">
              <span className="btns__saveBtn__btnText">{saveBtn}</span>
            </Button>
          </Stack>
        </div>
      </div>
    </Fragment>
  );
}

export default ProfilePage;
