import { useState } from "react";
import { Divider, Grid, Typography, Box } from "@mui/material";
import "@src/components/common/presentational/benefitsSection/benefitsSection.scss";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import FormLabel from "@mui/material/FormLabel";
import { useParams } from "react-router-dom";
import circleIcon from "@src/assets/svgs/redcircle.svg";
import ThreeDotter from "@src/assets/svgs/ThreeDotter.svg";
import { toPkrFormat } from "@src/helpers/constants/constants";
import { EmployeeData } from "@src/helpers/interfaces/employees-modal";
import { LocalizationInterface } from "@src/helpers/interfaces/localizationinterfaces";
import { localizedData } from "@src/helpers/utils/language";
import { useApiEmployeesCompensationRetrieveQuery } from "@src/store/api";

interface benefitCompensationType {
  employeeData?: EmployeeData;
}
const BenefitsSection = ({ employeeData }: benefitCompensationType) => {
  const [perks, setPerks] = useState<string[]>([]);
  const constantData: LocalizationInterface = localizedData();
  const { employeeId } = useParams();
  const { data: compensationData } = useApiEmployeesCompensationRetrieveQuery({
    id: Number(employeeId || ""),
  });
  const {
    employeeBenefitsHeading,
    currentSalary,
    compensationType,
    compensationScheule,
    fuelAllowance,
  } = constantData.Employee;

  const handleAllowanceChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const index = perks.indexOf(event.target.value);
    if (index === -1) {
      setPerks([...perks, event.target.value]);
    } else {
      setPerks(perks.filter((perk) => perk !== event.target.value));
    }
  };
  return (
    <Box className="benefits-main">
      <Box className="benefits-heading">
        <Typography className="heading-text">
          {employeeBenefitsHeading}
        </Typography>
        <img className="heading-img" src={ThreeDotter} alt="menu" />
      </Box>
      <Grid container className="benefits-status-grid">
        <Grid className="current-salary-box" item xs={3} sm={3}>
          <Box className="current-salary">
            <Typography className="heading-cls">
              {currentSalary}: {"\u00A0"}
            </Typography>
            <Typography className="txt-cls">
              {toPkrFormat(compensationData?.current_salary)}
            </Typography>
          </Box>
        </Grid>
        <Grid className="compensation-type-box" item xs={3} sm={3}>
          <Box className="compensation-type">
            <Typography className="heading-cls">
              {compensationType}: {"\u00A0"}
            </Typography>
            <Typography className="txt-cls">
              {compensationData?.compensation_type}
            </Typography>
          </Box>
        </Grid>
        <Grid className="compensation-schedule-box" item xs={3} sm={3}>
          <Box className="comopensation-schdule">
            <Typography className="heading-cls">
              {compensationScheule}: {"\u00A0"}
            </Typography>
            <Typography className="txt-cls">
              {compensationData?.compensation_schedule}
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <Box className="perks-box">
        <FormControl>
          <FormLabel>
            <FormGroup row>
              {employeeData?.benefits.length ? (
                <>
                  {employeeData?.benefits?.map((benefit) => {
                    return (
                      <FormControlLabel
                        key={benefit}
                        control={
                          <Checkbox
                            disableRipple
                            size="small"
                            sx={{
                              "& .MuiSvgIcon-root": { fontSize: 18 },
                              "&:hover": {
                                backgroundColor: "transparent !important",
                              },
                              cursor: "auto",
                            }}
                            checked={true}
                            onChange={handleAllowanceChange}
                          />
                        }
                        value={fuelAllowance}
                        label={
                          <Typography className="label-cls">
                            {benefit}
                          </Typography>
                        }
                      />
                    );
                  })}
                </>
              ) : (
                ""
              )}
            </FormGroup>
          </FormLabel>
        </FormControl>
      </Box>
      <Box className="perks-activity-section">
        <Box className="perks-activity-box">
          <Box className="activity-icons">
            <img className="circle-img" src={circleIcon} alt="elipsis" />
            <Divider
              className="divider-cls"
              orientation="vertical"
              flexItem
              sx={{ borderRightWidth: 2 }}
            />
          </Box>
          <Box className="activity-description">
            <Typography className="date-cls">Sept 21, 2022</Typography>
            <Typography className="description-cls">
              Tempor verear conceptam ex pri, per omnes insolens ad, ne mea
              lorem explicari. Sed ea wisi epicuri. Vel cu lorem perfecto
              consetetur, ius ad mucius repudiare reformidans, prima tantas ei
              usu. Eam no altera delicata partiendo, id eum everti eruditi.Vel
              cu lorem perfecto consetetur, ius ad mucius repudiare reformidans,
              prima tantas ei usu. Eam no altera delicata partiendo, id eum
              everti eruditi
            </Typography>
          </Box>
        </Box>
        <Box className="perks-activity-box" sx={{ marginTop: "24px" }}>
          <Box className="activity-icons">
            <img className="circle-img" src={circleIcon} alt="elipsis" />
            <Divider
              className="divider-cls"
              orientation="vertical"
              flexItem
              sx={{ borderRightWidth: 2 }}
            />
          </Box>
          <Box className="activity-description">
            <Typography className="date-cls">Sept 21, 2022</Typography>
            <Typography className="description-cls">
              Tempor verear conceptam ex pri, per omnes insolens ad, ne mea
              lorem explicari. Sed ea wisi epicuri. Vel cu lorem perfecto
              consetetur, ius ad mucius repudiare reformidans, prima tantas ei
              usu. Eam no altera delicata partiendo, id eum everti eruditi.Vel
              cu lorem perfecto consetetur, ius ad mucius repudiare reformidans,
              prima tantas ei usu. Eam no altera delicata partiendo, id eum
              everti eruditi
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default BenefitsSection;
