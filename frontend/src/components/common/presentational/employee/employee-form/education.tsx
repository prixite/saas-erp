import { useState } from "react";
import { Grid, TextField } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useFormContext } from "react-hook-form";
import Controls from "@src/components/shared/form-controls/Controls";

interface Props {
  setValue: string;
}

const Education = ({ setValue }: Props) => {
  const [dateStarted, setDateStarted] = useState<Date | null>(null);
  const [dateEnded, setDateEnded] = useState<Date | null>(null);
  const { control } = useFormContext();

  const degreeOptions = [
    {
      label: "Bachelor",
      value: "1",
    },
    {
      label: "Graduation",
      value: "2",
    },
  ];

  const universityOptions = [
    {
      label: "NUST University",
      value: "1",
    },
    {
      label: "Fast University",
      value: "2",
    },
    {
      label: "Comsats University",
      value: "3",
    },
  ];

  const checkOption = [
    {
      label: "Currently InProgress",
      value: "currentlyInProgress",
    },
  ];
  return (
    <>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        spacing={3}
        mt={3}
      >
        <Grid item xs={12} md={6} lg={6}>
          <Controls.SelectDropdown
            name="degree"
            control={control}
            label="Degree"
            options={degreeOptions}
          />
        </Grid>

        <Grid item xs={12} md={6} lg={6}>
          <Controls.SelectDropdown
            name="university"
            control={control}
            label="University"
            options={universityOptions}
          />
        </Grid>

        <Grid item xs={12} md={6} lg={6}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Date Started"
              value={dateStarted}
              onChange={(newValue) => {
                setDateStarted(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Date Ended"
              value={dateEnded}
              onChange={(newValue) => {
                setDateEnded(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Grid>

        <Grid item xs={12} md={12} lg={12}>
          <Controls.CheckboxInput
            control={control}
            setValue={setValue}
            name={"currentlyInProgressEdu"}
            label={""}
            options={checkOption}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Education;
