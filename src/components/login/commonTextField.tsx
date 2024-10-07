import React from 'react';
import { TextField, Typography } from '@mui/material';

interface CommonTextFieldProps {
  label: string;
  placeholder: string;
  value?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type: string;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  helperText?: string;
  userName?: string;
  name?: string;
  contactNumber?: string;
}

const CommonTextField: React.FC<CommonTextFieldProps> = ({
  label,
  placeholder,
  userName,
  name,
  onChange,
  type,
  inputProps,
  helperText,
  contactNumber,
}) => (
  <>
    <Typography variant="body1">{label}</Typography>
    <TextField
      placeholder={placeholder}
      type={type}
      fullWidth
      value={userName || contactNumber}
      name={name}
      onChange={onChange}
      inputProps={inputProps}
      helperText={helperText}
      required
      sx={{ marginBottom: '5px' }}
    />
  </>
);

export default CommonTextField;
