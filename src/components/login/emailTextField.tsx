import React from "react";
import { TextField, Typography } from "@mui/material";

interface EmailFieldProps {
  email: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const EmailField: React.FC<EmailFieldProps> = ({ email, onChange }) => (
  <>
    <Typography variant="body1">Email Address</Typography>
    <TextField
      id="email-field"
      placeholder="e.g. name@example.com"
      fullWidth
      value={email}
      onChange={onChange}
      type="email"
      required
    />
  </>
);

export default EmailField;
