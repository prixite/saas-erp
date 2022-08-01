import { buttonUnstyledClasses } from "@mui/base/ButtonUnstyled";
import TabPanelUnstyled from "@mui/base/TabPanelUnstyled";
import TabsListUnstyled from "@mui/base/TabsListUnstyled";
import TabsUnstyled from "@mui/base/TabsUnstyled";
import TabUnstyled, { tabUnstyledClasses } from "@mui/base/TabUnstyled";
import { Grid } from "@mui/material";
import { styled } from "@mui/system";

const Tab = styled(TabUnstyled)`
  font-family: IBM Plex Sans, sans-serif;
  color: #000000;
  cursor: pointer;
  font-size: 14px;
  font-weight: normal;
  background-color: transparent;
  padding: 17px 12px;
  margin: 6px 6px;
  border: 1px solid lightgray;
  border-radius: 8px;
  display: flex;
  justify-content: center;

  &:hover {
    background-color: #fff4f4;
  }

  &:focus {
    color: #fff;
    border-radius: 3px;
    outline-offset: 2px;
  }

  &.${tabUnstyledClasses.selected} {
    background-color: #ff2f2f;
    color: #ffffff;
  }

  &.${buttonUnstyledClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const TabPanel = styled(TabPanelUnstyled)`
  width: 100%;
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
`;

const TabsList = styled(TabsListUnstyled)`
  min-width: 320px;
  border-radius: 8px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  align-content: space-between;
`;

export default function EmployeeDetails() {
  return (
    <Grid container direction="row" justifyContent="center" alignItems="center">
      <Grid item xs={11}>
        <TabsUnstyled defaultValue={0}>
          <TabsList>
            <Tab>Basic Information</Tab>
            <Tab>Documents</Tab>
            <Tab>Compensation and benefits</Tab>
          </TabsList>
          <TabPanel value={0}>First page</TabPanel>
          <TabPanel value={1}>Second page</TabPanel>
          <TabPanel value={2}>Third page</TabPanel>
        </TabsUnstyled>
      </Grid>
    </Grid>
  );
}
