import React, { useState } from 'react';
import {
  TextField,
  InputAdornment,
  IconButton,
  Typography,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

interface PasswordFieldProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  password?: string;
  helperText?: string;
  label: string;
  name?: string;
  repeatedPassword?: string;
  newPassword?: string;
}

const PasswordField: React.FC<PasswordFieldProps> = ({
  onChange,
  password,
  helperText,
  label,
  repeatedPassword,
  name,
  newPassword,
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
        type={showPassword ? 'text' : 'password'}
        InputProps={{
          endAdornment:
            password && password.length > 0 ? (
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
        value={password || repeatedPassword || newPassword}
        helperText={helperText}
        name={name}
      />
    </div>
  );
};

export default PasswordField;
