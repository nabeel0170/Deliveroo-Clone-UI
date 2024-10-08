import React from 'react';
import { TextField, Typography } from '@mui/material';

interface EmailFieldProps {
  email?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  helperText?: string;
  name?: string;
}

const EmailField: React.FC<EmailFieldProps> = ({
  email,
  onChange,
  helperText,
  ...props
}) => (
  <>
    <Typography variant="body1">Email Address</Typography>
    <TextField
      id="email-field"
      placeholder="e.g. name@example.com"
      fullWidth
      value={email}
      onChange={onChange}
      helperText={helperText}
      {...props}
      type="email"
      required
      sx={{ marginBottom: '5px' }}
    />
  </>
);

export default EmailField;
