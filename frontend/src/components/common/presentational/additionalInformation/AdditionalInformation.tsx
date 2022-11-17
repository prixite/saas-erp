import { useState } from "react";
import { Grid, Typography, Button, Box } from "@mui/material";
import moment from "moment";
import HideIcon from "@src/assets/svgs/HideIcon.svg";
import showIcon from "@src/assets/svgs/Show.svg";
import ThreeDotter from "@src/assets/svgs/ThreeDotter.svg";
import MenuButtons from "@src/components/shared/menuButtons/menuButtons";
import { EmployeeData } from "@src/helpers/interfaces/employees-modal";
import { LocalizationInterface } from "@src/helpers/interfaces/localizationinterfaces";
import { localizedData } from "@src/helpers/utils/language";
import "@src/components/common/presentational/additionalInformation/additionalInformation.scss";

interface AdditionalInformationType {
  employeeData?: EmployeeData;
}
function AdditionalInformation({ employeeData }: AdditionalInformationType) {
  const constantData: LocalizationInterface = localizedData();
  const {
    additionalInformationHeading,
    department,
    manager,
    totalExperience,
    joiningDate,
    emergencyContact,
    cnic,
  } = constantData.AdditionalInformation;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [showResults, setShowResults] = useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Grid className="additional-Information-main" container xs={12} sm={12}>
        <Grid container item className="headingContainer" xs={12} sm={12}>
          <Grid item xs={9} sm={9} className="headingDiv">
            <Typography variant="body1" className="heading">
              {" "}
              {additionalInformationHeading}{" "}
            </Typography>
          </Grid>

          <Grid item xs={3} sm={3} marginLeft="auto" className="imageContainer">
            <Box className="logoContainer" sx={{ cursor: "pointer" }}>
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
          className="CardOne"
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12}
          container
          item
        >
          <Grid
            container
            item
            className="department-Heading-Container"
            xs={3}
            sm={3}
          >
            <Typography variant="body1" className="department-title">
              {department}
            </Typography>

            <Typography variant="body1" className="department-text">
              {employeeData?.department
                ? employeeData?.department
                : "Department"}
            </Typography>
          </Grid>

          <Grid
            container
            item
            className="employee-Name-Container"
            xs={3}
            sm={3}
          >
            <Typography variant="body1" className="employee-title">
              {manager}
            </Typography>

            <Typography variant="body1" className="employee-text">
              {employeeData?.user?.first_name} {employeeData?.user?.last_name}
            </Typography>
          </Grid>

          <Grid container item className="experience-Container" xs={3} sm={3}>
            <Typography variant="body1" className="experience-title">
              {totalExperience}
            </Typography>

            <Typography variant="body1" className="experience-text">
              4 years
            </Typography>
          </Grid>

          <Grid container item className="data-Container" xs={3} sm={3}>
            <Typography variant="body1" className="data-title">
              {joiningDate}
            </Typography>
            <Typography variant="body1" className="data-text">
              {moment(employeeData?.date_of_joining).format("ll")}
            </Typography>
          </Grid>
        </Grid>

        <Grid xs={12} sm={12} container item className="CardTwo">
          <Grid className="emergency-Container" container item xs={6} sm={3}>
            <Grid className="emergency-title" item>
              <Typography className="text" variant="body1">
                {emergencyContact}
              </Typography>
            </Grid>

            <Grid className="emergency-text" item>
              <Typography className="text" variant="body1">
                {employeeData?.emergency_contact_number
                  ? employeeData?.emergency_contact_number
                  : "12345671"}
              </Typography>
            </Grid>
          </Grid>

          <Grid className="cnic-Container" container item xs={6} sm={8}>
            <Grid className="cnic-title" item>
              <Typography className="text" variant="body1">
                {cnic}
              </Typography>
            </Grid>

            <Grid className="cnic-text" item>
              {showResults ? (
                <Typography className="typo" variant="body1">
                  {employeeData?.nic}
                </Typography>
              ) : (
                <Typography className="typo1" variant="body1">
                  {Array(employeeData?.nic.length).join(".")}
                </Typography>
              )}
            </Grid>
            <Grid className="cnic-photo" item>
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
