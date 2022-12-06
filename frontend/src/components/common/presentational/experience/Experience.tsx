import { useEffect, useState } from "react";
import { Divider, Grid, Typography, Box } from "@mui/material";
import moment from "moment";
import { useParams } from "react-router-dom";
import CompanyLogoOne from "@src/assets/svgs/CompanyLogoOne.svg";
import ThreeDotter from "@src/assets/svgs/ThreeDotter.svg";
import MenuButtons from "@src/components/shared/menuButtons/menuButtons";
import { LocalizationInterface } from "@src/helpers/interfaces/localizationinterfaces";
import { localizedData } from "@src/helpers/utils/language";
import { useGetEmployeeDataQuery } from "@src/store/reducers/employees-api";
import "@src/components/common/presentational/experience/experience.scss";

function Experience() {
  const param = useParams();
  const [paramValue, setParamValue] = useState<string>("");
  const { data: employeeData } = useGetEmployeeDataQuery(
    {
      id: parseInt(paramValue),
    },
    { skip: !parseInt(paramValue) }
  );
  useEffect(() => {
    if (param.employeeId) {
      setParamValue(param.employeeId);
    }
  }, [employeeData]);

  const constantData: LocalizationInterface = localizedData();
  const { experienceHeading } = constantData.Experience;
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
      {employeeData?.experience.length ? (
        <Grid
          className="experience-main"
          sx={{ display: "flow-root" }}
          container
        >
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

          {employeeData?.experience.map((exp, index) => {
            return (
              <Box key={exp?.title}>
                <Grid
                  className="experience-Card"
                  container
                  item
                  xs={12}
                  sm={12}
                  height={90}
                >
                  {/* B */}
                  <Grid item className="companyLogo-container" key={exp?.title}>
                    <img
                      className="profile-pic"
                      src={CompanyLogoOne}
                      alt="profile pic"
                    />
                  </Grid>

                  <Grid container item className="sub-container">
                    <Grid className="child-div-two-A" item>
                      <Typography variant="body1" className="description">
                        {exp?.title}
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
                          {exp?.company}{" "}
                        </Typography>
                      </Grid>
                      <Grid item className="heading-Two">
                        <Typography variant="body1" className="description">
                          {moment(exp?.start_date).year()} -{" "}
                          {moment(exp?.end_date).year()}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item className="divider" xs={12} sm={12}>
                  {index !== employeeData?.experience?.length - 1 ? (
                    <Divider
                      sx={{
                        color: "#E7E7E7",
                        margin: "0px 24px 0px 24px",
                      }}
                    />
                  ) : null}
                </Grid>
              </Box>
            );
          })}
        </Grid>
      ) : (
        ""
      )}
    </>
  );
}

export default Experience;
