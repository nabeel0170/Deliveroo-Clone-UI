import React from "react";
import { TextField, Typography } from "@mui/material";

interface CommonTextFieldProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type: string;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  helperText?: string;
}

const CommonTextField: React.FC<CommonTextFieldProps> = ({
  label,
  placeholder,
  value,
  onChange,
  type,
  inputProps,
  helperText,
}) => (
  <>
    <Typography variant="body1">{label}</Typography>
    <TextField
      placeholder={placeholder}
      type={type}
      fullWidth
      value={value}
      onChange={onChange}
      inputProps={inputProps}
      helperText={helperText}
      required
    />
  </>
);

export default CommonTextField;
