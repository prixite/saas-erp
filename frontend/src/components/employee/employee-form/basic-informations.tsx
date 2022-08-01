import { Grid, Autocomplete, TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";
import Controls from "@src/components/shared/form-controls/Controls";

const BasicInformations = () => {
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
          <Controls.Input
            name="dateStarted"
            label="Date Started"
            control={control}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <Controls.Input name="manager" label="Manager" control={control} />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <Controls.Input
            name="designation"
            label="Designation"
            control={control}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <Controls.Input name="salary" label="Salary" control={control} />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <Controls.Input name="managing" label="Managing" control={control} />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <Controls.Input
            name="employmentType"
            label="Employment Type"
            control={control}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <Controls.Input
            name="employmentType"
            label="Employment Type"
            control={control}
          />
        </Grid>

        <Grid item xs={12} md={6} lg={6}>
          <Autocomplete
            multiple
            id="tags-outlined"
            options={assets}
            getOptionLabel={(option) => option.title}
            defaultValue={[assets[3]]}
            filterSelectedOptions
            renderInput={(params) => (
              <TextField {...params} label="Assets" placeholder="Assets" />
            )}
          />
        </Grid>
      </Grid>
    </>
  );
};
const assets = [
  { title: "Laptop" },
  { title: "Mouse" },
  { title: "Handsfree" },
  { title: "Laptop" },
];

export default BasicInformations;
