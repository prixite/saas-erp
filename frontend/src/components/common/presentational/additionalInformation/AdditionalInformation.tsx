import { Grid, Typography } from "@mui/material";
import "./additionalInformation.scss";
import HideIcon from "@src/assets/svgs/HideIcon.svg";
import ThreeDotter from "@src/assets/svgs/ThreeDotter.svg";

function AdditionalInformation() {
  return (
    <>
      {/* <h1>AdditionalInformation</h1> */}
      <Grid
        className="additional-additional-main"
        container
        xs={12}
        sm={12}
        sx={{
          border: "1px solid #E7E7E7",
          height: "160px",
          background: "#FFFFFF",
          borderRadius: "12px",
        }}
      >
        {/* Child One  */}
        <Grid
          container
          item
          sx={{
            margin: "18px 16px 12px 18px",
            height: "17px",
          }}
          xs={12}
          sm={12}
        >
          <Grid item xs={9} sm={9}>
            <Typography
              variant="body1"
              sx={{
                fontFamily: "Lato",
                fontStyle: "normal",
                fontWeight: "400",
                fontSize: "14px",
                lineHeight: "17px",
                letterSpacing: "-0.011em",
                color: "#000000",
                opacity: "0.5",
              }}
            >
              {" "}
              Additional Information{" "}
            </Typography>
          </Grid>

          <Grid
            item
            xs={3}
            sm={3}
            marginLeft="auto"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <div>
              {/* Icon */}
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

        {/* Child Two  */}
        <Grid
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12}
          container
          item
          style={{
            height: "19px",
            margin: "0px 16px 18px 18px",
          }}
        >
          <Grid container item xs={3} sm={3} style={{ minWidth: "25%" }}>
            <Typography
              variant="body1"
              style={{
                height: "19px",
                fontFamily: "Lato",
                fontStyle: "normal",
                fontWeight: "400",
                fontSize: "16px",
                lineHeight: "19px",
                letterSpacing: "-0.011em",
                color: "#000000",
                opacity: "0.8",
                marginRight: "16px",
              }}
            >
              Department:
            </Typography>
            <Typography
              variant="body1"
              style={{
                width: "180px",
                height: "19px",
                fontFamily: "Lato",
                fontStyle: "normal",
                fontWeight: "700",
                fontSize: "16px",
                lineHeight: "19px",
                letterSpacing: "-0.011em",
                color: "#000000",
              }}
            >
              UX Designer
            </Typography>
          </Grid>

          <Grid container item xs={3} sm={3} style={{ minWidth: "25%" }}>
            <Typography
              variant="body1"
              style={{
                height: "19px",
                fontFamily: "Lato",
                fontStyle: "normal",
                fontWeight: "400",
                fontSize: "16px",
                lineHeight: "19px",
                letterSpacing: "-0.011em",
                color: "#000000",
                opacity: "0.8",
                marginRight: "16px",
              }}
            >
              Manager:
            </Typography>
            <Typography
              variant="body1"
              style={{
                height: "19px",
                fontFamily: "Lato",
                fontStyle: "normal",
                fontWeight: "700",
                fontSize: "16px",
                lineHeight: "19px",
                letterSpacing: "-0.011em",
                color: "#000000",
              }}
            >
              Mohsin Qurban
            </Typography>
          </Grid>

          <Grid container item xs={3} sm={3} style={{ minWidth: "25%" }}>
            <Typography
              variant="body1"
              style={{
                height: "19px",
                fontFamily: "Lato",
                fontStyle: "normal",
                fontWeight: "400",
                fontSize: "16px",
                lineHeight: "19px",
                letterSpacing: "-0.011em",
                color: "#000000",
                opacity: "0.8",
                marginRight: "16px",
                overflow: "hidden",
              }}
            >
              Total Exerience:
            </Typography>
            <Typography
              variant="body1"
              style={{
                //   width: "180px",
                height: "19px",
                fontFamily: "Lato",
                fontStyle: "normal",
                fontWeight: "700",
                fontSize: "16px",
                lineHeight: "19px",
                letterSpacing: "-0.011em",
                color: "#000000",
              }}
            >
              4 years{" "}
            </Typography>
          </Grid>

          <Grid container item xs={3} sm={3} style={{ minWidth: "25%" }}>
            <Typography
              variant="body1"
              style={{
                height: "19px",
                fontFamily: "Lato",
                fontStyle: "normal",
                fontWeight: "400",
                fontSize: "16px",
                lineHeight: "19px",
                letterSpacing: "-0.011em",
                color: "#000000",
                opacity: "0.8",
                marginRight: "16px",
                overflow: "hidden",
              }}
            >
              Joining Date:
            </Typography>
            <Typography
              variant="body1"
              style={{
                height: "19px",
                fontFamily: "Lato",
                fontStyle: "normal",
                fontWeight: "700",
                fontSize: "16px",
                lineHeight: "19px",
                letterSpacing: "-0.011em",
                color: "#000000",
              }}
            >
              17 Jan, 2023
            </Typography>
          </Grid>
        </Grid>

        {/* Child Three  */}
        <Grid
          xs={12}
          sm={12}
          container
          item
          style={{
            height: "19px",
            margin: "0px 16px 20px 18px",
          }}
        >
          <Grid
            container
            item
            xs={6}
            sm={3}
            display="flex"
            alignItems={"center"}
            justifyContent="flex-start"
          >
            <Grid item>
              <Typography
                variant="body1"
                style={{
                  //   width: "89px",
                  height: "19px",
                  fontFamily: "Lato",
                  fontStyle: "normal",
                  fontWeight: "400",
                  fontSize: "16px",
                  lineHeight: "19px",
                  letterSpacing: "-0.011em",
                  color: "#000000",
                  opacity: "0.8",
                  marginRight: "16px",
                  overflow: "hiddem",
                }}
              >
                Emergency Contact:
              </Typography>
            </Grid>

            <Grid item>
              <Typography
                variant="body1"
                style={{
                  //   width: "180px",
                  height: "19px",
                  fontFamily: "Lato",
                  fontStyle: "normal",
                  fontWeight: "700",
                  fontSize: "16px",
                  lineHeight: "19px",
                  letterSpacing: "-0.011em",
                  color: "#000000",
                }}
              >
                +123 4567909
              </Typography>
            </Grid>
          </Grid>

          <Grid
            container
            item
            xs={6}
            sm={8}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <Grid item>
              <Typography
                variant="body1"
                style={{
                  height: "19px",
                  fontFamily: "Lato",
                  fontStyle: "normal",
                  fontWeight: "400",
                  fontSize: "16px",
                  lineHeight: "19px",
                  letterSpacing: "-0.011em",
                  color: "#000000",
                  opacity: "0.8",
                  marginRight: "16px",
                }}
              >
                CNIC:
              </Typography>
            </Grid>

            <Grid item>
              <Typography
                variant="body1"
                style={{
                  height: "19px",
                  fontFamily: "Lato",
                  fontStyle: "normal",
                  fontWeight: "700",
                  fontSize: "16px",
                  lineHeight: "19px",
                  letterSpacing: "-0.011em",
                  color: "#000000",
                }}
              >
                36044-0935608-8
              </Typography>
            </Grid>
            <Grid
              item
              display={"flex"}
              alignItems="center"
              justifyContent="center"
            >
              <img
                src={HideIcon}
                alt="profile pic"
                style={{
                  height: "19px",
                  width: "19px",
                  background: "inherit",
                  marginLeft: "11px",
                  padding: "0px",
                  marginBottom: "2px",
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default AdditionalInformation;
