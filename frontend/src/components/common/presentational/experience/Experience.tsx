import { Divider, Grid, Typography } from "@mui/material";
import CompanyLogoOne from "@src/assets/svgs/CompanyLogoOne.svg";
import ThreeDotter from "@src/assets/svgs/ThreeDotter.svg";
import { LocalizationInterface } from "@src/helpers/interfaces/localizationinterfaces";
import { localizedData } from "@src/helpers/utils/language";
import "@src/components/common/presentational/experience/experience.scss";

function Experience() {
  const constantData: LocalizationInterface = localizedData();
  const { experienceHeading } = constantData.Experience;

  return (
    <>
      {/* Education */}
      <Grid className="experience-main" container>
        <Grid
          className="experience-Heading-Container"
          container
          item
          xs={12}
          sm={12}
        >
          <Grid item xs={10} sm={10} className="experience-container">
            <Typography className="experience-text">
              {experienceHeading}
            </Typography>
          </Grid>

          <Grid className="icon-container" item xs={2} sm={2}>
            <div className="box">
              <div className="subBox">
                <img
                  className="profile-pic"
                  src={ThreeDotter}
                  alt="profile pic"
                />
              </div>
            </div>
          </Grid>
        </Grid>

        <Grid
          className="experience-Card"
          container
          item
          xs={12}
          sm={12}
          height={90}
        >
          {/* B */}
          <Grid item className="companyLogo-container">
            <img
              className="profile-pic"
              src={CompanyLogoOne}
              alt="profile pic"
            />
          </Grid>

          <Grid container item className="sub-container">
            <Grid className="child-div-two-A" item>
              <Typography variant="body1" className="description">
                Product Designer
              </Typography>
            </Grid>

            <Grid
              className="child-div-three-A"
              container
              item
              display="flex"
              alignItems="center"
              justifyContent="flex-start"
            >
              <Grid item className="heading-One">
                <Typography variant="body1" className="description">
                  i2c.inc{" "}
                </Typography>
              </Grid>
              <Grid item className="heading-Two">
                <Typography variant="body1" className="description">
                  2016-2022
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid className="divider" xs={12} sm={12}>
          <Divider sx={{ color: "#E7E7E7", margin: "0px 24px 0px 24px" }} />
        </Grid>

        <Grid
          className="experience-Card"
          container
          item
          xs={12}
          sm={12}
          height={90}
        >
          {/* B */}
          <Grid item className="companyLogo-container">
            <img
              className="profile-pic"
              src={CompanyLogoOne}
              alt="profile pic"
            />
          </Grid>

          <Grid container item className="sub-container">
            <Grid className="child-div-two-A" item>
              <Typography variant="body1" className="description">
                Product Designer
              </Typography>
            </Grid>

            <Grid
              className="child-div-three-A"
              container
              item
              display="flex"
              alignItems="center"
              justifyContent="flex-start"
            >
              <Grid item className="heading-One">
                <Typography variant="body1" className="description">
                  i2c.inc{" "}
                </Typography>
              </Grid>
              <Grid item className="heading-Two">
                <Typography variant="body1" className="description">
                  2016-2022
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default Experience;
