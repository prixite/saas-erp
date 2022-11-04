import { Divider, Grid, Typography } from "@mui/material";
import "./experience.scss";
import CompanyLogoOne from "@src/assets/svgs/CompanyLogoOne.svg";
import CompanyLogoTwo from "@src/assets/svgs/CompanyLogoTwo.svg";
import ThreeDotter from "@src/assets/svgs/ThreeDotter.svg";

function Experience() {
  return (
    <>
      {/* <h1>Experience</h1> */}
      <Grid
        container
        className="experience-main"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          marginTop: "16px",
        }}
      >
        <Grid container item xs={12} sm={12} className="child-div-one">
          <Grid item xs={10} sm={10}>
            <Typography className="experience-text">Experience</Typography>
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
            {/* A */}
            <div
              style={{
                marginRight: "24px",
                // border:"1px solid blue"
              }}
            >
              {/* Icon */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
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
          {/* <Typography className='experience-text'>Experience</Typography> */}
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
          <Grid item xs={2} sm={2} className="child-div-two-A">
            {/* 2A */}
            {/* <div className="child-div-two-A-A1"> */}
            <img
              className="profile-pic"
              src={CompanyLogoOne}
              alt="profile pic"
              style={{
                background: "inherit",
                // width: "48px",
                marginLeft: "18px",
                // marginRight:"auto",
                height: "75px",
              }}
            />
            {/* </div> */}
          </Grid>
          <Grid
            container
            item
            // border='1px solid red'
            xs={10}
            sm={10}
            className="child-div-two-B"
            sx={{
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "flex-start",
            }}
          >
            {/* 2B */}
            <Grid
              className="child-div-two-A"
              item
              sx={{ width: "100%", marginBottom: "8px" }}
            >
              <Typography
                variant="body1"
                sx={{
                  fontFamily: "Lato",
                  fontStyle: "normal",
                  fontWeight: "600",
                  fontSize: "18px",
                  lineHeight: "18px",
                  letterSpacing: "-0.011em",
                  color: "#000000",
                  marginTop: "16px",
                }}
              >
                Product Designer
              </Typography>
            </Grid>

            <Grid
              container
              item
              display="flex"
              alignItems="center"
              justifyContent="flex-start"
              sx={{ width: "100%" }}
            >
              <Grid item>
                <Typography
                  variant="body1"
                  sx={{
                    fontFamily: "Lato",
                    fontStyle: "normal",
                    fontWeight: "400",
                    fontSize: "18px",
                    lineHeight: "22px",
                    letterSpacing: "-0.011em",
                    color: "#000000",
                  }}
                >
                  i2c.inc{" "}
                </Typography>
              </Grid>
              <Grid item style={{ marginLeft: "auto", marginRight: "48px" }}>
                <Typography
                  variant="body1"
                  sx={{
                    fontFamily: "Lato",
                    fontStyle: "normal",
                    fontWeight: "600",
                    fontSize: "18px",
                    lineHeight: "22px",
                    letterSpacing: "-0.011em",
                    color: "#000000",
                  }}
                >
                  2016-2022
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {/* ______________________________________________________________________________________________________________________________________ */}
        {/* <br /> */}
        <Grid xs={12} sm={12}>
          <Divider
            sx={{ color: "#E7E7E7", marginLeft: "24px", marginRight: "24px" }}
          />
        </Grid>
        {/* _____________________________________________________________________________________________________________________________________ */}

        <Grid
          container
          item
          xs={12}
          sm={12}
          height={90}
          className="child-div-two"
        >
          {/* C */}
          <Grid item xs={2} sm={2} className="child-div-two-A">
            {/* 2A */}
            {/* <div className="child-div-two-A-A1"> */}
            <img
              className="profile-pic"
              src={CompanyLogoTwo}
              alt="profile pic"
              style={{
                background: "inherit",
                // width: "48px",
                marginLeft: "18px",
                // marginRight:"auto",
                height: "75px",
              }}
            />
            {/* </div> */}
          </Grid>
          <Grid
            container
            item
            // border='1px solid red'
            xs={10}
            sm={10}
            className="child-div-two-B"
            sx={{
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "flex-start",
            }}
          >
            {/* 2B */}
            <Grid
              className="child-div-two-A"
              item
              sx={{ width: "100%", marginBottom: "8px" }}
            >
              <Typography
                variant="body1"
                sx={{
                  fontFamily: "Lato",
                  fontStyle: "normal",
                  fontWeight: "600",
                  fontSize: "18px",
                  lineHeight: "18px",
                  letterSpacing: "-0.011em",
                  color: "#000000",
                  marginTop: "16px",
                }}
              >
                UX Designer
              </Typography>
            </Grid>

            <Grid
              container
              item
              display="flex"
              alignItems="center"
              justifyContent="flex-start"
              sx={{ width: "100%" }}
            >
              <Grid item>
                <Typography
                  variant="body1"
                  sx={{
                    fontFamily: "Lato",
                    fontStyle: "normal",
                    fontWeight: "400",
                    fontSize: "18px",
                    lineHeight: "22px",
                    letterSpacing: "-0.011em",
                    color: "#000000",
                  }}
                >
                  Tkxcel{" "}
                </Typography>
              </Grid>
              <Grid item style={{ marginLeft: "auto", marginRight: "48px" }}>
                <Typography
                  variant="body1"
                  sx={{
                    fontFamily: "Lato",
                    fontStyle: "normal",
                    fontWeight: "600",
                    fontSize: "18px",
                    lineHeight: "22px",
                    letterSpacing: "-0.011em",
                    color: "#000000",
                  }}
                >
                  2016-2022
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {/* <Grid item> */}
        {/* C */}
        {/* </Grid> */}
      </Grid>
    </>
  );
}

export default Experience;
