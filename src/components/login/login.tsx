import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { Box, Divider, Typography, useMediaQuery } from '@mui/material';
import theme from '../../theme';
import axios from 'axios';
import PasswordStrengthBar from 'react-password-strength-bar';
import CryptoJS from 'crypto-js';
import LoginPrimaryButton from './loginPrimaryButton';
import EmailField from './emailTextField';
import PasswordField from './passwordTextField';
import LoginButtons from './loginButtons';
import CommonTextField from './commonTextField';
import { useDispatch } from 'react-redux';
import { setLoggedIn } from '../../redux/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { generateSalt, hashPassword } from '../../utils/hash-helper';
import ResetTokenInput from './resetTokenInput';

const APIKEY = process.env.REACT_APP_API_KEY;

const LoginForm: React.FC = () => {
  const screenSizeUpSm = useMediaQuery(theme.breakpoints.up('sm'));
  const [signInWithEmailSelected, setSignInWithEmailSelected] =
    useState<boolean>(false);
  const [formActionMessage, setFormActionMessage] =
    useState<string>('Sign up or log in');
  const [resetPasswordMessage, setResetPasswordMessage] = useState<string>('');
  const [continueButtonState, setContinueButtonState] = useState<boolean>(true);
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [contactNumber, setContactNumber] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordHelperText, setPasswordHelperText] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [newRepeatedPassword, setNewRepeatedPassword] = useState<string>('');
  const [repeatedPasswordHelperText, setRepeatedPasswordHelperText] =
    useState<string>('');
  const [emailAvailability, setEmailAvailability] = useState<boolean>(false);
  const [passwordFieldAvailability, setPasswordFieldAvailability] =
    useState<boolean>(false);
  const [emailFieldAvailability, setEmailFieldAvailability] =
    useState<boolean>(true);
  const [resetTokenInputAvailability, setResetTokenInputAvailability] =
    useState<boolean>(false);
  const [signUpUser, setSignUpUser] = useState<boolean>(false);
  const [loginUserState, setloginUserState] = useState<boolean>(false);
  const [resetPasswordState, setResetPasswordState] = useState<boolean>(false);
  const [emaiLHelperText, setEmailHelperText] = useState<string>('');
  const [contactHelperText, setContactHelperText] = useState<string>('');
  const [signUpDisabled, setSignUpDisabled] = useState<boolean>(false);
  const [resetButtonState, setresetButtonState] = useState<boolean>(true);

  const navigate = useNavigate();
  const secretEncryptionKey = 'your-secret-key';

  useEffect(() => {
    if (emailAvailability === true) {
      setContinueButtonState(true);
    }
  }, [emailAvailability]);

  useEffect(() => {
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
    const IsTrue = allValid;
    if (!isEmailValid) {
      setEmailHelperText('Invalid Email');
    } else {
      setEmailHelperText('');
    }
    if (!isContactNumberValid) {
      setContactHelperText('Invalid Contact Number');
    } else {
      setContactHelperText('');
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
      setRepeatedPasswordHelperText('Passwords do not match');
    } else {
      setRepeatedPasswordHelperText('');
    }
  }, [newRepeatedPassword]);

  const verifyEmail = async () => {
    try {
      const response = await axios.post(
        'http://192.168.1.6:8000/api/user/verifyEmail',
        { email: email },
        {
          headers: {
            'api-key': APIKEY,
          },
        },
      );
      const { success } = await response.data;
      if (success === true) {
        setEmailAvailability(true);
        setPasswordFieldAvailability(true);
        setSignUpUser(false);
        setloginUserState(true);
      } else {
        setEmailAvailability(false);
        setPasswordFieldAvailability(false);
        setSignUpUser(true);
        setloginUserState(false);
      }
    } catch (error) {
      console.log('Error', error);
    }
  };

  const dispatch = useDispatch();
  const loginUser = async () => {
    await verifyEmail();
    const encryptedPassword = CryptoJS.AES.encrypt(
      password,
      secretEncryptionKey,
    ).toString();
    if (email && password) {
      try {
        const response = await axios.post(
          'http://192.168.1.6:8000/api/user/loginUser',
          {
            email,
            encryptedPassword,
          },
          {
            headers: {
              'api-key': APIKEY,
            },
          },
        );
        if (response.data.success === false) {
          setPasswordHelperText('Invalid Password or Email');
          setresetButtonState(false);
        } else {
          const token = response.data.token;
          setPasswordHelperText('');
          Cookies.set('token', token, { expires: 1 });
          dispatch(setLoggedIn(token));
          navigate('/');
          console.log(response);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const registerUser = async () => {
    await verifyEmail();
    try {
      const salt = generateSalt();
      const hashedPassword = hashPassword(password, salt);
      console.log(hashedPassword);
      const response = await axios.post(
        'http://192.168.1.6:8000/api/user/registerUser',
        {
          email: email,
          name: name,
          contactNumber: contactNumber,
          NewPassword: hashedPassword,
          salt: salt,
        },
        {
          headers: {
            'api-key': APIKEY,
          },
        },
      );
      const result = await response.data.success;
      if (result === true) {
        setSignUpUser(false);
        setName('');
        setContactNumber('');
        setNewPassword('');
        setNewRepeatedPassword('');
        setContactHelperText('');
        setPassword('');
        setPasswordHelperText('');
        setloginUserState(true);
        setEmailAvailability(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const resetPasswordStateUpdate = () => {
    setloginUserState(false);
    setPasswordFieldAvailability(false);
    setFormActionMessage('Reset Your Password');
    setResetPasswordMessage(
      'To reset your password, we need to send you an email.',
    );
    setResetPasswordState(true);
    setContinueButtonState((prev) => !prev);
  };

  const resetPassword = async () => {
    setResetPasswordMessage('You will recieve an email please wait...');
    setContinueButtonState((prev) => !prev);
    try {
      const response = await axios.post(
        'http://192.168.1.6:8000/api/user/requestResetUserPassword',
        {
          email,
        },
        {
          headers: {
            'api-key': APIKEY,
          },
        },
      );
      const responseData = response.data;
      if (responseData.success === true) {
        setResetPasswordMessage('Email sent succesfully');
        setEmailFieldAvailability(false);
        setFormActionMessage('Verify your token to reset your password');
        setResetTokenInputAvailability(true);
      } else {
        alert('Cannot reset your password right now');
        setContinueButtonState(true);
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
        setEmailHelperText('');
        break;
      case emailPattern.test(email):
        setEmailHelperText('');
        break;
      default:
        setEmailHelperText('Invalid Email');

        break;
    }
  }, [handleEmailChange]);

  useEffect(() => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (email && emailPattern.test(email)) {
      setContinueButtonState(false);
    } else {
      setContinueButtonState(true);
    }
  }, [email]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (resetPasswordState) {
      resetPassword();
    } else if (signUpUser) {
      registerUser();
    } else {
      loginUser();
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        marginTop: screenSizeUpSm ? '73px' : '56px',
        minHeight: '600px',
        justifyContent: 'center',
        maxWidth: '450px',
        margin: '0 auto',
      }}
    >
      <form onSubmit={handleSubmit}>
        <Box sx={{ padding: '24px' }}>
          <Typography
            sx={{ fontSize: '22px', fontWeight: 'bold', paddingBottom: '20px' }}
          >
            {formActionMessage}
          </Typography>
          <Typography sx={{ fontSize: '16px', paddingBottom: '20px' }}>
            {resetPasswordMessage}
          </Typography>
          {resetTokenInputAvailability && <ResetTokenInput />}
          {!signInWithEmailSelected ? (
            <Box>
              <Divider textAlign="center">
                <Typography variant="body2">or</Typography>
              </Divider>
              <LoginPrimaryButton
                onClick={handleSignInWithEmail}
                name={'Continue with email'}
              />
            </Box>
          ) : (
            <Box>
              {emailFieldAvailability && (
                <EmailField
                  email={email}
                  onChange={handleEmailChange}
                  helperText={emaiLHelperText}
                />
              )}
              {passwordFieldAvailability && (
                <PasswordField
                  label="Password"
                  value={password}
                  onChange={(event) => setPassword(event.currentTarget.value)}
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
                    inputProps={{ autoComplete: 'name' }}
                  />
                  <CommonTextField
                    label="Contact No"
                    placeholder="Contact No"
                    value={contactNumber}
                    onChange={(event) =>
                      setContactNumber(event.currentTarget.value)
                    }
                    type="number"
                    inputProps={{ maxLength: 12, autoComplete: 'tel' }}
                    helperText={contactHelperText}
                  />
                  <PasswordField
                    label="New Password"
                    onChange={(event) =>
                      setNewPassword(event.currentTarget.value)
                    }
                    value={newPassword}
                  />
                  {newPassword !== '' && (
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
                resetButtonState={resetButtonState}
                resetPasswordState={resetPasswordStateUpdate}
              />
            </Box>
          )}
        </Box>
      </form>
    </Box>
  );
};

export default LoginForm;
