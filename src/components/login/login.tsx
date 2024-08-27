import React, { useEffect, useState } from "react";
import { Box, Divider, TextField, Typography, useMediaQuery } from "@mui/material";
import theme from "../../theme";
import axios from "axios";
import PasswordStrengthBar from "react-password-strength-bar";
import CryptoJS from "crypto-js";
import LoginPrimaryButton from "./loginPrimaryButton";
import EmailField from "./emailTextField";
import PasswordField from "./passwordTextField";
import LoginButtons from "./loginButtons";
import CommonTextField from "./commonTextField";

const apiKey = "your-secret-api-key";

const LoginForm: React.FC = () => {
  const screenSizeUpSm = useMediaQuery(theme.breakpoints.up("sm"));
  const [signInWithEmailSelected, setSignInWithEmailSelected] = useState<boolean>(false);
  const [continueButtonState, setContinueButtonState] = useState<boolean>(true);
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [contactNumber, setContactNumber] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [newRepeatedPassword, setNewRepeatedPassword] = useState<string>("");
  const [repeatedPasswordHelperText, setRepeatedPasswordHelperText] = useState<string>("");
  const [emailAvailability, setEmailAvailability] = useState<boolean>(false);
  const [signUpUser, setSignUpUser] = useState<boolean>(false);
  const [loginUserState, setloginUserState] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const secretEncryptionKey = "your-secret-key";

  useEffect(() => {
    if (emailAvailability === true) {
      setContinueButtonState(true);
    }
  }, [emailAvailability]);

  useEffect(() => {
    console.log(email, name, password, newPassword, newRepeatedPassword, contactNumber);
  }, [email, name, password, newPassword, newRepeatedPassword, contactNumber]);

  const handleSignInWithEmail = () => {
    setSignInWithEmailSelected(true);
  };

  useEffect(() => {
    if (newRepeatedPassword !== newPassword) {
      setRepeatedPasswordHelperText("Passwords do not match");
    } else {
      setRepeatedPasswordHelperText("");
    }
  }, [newRepeatedPassword]);

  const verifyEmail = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/user/verifyEmail",
        { email: email },
        {
          headers: {
            "api-key": apiKey,
          },
        }
      );
      const { success } = await response.data;
      if (success === true) {
        setEmailAvailability(true);
        setSignUpUser(false);
        setloginUserState(true);
      } else {
        setEmailAvailability(false);
        setSignUpUser(true);
        setloginUserState(false);
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  const loginUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await verifyEmail();
    const encryptedPassword = CryptoJS.AES.encrypt(password, secretEncryptionKey).toString();
    if (email && password) {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/user/loginUser",
          {
            email,
            encryptedPassword,
          },
          {
            headers: {
              "api-key": apiKey,
            },
          }
        );
        const result = await response;
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    }
    console.log("logging", encryptedPassword);
  };

  const registerUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await verifyEmail();
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  useEffect(() => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (email.length > 0 && emailPattern.test(email)) {
      setContinueButtonState(false);
    } else {
      setContinueButtonState(true);
    }
  }, [email]);

  return (
    <Box
      sx={{
        paddingTop: screenSizeUpSm ? "73px" : "56px",
        display: "flex",
        flexDirection: "column",
        minHeight: "600px",
        justifyContent: "center",
        maxWidth: "450px",
        margin: "0 auto",
      }}
    >
      <form onSubmit={signUpUser ? registerUser : loginUser}>
        <Box sx={{ padding: "24px" }}>
          <Typography sx={{ fontSize: "22px", fontWeight: "bold", paddingBottom: "20px" }}>
            Sign up or log in
          </Typography>
          {!signInWithEmailSelected ? (
            <Box>
              <Divider textAlign="center">
                <Typography variant="body2">or</Typography>
              </Divider>
              <LoginPrimaryButton onClick={handleSignInWithEmail} name={"Continue with email"} />
            </Box>
          ) : (
            <Box>
              <EmailField email={email} onChange={handleEmailChange} />
              {emailAvailability && (
                <PasswordField
                  showPassword={showPassword}
                  onClickShowPassword={handleClickShowPassword}
                  onChange={(event) => setPassword(event.currentTarget.value)}
                  value={password}
                />
              )}
              {signUpUser && (
                <>
                  <CommonTextField
                    label="Full Name"
                    placeholder="Full Name"
                    value={name}
                    onChange={(event) => setName(event.currentTarget.value)}
                    type="text"
                    inputProps={{ autoComplete: "name" }}
                  />
                  <CommonTextField
                    label="Contact No"
                    placeholder="Contact No"
                    value={contactNumber}
                    onChange={(event) => setContactNumber(event.currentTarget.value)}
                    type="number"
                    inputProps={{ maxLength: 12, autoComplete: "tel" }}
                  />
                  <PasswordField
                    showPassword={showPassword}
                    onClickShowPassword={handleClickShowPassword}
                    onChange={(event) => setNewPassword(event.currentTarget.value)}
                    value={newPassword}
                  />
                  {newPassword !== "" && <PasswordStrengthBar password={newPassword} minLength={8} />}
                  <CommonTextField
                    label="Repeat Password"
                    placeholder="Repeat Password"
                    value={newRepeatedPassword}
                    onChange={(event) => setNewRepeatedPassword(event.currentTarget.value)}
                    type={showPassword ? "text" : "password"}
                    helperText={repeatedPasswordHelperText}
                  />
                </>
              )}
              <LoginButtons
                signUpUser={signUpUser}
                loginUserState={loginUserState}
                continueButtonState={continueButtonState}
                handleClickShowPassword={handleClickShowPassword}
              />
            </Box>
          )}
        </Box>
      </form>
    </Box>
  );
};

export default LoginForm;
