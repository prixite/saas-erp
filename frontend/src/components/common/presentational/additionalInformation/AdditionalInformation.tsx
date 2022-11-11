import { useState } from "react";
import { Grid, Typography, Button, Box } from "@mui/material";
import HideIcon from "@src/assets/svgs/HideIcon.svg";
import showIcon from "@src/assets/svgs/Show.svg";
import ThreeDotter from "@src/assets/svgs/ThreeDotter.svg";
import MenuButtons from "@src/components/shared/menuButtons/menuButtons";
import { LocalizationInterface } from "@src/helpers/interfaces/localizationinterfaces";
import { localizedData } from "@src/helpers/utils/language";
import "@src/components/common/presentational/additionalInformation/additionalInformation.scss";

function AdditionalInformation() {
  const constantData: LocalizationInterface = localizedData();
  const cnicNumber = "36044-0935608-8";
  const [showResults, setShowResults] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const {
    additionalInformationHeading,
    department,
    manager,
    totalExperience,
    joiningDate,
    emergencyContact,
    cnic,
  } = constantData.AdditionalInformation;
  return (
    <>
      <Grid className="additional-Information-main" container xs={12} sm={12}>
        <Grid container item className="ChildOne" xs={12} sm={12}>
          <Grid item xs={9} sm={9} className="ChildOne-A">
            <Typography variant="body1" className="ChildOne-A-Typo">
              {" "}
              {additionalInformationHeading}{" "}
            </Typography>
          </Grid>

          <Grid item xs={3} sm={3} marginLeft="auto" className="ChildOne-B">
            <Box sx={{ cursor: "pointer" }} className="logoContainer">
              <img
                className="profile-pic"
                src={ThreeDotter}
                alt="profile pic"
                onClick={handleClick}
              />
              <MenuButtons
                anchorEl={anchorEl}
                open={open}
                handleClose={handleClose}
              />
            </Box>
          </Grid>
        </Grid>
        <Grid
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12}
          container
          item
          className="ChildTwo"
        >
          <Grid container item className="ChildTwo-A" xs={3} sm={3}>
            <Typography variant="body1" className="typo-One">
              {department}
            </Typography>

            <Typography variant="body1" className="typo-Two">
              UX Designer
            </Typography>
          </Grid>

          <Grid container item className="ChildTwo-B" xs={3} sm={3}>
            <Typography variant="body1" className="typo-One">
              {manager}
            </Typography>

            <Typography variant="body1" className="typo-Two">
              Mohsin Qurban
            </Typography>
          </Grid>

          <Grid container item className="ChildTwo-C" xs={3} sm={3}>
            <Typography variant="body1" className="typo-One">
              {totalExperience}
            </Typography>

            <Typography variant="body1" className="typo-Two">
              4 years{" "}
            </Typography>
          </Grid>

          <Grid container item className="ChildTwo-D" xs={3} sm={3}>
            <Typography variant="body1" className="typo-One">
              {joiningDate}
            </Typography>
            <Typography variant="body1" className="typo-Two">
              17 Jan, 2023
            </Typography>
          </Grid>
        </Grid>
        <Grid xs={12} sm={12} container item className="ChildThree">
          <Grid className="ChildThree-A" container item xs={6} sm={3}>
            <Grid className="ChildThree-A-One" item>
              <Typography className="typo" variant="body1">
                {emergencyContact}
              </Typography>
            </Grid>

            <Grid className="ChildThree-A-Two" item>
              <Typography className="typo" variant="body1">
                +123 4567909
              </Typography>
            </Grid>
          </Grid>
          <Grid className="ChildThree-B" container item xs={6} sm={8}>
            <Grid className="ChildThree-B-One" item>
              <Typography className="typo" variant="body1">
                {cnic}
              </Typography>
            </Grid>
            <Grid className="ChildThree-B-Two" item>
              {showResults ? (
                <Typography className="typo" variant="body1">
                  {cnicNumber}
                </Typography>
              ) : (
                <Typography className="typo1" variant="body1">
                  {Array(cnicNumber.length).join(".")}
                </Typography>
              )}
            </Grid>
            <Grid className="ChildThree-B-Three" item>
              <Button onClick={() => setShowResults(!showResults)}>
                <img
                  className="logo"
                  src={showResults ? showIcon : HideIcon}
                  alt="eye"
                />
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default AdditionalInformation;
