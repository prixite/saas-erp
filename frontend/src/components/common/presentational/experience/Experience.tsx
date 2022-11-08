import { Divider, Grid, Typography } from "@mui/material";
import "./experience.scss";
import CompanyLogoOne from "@src/assets/svgs/CompanyLogoOne.svg";
import CompanyLogoTwo from "@src/assets/svgs/CompanyLogoTwo.svg";
import ThreeDotter from "@src/assets/svgs/ThreeDotter.svg";
import { LocalizationInterface } from "@src/helpers/interfaces/localizationinterfaces";
import { localizedData } from "@src/helpers/utils/language";

function Experience() {
  const constantData: LocalizationInterface = localizedData();
  const { experienceHeading } = constantData.Experience;

  return (
    <>
      {/* <h1>Experience</h1> */}
      <Grid container className="experience-main">
        <Grid container item xs={12} sm={12} className="child-div-one">
          <Grid item xs={10} sm={10}>
            <Typography className="experience-text">
              {experienceHeading}
            </Typography>
          </Grid>

          <Grid
            item
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
            xs={2}
            sm={2}
          >
            <div
              style={{
                marginRight: "18px",
                marginTop: "18px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  width: "36px",
                  background: "white",
                }}
              >
                <img
                  className="profile-pic"
                  src={ThreeDotter}
                  alt="profile pic"
                  style={{
                    height: "19px",
                    width: "19px",
                    background: "inherit",
                  }}
                />
              </div>
            </div>
          </Grid>
        </Grid>

        <Grid
          container
          item
          xs={12}
          sm={12}
          height={90}
          className="child-div-two"
        >
          {/* B */}
          <Grid item className="child-div-two-A">
            <img
              className="profile-pic"
              src={CompanyLogoOne}
              alt="profile pic"
              style={{
                background: "inherit",
                width: "48px",
                height: "48px",
                marginLeft: "18px",
                marginRight: "16px",
              }}
            />
          </Grid>

          <Grid container item className="child-div-two-B">
            <Grid className="child-div-two-A" item>
              <Typography variant="body1" className="para">
                Product Designer
              </Typography>
            </Grid>

            <Grid
              container
              item
              display="flex"
              alignItems="center"
              justifyContent="flex-start"
              className="child-div-three-A"
            >
              <Grid item className="para-One-Div">
                <Typography variant="body1" className="para">
                  i2c.inc{" "}
                </Typography>
              </Grid>
              <Grid item className="para-Two-Div">
                <Typography variant="body1" className="para">
                  2016-2022
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid xs={12} sm={12}>
          <Divider
            sx={{ color: "#E7E7E7", marginLeft: "24px", marginRight: "24px" }}
          />
        </Grid>

        <Grid
          container
          item
          xs={12}
          sm={12}
          height={90}
          className="child-div-two"
        >
          <Grid item className="child-div-two-A">
            <img
              className="profile-pic"
              src={CompanyLogoTwo}
              alt="profile pic"
              style={{
                background: "inherit",
                width: "48px",
                height: "48px",
                marginLeft: "18px",
                marginRight: "16px",
              }}
            />
          </Grid>

          <Grid container item className="child-div-two-B">
            <Grid className="child-div-two-A" item>
              <Typography variant="body1" className="para">
                UX Designer
              </Typography>
            </Grid>

            <Grid
              container
              item
              display="flex"
              alignItems="center"
              justifyContent="flex-start"
              className="child-div-three-A"
            >
              <Grid item className="para-One-Div">
                <Typography variant="body1" className="para">
                  Tkxel{" "}
                </Typography>
              </Grid>
              <Grid item className="para-Two-Div">
                <Typography variant="body1" className="para">
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
