import { Divider, Grid, Typography } from "@mui/material";
import "./education.scss";
import CompanyIconFour from "@src/assets/svgs/CompanyIconFour.svg";
import CompanyIconThree from "@src/assets/svgs/CompanyIconThree.svg";
import ThreeDotter from "@src/assets/svgs/ThreeDotter.svg";
import { LocalizationInterface } from "@src/helpers/interfaces/localizationinterfaces";
import { localizedData } from "@src/helpers/utils/language";

function Education() {
  const constantData: LocalizationInterface = localizedData();
  const { educationHeading } = constantData.Education;

  return (
    <>
      {/* Education */}
      <Grid container className="education-main">
        <Grid container item xs={12} sm={12} className="child-div-one">
          <Grid item xs={10} sm={10}>
            <Typography className="experience-text">
              {educationHeading}
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
              src={CompanyIconThree}
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
                Bachelor in Computer Science
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
                  Pakistan Institute of Engineering and Applied Sciences Lahore,
                  Pakistan{" "}
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
              src={CompanyIconFour}
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
                Intermediate in Computer Science
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
                  Kips College Johar Town, Lahore, Pakistan{" "}
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

export default Education;
