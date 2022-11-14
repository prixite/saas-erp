import { Grid, Typography } from "@mui/material";
import HideIcon from "@src/assets/svgs/HideIcon.svg";
import ThreeDotter from "@src/assets/svgs/ThreeDotter.svg";
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
            <div className="logoContainer">
              <img
                className="profile-pic"
                src={ThreeDotter}
                alt="profile pic"
              />
            </div>
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
              {employeeData?.department}
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
              {employeeData?.date_of_joining}
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
                {employeeData?.emergency_contact_number}
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
              <Typography className="text" variant="body1">
                {employeeData?.nic}
              </Typography>
            </Grid>
            <Grid className="cnic-photo" item>
              <img className="logo" src={HideIcon} alt="profile pic" />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default AdditionalInformation;
