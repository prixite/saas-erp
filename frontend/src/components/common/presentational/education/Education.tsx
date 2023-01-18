import { useEffect, useState } from "react";
import { Box, Divider, Grid, Typography } from "@mui/material";
import moment from "moment";
import { useParams } from "react-router-dom";
import CompanyIconThree from "@src/assets/svgs/CompanyIconThree.svg";
import { LocalizationInterface } from "@src/helpers/interfaces/localizationinterfaces";
import { localizedData } from "@src/helpers/utils/language";
import { useGetEmployeeDataQuery } from "@src/store/reducers/employees-api";
import "@src/components/common/presentational/education/education.scss";

function Education() {
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
  const { educationHeading } = constantData.Education;
  return (
    <>
      {employeeData?.degrees.length ? (
        <Grid
          className="education-main"
          sx={{ display: "flow-root" }}
          container
        >
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
          </Grid>
          {employeeData?.degrees.map((degree, index) => {
            return (
              <Box key={index}>
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
                      <Typography variant="body1" className="text-cls">
                        {degree?.program.name}
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
                        <Typography variant="body1" className="text-cls">
                          {degree?.institute.name}{" "}
                        </Typography>
                      </Grid>
                      <Grid item className="year">
                        <Typography variant="body1" className="text-cls">
                          {moment(degree?.year).year()}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid className="divider" item xs={12} sm={12}>
                  {index !== employeeData?.degrees?.length - 1 ? (
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
        </Grid>
      ) : (
        ""
      )}
    </>
  );
}

export default Education;
