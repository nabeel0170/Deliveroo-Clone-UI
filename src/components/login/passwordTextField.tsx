import React, { useState } from "react";
import {
  TextField,
  InputAdornment,
  IconButton,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

interface PasswordFieldProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  helperText?: string;
  label: string;
}

const PasswordField: React.FC<PasswordFieldProps> = ({
  onChange,
  value,
  helperText,
  label,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div>
      <Typography variant="body1">{label}</Typography>
      <TextField
        id="password-field"
        placeholder="Password"
        type={showPassword ? "text" : "password"}
        InputProps={{
          endAdornment:
            value.length > 0 ? (
              <InputAdornment position="end">
                <IconButton onClick={handleClickShowPassword} edge="end">
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ) : null,
        }}
        fullWidth
        onChange={onChange}
        autoComplete="password"
        required
        value={value}
        helperText={helperText}
      />
    </div>
  );
};

export default PasswordField;
