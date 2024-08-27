import React from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

interface PasswordFieldProps {
  showPassword: boolean;
  onClickShowPassword: () => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

const PasswordField: React.FC<PasswordFieldProps> = ({ showPassword, onClickShowPassword, onChange, value }) => (
  <TextField
    id="password-field"
    placeholder="Password"
    type={showPassword ? "text" : "password"}
    InputProps={{
      endAdornment: (
        <InputAdornment position="end">
          <IconButton onClick={onClickShowPassword} edge="end">
            {showPassword ? <Visibility /> : <VisibilityOff />}
          </IconButton>
        </InputAdornment>
      ),
    }}
    fullWidth
    onChange={onChange}
    autoComplete="current-password"
    required
    value={value}
  />
);

export default PasswordField;
