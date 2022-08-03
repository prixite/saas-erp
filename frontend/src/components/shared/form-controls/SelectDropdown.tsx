/* eslint-disable import/no-unresolved */
import React from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { Controller } from "react-hook-form";

interface Type {
  label: string;
  value: number;
}
interface FormInputProps {
  name: string;
  control: unknown;
  label: string;
  options: Array<Type>;
}

export const SelectDropdown: React.FC<FormInputProps> = ({
  name,
  control,
  label,
  options,
}) => {
  const generateOptions = () => {
    return options.map((option: Type) => {
      return (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      );
    });
  };

  return (
    <FormControl size={"medium"} fullWidth>
      <InputLabel>{label}</InputLabel>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => {
          return (
            <>
              <Select
                error={!!error}
                onChange={onChange}
                value={value}
                label={label}
                defaultValue=""
              >
                {generateOptions()}
              </Select>
              {error && (
                <Typography variant="body2" sx={{ color: "#d32f2f" }}>
                  {error?.message}
                </Typography>
              )}
            </>
          );
        }}
      />
    </FormControl>
  );
};
