import { Grid, Typography } from "@mui/material";
import HideIcon from "@src/assets/svgs/HideIcon.svg";
import ThreeDotter from "@src/assets/svgs/ThreeDotter.svg";
import { LocalizationInterface } from "@src/helpers/interfaces/localizationinterfaces";
import { localizedData } from "@src/helpers/utils/language";
import "@src/components/common/presentational/additionalInformation/additionalInformation.scss";

function AdditionalInformation() {
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
      {/* <h1>AdditionalInformation</h1> */}
      <Grid className="additional-Information-main" container xs={12} sm={12}>
        {/* Child One  */}
        <Grid container item className="ChildOne" xs={12} sm={12}>
          <Grid item xs={9} sm={9} className="ChildOne-A">
            <Typography variant="body1" className="ChildOne-A-Typo">
              {" "}
              {additionalInformationHeading}{" "}
            </Typography>
          </Grid>

          <Grid item xs={3} sm={3} marginLeft="auto" className="ChildOne-B">
            {/* Icon */}
            <div className="logoContainer">
              <img
                className="profile-pic"
                src={ThreeDotter}
                alt="profile pic"
              />
            </div>
            {/* </div> */}
          </Grid>
        </Grid>

        {/* Child Two  */}
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
              {/* Department: */}
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

        {/* Child Three  */}
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
              <Typography className="typo" variant="body1">
                36044-0935608-8
              </Typography>
            </Grid>
            <Grid className="ChildThree-B-Three" item>
              <img className="logo" src={HideIcon} alt="profile pic" />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default AdditionalInformation;
