import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";

interface FormInputProps {
  name: string;
  control: string;
  label: string;
}

const Input = ({ name, control, label }: FormInputProps) => {
  return (
    <Controller
      defaultValue=""
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          helperText={error ? error.message : null}
          size="medium"
          error={!!error}
          onChange={onChange}
          value={value}
          fullWidth
          label={label}
          variant="outlined"
        />
      )}
    />
  );
};
export default Input;
