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
import * as Yup from 'yup';
import { emailValidationSchema, loginValidationSchema, signUpValidationSchema } from '../../schemas/loginSchemas';

const APIKEY = process.env.REACT_APP_API_KEY;

const LoginActions: React.FC = () => {
  const screenSizeUpSm = useMediaQuery(theme.breakpoints.up('sm'));
  const [signInWithEmailSelected, setSignInWithEmailSelected] = useState<boolean>(false);
  const [formActionMessage, setFormActionMessage] = useState<string>('Sign up or log in');
  const [resetPasswordMessage, setResetPasswordMessage] = useState<string>('');
  const [continueButtonState, setContinueButtonState] = useState<boolean>(false);
  const [passwordHelperText, setPasswordHelperText] = useState<string>('');
  const [repeatedPasswordHelperText, setRepeatedPasswordHelperText] = useState<string>('');
  const [emailAvailability, setEmailAvailability] = useState<boolean>(false);
  const [passwordFieldAvailability, setPasswordFieldAvailability] = useState<boolean>(false);
  const [emailFieldAvailability, setEmailFieldAvailability] = useState<boolean>(true);
  const [resetTokenInputAvailability, setResetTokenInputAvailability] = useState<boolean>(false);
  const [signUpUser, setSignUpUser] = useState<boolean>(false);
  const [loginUserState, setloginUserState] = useState<boolean>(false);
  const [resetPasswordState, setResetPasswordState] = useState<boolean>(false);
  const [signUpDisabled, setSignUpDisabled] = useState<boolean>(false);
  const [resetButtonState, setresetButtonState] = useState<boolean>(true);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    contactNumber: '',
    password: '',
    newPassword: '',
    newRepeatedPassword: '',
  });

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const navigate = useNavigate();
  const secretEncryptionKey = 'your-secret-key';

  const getValidationSchema = () => {
    if (signInWithEmailSelected && !signUpUser) {
      return emailValidationSchema;
    }

    if (signUpUser) {
      console.log('signUpUser');
      return signUpValidationSchema;
    }

    return loginValidationSchema;
  };

  useEffect(() => {
    if (emailAvailability === true) {
      setContinueButtonState(true);
    }
  }, [emailAvailability]);

  useEffect(() => {
    if (errors) {
      setSignUpDisabled(false);
    } else {
      setSignUpDisabled(true);
    }
  }, [errors]);

  const handleSignInWithEmail = () => {
    setSignInWithEmailSelected(true);
  };

  useEffect(() => {
    if (formData.newRepeatedPassword !== formData.newPassword) {
      setRepeatedPasswordHelperText('Passwords do not match');
    } else {
      setRepeatedPasswordHelperText('');
    }
  }, [formData.newRepeatedPassword]);

  const verifyEmail = async () => {
    try {
      const response = await axios.post(
        'http://192.168.1.6:8000/api/user/verifyEmail',
        { email: formData.email },
        {
          headers: {
            'api-key': APIKEY,
          },
        },
      );
      console.log(response.data);
      const { success } = await response.data;
      if (success === true) {
        setEmailAvailability(true);
        setPasswordFieldAvailability(true);
        setSignUpUser(false);
        setloginUserState(true);
      }
    } catch (error) {
      console.log('Error', error);
      setEmailAvailability(false);
      setPasswordFieldAvailability(false);
      setSignUpUser(true);
      setloginUserState(false);
    }
  };

  const dispatch = useDispatch();
  const loginUser = async () => {
    const { email, password } = formData;
    await verifyEmail();
    const encryptedPassword = CryptoJS.AES.encrypt(password, secretEncryptionKey).toString();
    if (email && password) {
      console.log('trying');
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
      const hashedPassword = hashPassword(formData.newPassword, salt);
      console.log(hashedPassword);
      const response = await axios.post(
        'http://192.168.1.6:8000/api/user/registerUser',
        {
          email: formData.email,
          name: formData.name,
          contactNumber: formData.contactNumber,
          password: hashedPassword,
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
        setFormData({
          email: '',
          name: '',
          contactNumber: '',
          password: '',
          newPassword: '',
          newRepeatedPassword: '',
        });
        setloginUserState(true);
        setEmailAvailability(true);
      } else {
        setErrors({
          email: 'Email already taken',
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const resetPasswordStateUpdate = () => {
    setloginUserState(false);
    setPasswordFieldAvailability(false);
    setFormActionMessage('Reset Your Password');
    setResetPasswordMessage('To reset your password, we need to send you an email.');
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
          email: formData.email,
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await getValidationSchema().validate(formData, { abortEarly: false });

      setErrors({});

      if (resetPasswordState) {
        await resetPassword();
      } else if (signUpUser) {
        console.log('error free');
        await registerUser();
      } else {
        await loginUser();
      }
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const validationErrors: { [key: string]: string } = {};
        err.inner.forEach((error) => {
          if (error.path) {
            validationErrors[error.path] = error.message;
          }
        });
        setErrors(validationErrors);
        console.log('Validation Errors: ', validationErrors);
      }
    }
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prevState) => ({ ...prevState, [name]: value }));

    try {
      await getValidationSchema().validateAt(name, {
        ...formData,
        [name]: value,
      });
      setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
    } catch (error) {
      const yupError = error as Yup.ValidationError;

      if (yupError instanceof Yup.ValidationError) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: yupError.message,
        }));
      } else {
        console.error('Unexpected error during validation:', error);
      }
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
          <Typography sx={{ fontSize: '22px', fontWeight: 'bold', paddingBottom: '20px' }}>
            {formActionMessage}
          </Typography>
          <Typography sx={{ fontSize: '16px', paddingBottom: '20px' }}>{resetPasswordMessage}</Typography>

          {resetTokenInputAvailability && <ResetTokenInput />}

          {!signInWithEmailSelected ? (
            <Box>
              <Divider textAlign="center">
                <Typography variant="body2">or</Typography>
              </Divider>
              <LoginPrimaryButton onClick={handleSignInWithEmail} name={'Continue with email'} />
            </Box>
          ) : (
            <Box>
              {emailFieldAvailability && (
                <EmailField email={formData.email} onChange={handleChange} name="email" helperText={errors.email} />
              )}

              {passwordFieldAvailability && (
                <PasswordField
                  label="Password"
                  password={formData.password}
                  onChange={handleChange}
                  name="password"
                  helperText={errors.password || passwordHelperText}
                />
              )}

              {signUpUser && (
                <>
                  <CommonTextField
                    label="Full Name"
                    placeholder="Full Name"
                    onChange={handleChange}
                    name="name"
                    userName={formData.name}
                    type="text"
                    inputProps={{ autoComplete: 'name' }}
                    helperText={errors.name}
                  />

                  <CommonTextField
                    label="Contact No"
                    placeholder="Contact No"
                    contactNumber={formData.contactNumber}
                    onChange={handleChange}
                    name="contactNumber"
                    type="number"
                    inputProps={{ maxLength: 12, autoComplete: 'tel' }}
                    helperText={errors.contactNumber}
                  />

                  <PasswordField
                    label="New Password"
                    newPassword={formData.newPassword}
                    onChange={handleChange}
                    name="newPassword"
                    helperText={errors.newPassword}
                  />

                  {formData.newPassword !== '' && <PasswordStrengthBar password={formData.newPassword} minLength={8} />}

                  <PasswordField
                    label="Repeat Password"
                    repeatedPassword={formData.newRepeatedPassword}
                    onChange={handleChange}
                    name="newRepeatedPassword"
                    helperText={errors.newRepeatedPassword || repeatedPasswordHelperText}
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

export default LoginActions;
