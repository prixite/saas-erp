import { useState } from "react";
import { Box, Divider, Grid, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import CompanyIconThree from "@src/assets/svgs/CompanyIconThree.svg";
import NotfoundIcon from "@src/assets/svgs/notfound.svg";
import ThreeDotter from "@src/assets/svgs/ThreeDotter.svg";
import MenuButtons from "@src/components/shared/menuButtons/menuButtons";
import { employeeConstants } from "@src/helpers/constants/constants";
import { EmployeeData } from "@src/helpers/interfaces/employees-modal";
import { LocalizationInterface } from "@src/helpers/interfaces/localizationinterfaces";
import { localizedData } from "@src/helpers/utils/language";
import "@src/components/common/presentational/education/education.scss";

interface ExperienceType {
  employeeData?: EmployeeData;
  isLoading: boolean;
}
function Education({ employeeData, isLoading }: ExperienceType) {
  const constantData: LocalizationInterface = localizedData();
  const { educationHeading } = constantData.Education;
  const { notFound } = constantData.Employee;
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
      <Grid className="education-main" sx={{ display: "flow-root" }} container>
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
        {!isLoading ? (
          <>
            {employeeData?.degrees.length ? (
              <>
                {employeeData?.degrees.map((degree, index) => {
                  return (
                    <Box key={degree?.program}>
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
                              {degree?.program}
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
                                {degree?.institute}{" "}
                              </Typography>
                            </Grid>
                            <Grid item className="year">
                              <Typography variant="body1" className="para">
                                {degree?.year}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid className="divider" item xs={12} sm={12}>
                        {index !== employeeData?.experience?.length - 1 ? (
                          <Divider
                            sx={{
                              color: "#E7E7E7",
                              marginLeft: "24px",
                              marginRight: "24px",
                            }}
                          />
                        ) : null}
                      </Grid>
                    </Box>
                  );
                })}
              </>
            ) : (
              <Box className="error-img">
                <img src={NotfoundIcon} alt="notfound" />
                <Typography className="error-msg">
                  {employeeConstants.education}
                  {notFound}
                </Typography>
              </Box>
            )}
          </>
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              mt: "25px",
            }}
          >
            <CircularProgress />
          </Box>
        )}
      </Grid>
    </>
  );
}

export default Education;
