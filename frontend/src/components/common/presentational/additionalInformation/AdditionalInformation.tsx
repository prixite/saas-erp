import { useEffect, useState } from "react";
import { Grid, Typography, Button } from "@mui/material";
import moment from "moment";
import { useParams } from "react-router-dom";
import HideIcon from "@src/assets/svgs/HideIcon.svg";
import showIcon from "@src/assets/svgs/Show.svg";
import { LocalizationInterface } from "@src/helpers/interfaces/localizationinterfaces";
import { localizedData } from "@src/helpers/utils/language";
import { useGetEmployeeDataQuery } from "@src/store/reducers/employees-api";
import "@src/components/common/presentational/additionalInformation/additionalInformation.scss";

function AdditionalInformation() {
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
  const {
    additionalInformationHeading,
    department,
    manager,
    totalExperience,
    joiningDate,
    emergencyContact,
    cnic,
  } = constantData.AdditionalInformation;
  const [showResults, setShowResults] = useState(false);
  return (
    <>
      <Grid className="additional-Information-main">
        <Grid container item className="headingContainer" xs={12} sm={12}>
          <Grid item xs={9} sm={9} className="headingDiv">
            <Typography variant="body1" className="heading">
              {" "}
              {additionalInformationHeading}{" "}
            </Typography>
          </Grid>
        </Grid>

        <Grid
          className="CardOne"
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12}
          container
          item
        >
          <Grid
            container
            item
            className="department-Heading-Container"
            xs={3}
            sm={3}
          >
            <Typography variant="body1" className="department-title">
              {department}
            </Typography>

            <Typography variant="body1" className="department-text">
              {employeeData?.department?.name}
            </Typography>
          </Grid>

          <Grid
            container
            item
            className="employee-Name-Container"
            xs={3}
            sm={3}
          >
            <Typography variant="body1" className="employee-title">
              {manager}
            </Typography>

            <Typography variant="body1" className="employee-text">
              {employeeData?.manager?.name || ""}
            </Typography>
          </Grid>

          <Grid container item className="experience-Container" xs={3} sm={3}>
            <Typography variant="body1" className="experience-title">
              {totalExperience}
            </Typography>

            <Typography variant="body1" className="experience-text">
              {employeeData?.total_experience}
            </Typography>
          </Grid>

          <Grid container item className="data-Container" xs={3} sm={3}>
            <Typography variant="body1" className="data-title">
              {joiningDate}
            </Typography>
            <Typography variant="body1" className="data-text">
              {moment(employeeData?.date_of_joining).format("ll")}
            </Typography>
          </Grid>
        </Grid>

        <Grid xs={12} sm={12} container item className="CardTwo">
          <Grid className="emergency-Container" container item xs={6} sm={3}>
            <Grid className="emergency-title" item>
              <Typography className="text" variant="body1">
                {emergencyContact}
              </Typography>
            </Grid>

            <Grid className="emergency-text" item>
              <Typography className="text" variant="body1">
                {employeeData?.emergency_contact_number}
              </Typography>
            </Grid>
          </Grid>

          <Grid className="cnic-Container" container item xs={6} sm={8}>
            <Grid className="cnic-title" item>
              <Typography className="text" variant="body1">
                {cnic}
              </Typography>
            </Grid>

            <Grid className="cnic-text" item>
              {showResults ? (
                <Typography className="typo" variant="body1">
                  {employeeData?.nic}
                </Typography>
              ) : (
                <Typography className="typo1" variant="body1">
                  {Array(employeeData?.nic.length).join(".")}
                </Typography>
              )}
            </Grid>
            <Grid className="cnic-photo" item>
              <Button onClick={() => setShowResults(!showResults)}>
                <img
                  className="logo"
                  src={showResults ? showIcon : HideIcon}
                  alt="eye"
                />
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default AdditionalInformation;
