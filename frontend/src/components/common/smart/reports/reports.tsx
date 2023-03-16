import React, { useState } from "react";
import { Box, Typography, Button, TextField, MenuItem } from "@mui/material";
import moment from "moment";
import { CSVLink } from "react-csv";
import downloadIcon from "@src/assets/svgs/download.svg";
import reportsPic from "@src/assets/svgs/reportsBoard.svg";
import EmployeeButtons from "@src/components/common/presentational/employeeButtons/EmployeeButtons";
import Attendance from "@src/components/common/smart/attendance/attendance";
import Leaves from "@src/components/common/smart/leaves/leaves";
import DateRangeModal from "@src/components/shared/popUps/dateRangeModal/dateRangeModal";
import { LocalizationInterface } from "@src/helpers/interfaces/localizationinterfaces";
import { localizedData } from "@src/helpers/utils/language";
import {
  useGetEmployeesQuery,
  useGetAttendanceQuery,
  useGetLeavesQuery,
} from "@src/store/reducers/employees-api";
import "@src/components/common/smart/reports/reports.scss";

function Reports() {
  const constantData: LocalizationInterface = localizedData();
  const { Reports, DownloadBtn, ReportsError, Monthly, Weekly, Custom } =
    constantData.Reports;
  const [employee, setEmployee] = useState<number>();
  const { data: employeetableData } = useGetEmployeesQuery();

  const [openModal, setOpenModal] = useState(false);
  const [selectValue, setSelectValue] = useState("Monthly");
  const [state, setState] = useState([
    {
      startDate: null,
      endDate: null,
      key: "selection",
    },
  ]);

  const [buttonNameClicked, setButtonNameClicked] =
    useState<string>("ATTENDANCE");
  const { data: rows, isLoading } = useGetAttendanceQuery(
    {
      id: employee,
      interval: selectValue,
      start_date: state[0].startDate
        ? moment(state[0].startDate).format("YYYY-MM-DD")
        : "",
      end_date: state[0].endDate
        ? moment(state[0].endDate).format("YYYY-MM-DD")
        : "",
    },
    { skip: !employee || buttonNameClicked !== "ATTENDANCE" }
  );
  const { data: leavesRows, isLoading: isLeavesLoading } = useGetLeavesQuery(
    {
      id: employee,
      interval: selectValue,
      start_date: state[0].startDate
        ? moment(state[0].startDate).format("YYYY-MM-DD")
        : "",
      end_date: state[0].endDate
        ? moment(state[0].endDate).format("YYYY-MM-DD")
        : "",
    },
    { skip: !employee || buttonNameClicked !== "LEAVES" }
  );
  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === "Custom") {
      setOpenModal(true);
    }
    setState([
      {
        startDate: null,
        endDate: null,
        key: "selection",
      },
    ]);
    setSelectValue(event.target.value as string);
  };
  const handleModalClose = () => {
    setSelectValue("");
    setOpenModal(false);
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmployee(parseInt(event.target.value));
  };
  const leavData = [
    {
      name: "employe one",
      reason: "urgent work",
      hr_Comment: "",
      id: 1,
      leave_from: "2023-03-09",
      leave_to: "2023-03-12",
      leave_type: null,
      organization: 3,
      status: "approved",
      updated_at: "2023-03-09T12:49:13.006037Z",
      updated_by: null,
    },
  ];
  //let arr = []
  //arr.push(leavData);
  //console.log(arr);

  //function ret(leavData) {
  //arr = []
  //leavData.map((c) => {
  // delete c.id
  // c.name = c.employee.name;
  // c.department = c.employee.department;
  // delete c.employee
  // arr.push(c)
  //})
  // return arr
  // }
  // console.log(ret(arr));

  const data = [
    {
      name: "ali",
      leaveType: "full time",
      department: "cs",
      leaveFrom: 25 - 10 - 23,
      leaveTo: 28 - 10 - 2023,
      reason: "annual",
      hrComments: "ok",
      status: "approved",
      actions: "approve",
    },
  ];

  const headers = [
    {
      label: "Name",
      key: "name",
    },
    {
      label: "Leave_Type",
      key: "leave_type",
    },
    {
      label: "Department",
      key: "department",
    },
    {
      label: "Leave_From",
      key: "leave_from",
    },
    {
      label: "Leave_To",
      key: "leave_to",
    },
    {
      label: "Reason",
      key: "reason",
    },
    {
      label: "Hr_Comment",
      key: "hr_Comment",
    },
    {
      label: "Status",
      key: "status",
    },
    {
      label: "Actions",
      key: "actions",
    },
  ];

  const csvLink = {
    filename: "data.csv",
    headers: headers,
    data: leavData,
  };
  //console.log(leavesRows);
  //console.log(data);

  return (
    <Box className="reports-section">
      <Box className="top-bar-cls">
        <Typography className="title-cls">{Reports}</Typography>
        <EmployeeButtons setButtonNameClicked={setButtonNameClicked} />
      </Box>
      <Box className="filter-section">
        <Box className="fields-cls" sx={{ mr: "15px" }}>
          <TextField
            className="text-field-cls"
            select
            fullWidth
            name="employee"
            label="Select Employee"
            sx={{
              width: 150,
            }}
            InputProps={{
              sx: {
                height: 44,
                borderRadius: "12px",
                fontSize: "14px",
                fontWeight: "400",
              },
            }}
            InputLabelProps={{
              className: "textfield_label",
              sx: {
                fontSize: "1.6vh",
                top: "-0.4vh",
                "&.MuiInputLabel-shrink": { top: 0 },
              },
            }}
            value={employee || ""}
            onChange={handleChange}
          >
            {employeetableData?.length ? (
              employeetableData?.map((employee) => {
                return (
                  <MenuItem
                    sx={{ fontSize: "14px" }}
                    key={employee?.id}
                    value={employee?.id}
                  >{`${employee.first_name} ${employee.last_name}`}</MenuItem>
                );
              })
            ) : (
              <Box></Box>
            )}
          </TextField>
        </Box>

        {employee ? (
          buttonNameClicked === "ATTENDANCE" ? (
            <Box className="filter-btn-cls">
              <CSVLink data={data} headers={headers} filename="data.csv">
                <Button
                  className="filter-btn"
                  id="filter-btn-id"
                  variant="outlined"
                  startIcon={
                    <img
                      className="profile-pic"
                      src={downloadIcon}
                      alt="profile pic"
                    />
                  }
                >
                  {" "}
                  <p>{DownloadBtn}</p>
                </Button>
              </CSVLink>
            </Box>
          ) : buttonNameClicked === "AVAILABILITY" ? (
            <Box className="filter-btn-cls">
              <Button
                className="filter-btn"
                id="filter-btn-id"
                variant="outlined"
                startIcon={
                  <img
                    className="profile-pic"
                    src={downloadIcon}
                    alt="profile pic"
                  />
                }
              >
                {" "}
                <p>{DownloadBtn}</p>
              </Button>
            </Box>
          ) : buttonNameClicked === "LEAVES" ? (
            <Box className="filter-btn-cls">
              <CSVLink {...csvLink}>
                <Button
                  className="filter-btn"
                  id="filter-btn-id"
                  variant="outlined"
                  startIcon={
                    <img
                      className="profile-pic"
                      src={downloadIcon}
                      alt="profile pic"
                    />
                  }
                >
                  {" "}
                  <p>{DownloadBtn}</p>
                </Button>
              </CSVLink>
            </Box>
          ) : (
            <></>
          )
        ) : (
          <Box className="filter-btn-cls">
            <Button
              className="filter-btn"
              id="filter-btn-id"
              variant="outlined"
              startIcon={
                <img
                  className="profile-pic"
                  src={downloadIcon}
                  alt="profile pic"
                />
              }
            >
              {" "}
              <p>{DownloadBtn}</p>
            </Button>
          </Box>
        )}

        <Box className="fields-cls">
          <TextField
            margin="normal"
            className="text-field-cls"
            select
            fullWidth
            value={selectValue}
            defaultValue={selectValue}
            onChange={handleValueChange}
            sx={{
              width: 125,
            }}
            InputProps={{
              sx: {
                height: 44,
                borderRadius: "12px",
                fontSize: "14px",
                fontWeight: "400",
              },
            }}
            label="Duration"
            InputLabelProps={{
              className: "textfield_label",
              sx: {
                fontSize: "1.6vh",
                top: "-0.4vh",
                "&.MuiInputLabel-shrink": { top: 0 },
              },
            }}
          >
            <MenuItem
              sx={{ fontWeight: "400", fontSize: "14px" }}
              value="Monthly"
            >
              {Monthly}
            </MenuItem>
            <MenuItem
              sx={{ fontWeight: "400", fontSize: "14px" }}
              value="Weekly"
            >
              {Weekly}
            </MenuItem>
            <MenuItem
              sx={{ fontWeight: "400", fontSize: "14px" }}
              value="Custom"
            >
              {Custom}
            </MenuItem>
          </TextField>
        </Box>
      </Box>
      {selectValue === "Custom" ? (
        <DateRangeModal
          state={state}
          setDate={setState}
          open={openModal}
          handleClose={handleModalClose}
        />
      ) : (
        ""
      )}
      {employee ? (
        buttonNameClicked === "ATTENDANCE" ? (
          <Attendance reportsData={rows} isReportsLoading={isLoading} />
        ) : buttonNameClicked === "AVAILABILITY" ? (
          <p>Availabilty</p>
        ) : buttonNameClicked === "LEAVES" ? (
          <Leaves isLeavesData={leavesRows} isLeavesLoading={isLeavesLoading} />
        ) : (
          <></>
        )
      ) : (
        <>
          <Box sx={{ mt: "200px", display: "flex", justifyContent: "center" }}>
            <img className="profile-pic" src={reportsPic} alt="reports" />
          </Box>
          <Typography
            sx={{ display: "flex", justifyContent: "center", mt: "5px" }}
          >
            {ReportsError}
          </Typography>
        </>
      )}
    </Box>
  );
}
export default Reports;
