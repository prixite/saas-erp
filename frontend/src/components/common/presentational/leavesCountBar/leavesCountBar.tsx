import { Box, Stack, Typography } from "@mui/material";
import { empLeaves } from "@src/helpers/interfaces/employees-modal";
import "@src/components/common/presentational/leavesCountBar/leavesCountBar.scss";
import { LocalizationInterface } from "@src/helpers/interfaces/localizationinterfaces";
import { localizedData } from "@src/helpers/utils/language";

interface Props {
  employeeLeavesData: empLeaves[];
}

const LeavesCountBar = ({ employeeLeavesData }: Props) => {
  const constantData: LocalizationInterface = localizedData();
  const { AnnualLeaves, CausalLeaves, SickLeaves } = constantData.Leaves;
  const annualLeaves = employeeLeavesData?.filter(
    (e) => e.leave_type.toLowerCase() === "annual leave"
  ).length;
  const casualLeaves = employeeLeavesData?.filter(
    (e) => e.leave_type.toLowerCase() === "sick leave"
  ).length;
  const sickLeaves = employeeLeavesData?.filter(
    (e) => e?.leave_type?.toLowerCase() === "causal leave"
  ).length;
  return (
    <Stack className="stack-cls" direction="row" spacing={1}>
      <Box className="leave-cls">
        <Typography className="title-cls">{AnnualLeaves}</Typography>
        <Typography className="value-cls">{`${annualLeaves}/14`}</Typography>
      </Box>
      <Box className="leave-cls">
        <Typography className="title-cls">{CausalLeaves}</Typography>
        <Typography className="value-cls">{`${casualLeaves}/14`}</Typography>
      </Box>
      <Box className="leave-cls">
        <Typography className="title-cls">{SickLeaves}</Typography>
        <Typography className="value-cls">{`${sickLeaves}/14`}</Typography>
      </Box>
    </Stack>
  );
};

export default LeavesCountBar;
