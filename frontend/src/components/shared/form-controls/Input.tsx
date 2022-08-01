import React from "react";
import { Controller } from "react-hook-form";
import { TextField } from "@mui/material";

interface FormInputProps {
  name: string;
  control: any;
  label: string;
  setValue?: any;
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
