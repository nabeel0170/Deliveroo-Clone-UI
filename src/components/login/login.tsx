import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import {
  Box,
  Divider,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import theme from "../../theme";
import axios from "axios";
import PasswordStrengthBar from "react-password-strength-bar";
import CryptoJS from "crypto-js";
import LoginPrimaryButton from "./loginPrimaryButton";
import EmailField from "./emailTextField";
import PasswordField from "./passwordTextField";
import LoginButtons from "./loginButtons";
import CommonTextField from "./commonTextField";
import { useDispatch } from "react-redux";
import { setLoggedIn } from "../../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { generateSalt, hashPassword } from "../../utils/hash-helper";

const APIKEY = process.env.REACT_APP_API_KEY;

const LoginForm: React.FC = () => {
  const screenSizeUpSm = useMediaQuery(theme.breakpoints.up("sm"));
  const [signInWithEmailSelected, setSignInWithEmailSelected] =
    useState<boolean>(false);
  const [continueButtonState, setContinueButtonState] = useState<boolean>(true);
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [contactNumber, setContactNumber] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordHelperText, setPasswordHelperText] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [newRepeatedPassword, setNewRepeatedPassword] = useState<string>("");
  const [repeatedPasswordHelperText, setRepeatedPasswordHelperText] =
    useState<string>("");
  const [emailAvailability, setEmailAvailability] = useState<boolean>(false);
  const [signUpUser, setSignUpUser] = useState<boolean>(false);
  const [loginUserState, setloginUserState] = useState<boolean>(false);
  const [emaiLHelperText, setEmailHelperText] = useState<string>("");
  const [contactHelperText, setContactHelperText] = useState<string>("");
  const [signUpDisabled, setSignUpDisabled] = useState<boolean>(false);
  const navigate = useNavigate();
  const secretEncryptionKey = "your-secret-key";

  useEffect(() => {
    if (emailAvailability === true) {
      setContinueButtonState(true);
    }
  }, [emailAvailability]);

  useEffect(() => {
    let IsTrue: boolean;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const contactNumberPattern = /^\d{12}$/;

    const isEmailValid = emailPattern.test(email);
    const isNameValid = name.trim().length > 0;
    const isNewPasswordValid = newPassword.trim().length > 0;
    const isNewRepeatedPasswordValid = newPassword === newRepeatedPassword;
    const isContactNumberValid = contactNumberPattern.test(contactNumber);
    const allValid =
      isEmailValid &&
      isNameValid &&
      isNewPasswordValid &&
      isNewRepeatedPasswordValid &&
      isContactNumberValid;
    IsTrue = allValid;
    if (!isEmailValid) {
      setEmailHelperText("Invalid Email");
    } else {
      setEmailHelperText("");
    }
    if (!isContactNumberValid) {
      setContactHelperText("Invalid Contact Number");
    } else {
      setContactHelperText("");
    }
    if (IsTrue) {
      setSignUpDisabled(false);
    } else {
      setSignUpDisabled(true);
    }
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
            "api-key": APIKEY,
          },
        },
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

  const dispatch = useDispatch();
  const loginUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await verifyEmail();
    const encryptedPassword = CryptoJS.AES.encrypt(
      password,
      secretEncryptionKey,
    ).toString();
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
              "api-key": APIKEY,
            },
          },
        );
        if (response.data.success === false) {
          setPasswordHelperText("Invalid Password or Email");
        } else {
          const token = response.data.token;
          setPasswordHelperText("");
          Cookies.set("token", token, { expires: 1 });
          dispatch(setLoggedIn(token));
          navigate("/");
          console.log(response);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const registerUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await verifyEmail();
    try {
      const salt = generateSalt();
      const hashedPassword = hashPassword(password, salt);
      console.log(hashedPassword);
      const response = await axios.post(
        "http://localhost:8000/api/user/registerUser",
        {
          email: email,
          name: name,
          contactNumber: contactNumber,
          NewPassword: hashedPassword,
          salt: salt,
        },
        {
          headers: {
            "api-key": APIKEY,
          },
        },
      );
      const result = await response.data.success;
      if (result === true) {
        setSignUpUser(false);
        setName("");
        setContactNumber("");
        setNewPassword("");
        setNewRepeatedPassword("");
        setContactHelperText("");
        setPassword("");
        setPasswordHelperText("");
        setloginUserState(true);
        setEmailAvailability(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  useEffect(() => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    switch (true) {
      case email.length === 0:
        setEmailHelperText("");
        break;
      case emailPattern.test(email):
        setEmailHelperText("");
        break;
      default:
        setEmailHelperText("Invalid Email");
        break;
    }
  }, [handleEmailChange]);
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
        display: "flex",
        flexDirection: "column",
        marginTop: screenSizeUpSm ? "73px" : "56px",
        minHeight: "600px",
        justifyContent: "center",
        maxWidth: "450px",
        margin: "0 auto",
      }}
    >
      <form onSubmit={signUpUser ? registerUser : loginUser}>
        <Box sx={{ padding: "24px" }}>
          <Typography
            sx={{ fontSize: "22px", fontWeight: "bold", paddingBottom: "20px" }}
          >
            Sign up or log in
          </Typography>
          {!signInWithEmailSelected ? (
            <Box>
              <Divider textAlign="center">
                <Typography variant="body2">or</Typography>
              </Divider>
              <LoginPrimaryButton
                onClick={handleSignInWithEmail}
                name={"Continue with email"}
              />
            </Box>
          ) : (
            <Box>
              <EmailField
                email={email}
                onChange={handleEmailChange}
                helperText={emaiLHelperText}
              />
              {emailAvailability && (
                <PasswordField
                  label="Password"
                  onChange={(event) => setPassword(event.currentTarget.value)}
                  value={password}
                  helperText={passwordHelperText}
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
                    onChange={(event) =>
                      setContactNumber(event.currentTarget.value)
                    }
                    type="number"
                    inputProps={{ maxLength: 12, autoComplete: "tel" }}
                    helperText={contactHelperText}
                  />
                  <PasswordField
                    label="New Password"
                    onChange={(event) =>
                      setNewPassword(event.currentTarget.value)
                    }
                    value={newPassword}
                  />
                  {newPassword !== "" && (
                    <PasswordStrengthBar password={newPassword} minLength={8} />
                  )}
                  <PasswordField
                    label="Repeat Password"
                    value={newRepeatedPassword}
                    onChange={(event) =>
                      setNewRepeatedPassword(event.currentTarget.value)
                    }
                    helperText={repeatedPasswordHelperText}
                  />
                </>
              )}
              <LoginButtons
                signUpUser={signUpUser}
                loginUserState={loginUserState}
                continueButtonState={continueButtonState}
                signUpDisabled={signUpDisabled}
              />
            </Box>
          )}
        </Box>
      </form>
    </Box>
  );
};

export default LoginForm;
