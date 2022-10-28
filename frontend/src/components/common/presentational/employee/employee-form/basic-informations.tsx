import { useState } from "react";
import { Grid, Autocomplete, TextField } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useFormContext } from "react-hook-form";
import Controls from "@src/components/shared/form-controls/Controls";
import {
  designationOptions,
  employmentTypeOptions,
  benefitsOptions,
  assets,
} from "@src/helpers/constants/constants";

interface Props {
  setValue: string;
}

const BasicInformations = ({ setValue }: Props) => {
  const [dateStarted, setDateStarted] = useState<Date | null>(null);
  const {
    control,
    // formState: { errors },
  } = useFormContext();

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
          <Controls.Input name="name" label="Name" control={control} />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <Controls.Input name="email" label="Email" control={control} />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <Controls.Input name="phone" label="Phone Number" control={control} />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <Controls.Input name="cnic" label="CNIC" control={control} />
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
          <Controls.Input name="manager" label="Manager" control={control} />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <Controls.SelectDropdown
            name="designation"
            control={control}
            label="Designation"
            options={designationOptions}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <Controls.Input name="salary" label="Salary" control={control} />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <Controls.Input name="managing" label="Managing" control={control} />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <Controls.SelectDropdown
            name="employmentType"
            control={control}
            label="Employment Type"
            options={employmentTypeOptions}
          />
        </Grid>

        <Grid item xs={12} md={6} lg={6}>
          <Autocomplete
            multiple
            id="tags-outlined"
            options={assets}
            getOptionLabel={(option) => option.title}
            defaultValue={[assets[0]]}
            filterSelectedOptions
            renderInput={(params) => (
              <TextField {...params} label="Assets" placeholder="Assets" />
            )}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <Controls.Input name="emergencyContact" label="" control={control} />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <Controls.CheckboxInput
            control={control}
            setValue={setValue}
            name={"compansationBenefits"}
            label={"compansation & Benefits"}
            options={benefitsOptions}
          />
        </Grid>

        <Grid item xs={12} md={6} lg={6}>
          {/* <Controls.DatePicker
            name="dateStarted"
            control={control}
            label="Started Date"
          /> */}
        </Grid>
      </Grid>
    </>
  );
};

export default BasicInformations;
