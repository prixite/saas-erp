import { useState } from "react";
import { Box, Divider, Grid, Typography } from "@mui/material";
import CompanyIconThree from "@src/assets/svgs/CompanyIconThree.svg";
import ThreeDotter from "@src/assets/svgs/ThreeDotter.svg";
import MenuButtons from "@src/components/shared/menuButtons/menuButtons";
import { LocalizationInterface } from "@src/helpers/interfaces/localizationinterfaces";
import { localizedData } from "@src/helpers/utils/language";
import "@src/components/common/presentational/education/education.scss";

function Education() {
  const constantData: LocalizationInterface = localizedData();
  const { educationHeading } = constantData.Education;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      {/* Education */}
      <Grid className="education-main" container>
        <Grid
          className="education-Heading-Container"
          container
          item
          xs={12}
          sm={12}
        >
          <Grid item xs={10} sm={10} className="heading-container">
            <Typography className="experience-text">
              {educationHeading}
            </Typography>
          </Grid>

          <Grid className="icon-Container" item xs={2} sm={2}>
            <div className="box">
              <Box sx={{ cursor: "pointer" }} className="subBox">
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
            </div>
          </Grid>
        </Grid>

        <Grid
          className="Education-Card"
          container
          item
          xs={12}
          sm={12}
          height={90}
        >
          {/* B */}
          <Grid item className="icon-container">
            <img
              className="profile-pic"
              src={CompanyIconThree}
              alt="profile pic"
            />
          </Grid>

          <Grid container item className="contentDiv">
            <Grid className="title-container" item>
              <Typography variant="body1" className="para">
                Bachelor in Computer Science
              </Typography>
            </Grid>

            <Grid
              className="description-subContainer"
              container
              item
              display="flex"
              alignItems="center"
              justifyContent="flex-start"
            >
              <Grid item className="description">
                <Typography variant="body1" className="para">
                  Pakistan Institute of Engineering and Applied Sciences Lahore,
                  Pakistan{" "}
                </Typography>
              </Grid>
              <Grid item className="year">
                <Typography variant="body1" className="para">
                  2016-2022
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid className="divider" xs={12} sm={12}>
          <Divider
            sx={{ color: "#E7E7E7", marginLeft: "24px", marginRight: "24px" }}
          />
        </Grid>

        <Grid
          className="Education-Card"
          container
          item
          xs={12}
          sm={12}
          height={90}
        >
          {/* B */}
          <Grid item className="icon-container">
            <img
              className="profile-pic"
              src={CompanyIconThree}
              alt="profile pic"
            />
          </Grid>

          <Grid container item className="contentDiv">
            <Grid className="title-container" item>
              <Typography variant="body1" className="para">
                Bachelor in Computer Science
              </Typography>
            </Grid>

            <Grid
              className="description-subContainer"
              container
              item
              display="flex"
              alignItems="center"
              justifyContent="flex-start"
            >
              <Grid item className="description">
                <Typography variant="body1" className="para">
                  Pakistan Institute of Engineering and Applied Sciences Lahore,
                  Pakistan{" "}
                </Typography>
              </Grid>
              <Grid item className="year">
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
