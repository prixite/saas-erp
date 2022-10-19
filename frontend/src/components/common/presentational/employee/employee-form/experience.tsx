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

const Experience = ({ setValue }: Props) => {
  const [dateStarted, setDateStarted] = useState<Date | null>(null);
  const [dateEnded, setDateEnded] = useState<Date | null>(null);
  const { control } = useFormContext();

  const designationOptions = [
    {
      label: "Sr. Product Designer",
      value: "1",
    },
    {
      label: "Senior Front End Developer",
      value: "2",
    },
  ];

  const companyOptions = [
    {
      label: "Google",
      value: "1",
    },
    {
      label: "Microsoft",
      value: "2",
    },
    {
      label: "Prixite",
      value: "3",
    },
  ];

  const checkOption = [
    {
      label: "Currently Working here",
      value: "currentlyWorking",
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
            name="designation"
            control={control}
            label="Designation"
            options={designationOptions}
          />
        </Grid>

        <Grid item xs={12} md={6} lg={6}>
          <Controls.SelectDropdown
            name="company"
            control={control}
            label="Company"
            options={companyOptions}
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
            name={"currentlyWorking"}
            label={""}
            options={checkOption}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Experience;
