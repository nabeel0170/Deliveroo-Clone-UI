import React from 'react';
import LoginPrimaryButton from './loginPrimaryButton';

interface LoginButtonsProps {
  signUpUser: boolean;
  loginUserState: boolean;
  continueButtonState: boolean;
  signUpDisabled: boolean;
  resetButtonState: boolean;
  resetPasswordState?: () => void;
}

const LoginButtons: React.FC<LoginButtonsProps> = ({
  signUpUser,
  loginUserState,
  continueButtonState,
  signUpDisabled,
  resetPasswordState,
  resetButtonState,
}) => (
  <>
    {signUpUser && (
      <>
        <LoginPrimaryButton
          name={'Sign Up'}
          type="submit"
          disabled={signUpDisabled}
        />
      </>
    )}
    {!loginUserState && !signUpUser && (
      <LoginPrimaryButton
        type="submit"
        name={'Continue'}
        disabled={continueButtonState}
      />
    )}
    {loginUserState && (
      <>
        <LoginPrimaryButton type="submit" name={'Login'} />
        <LoginPrimaryButton
          type="button"
          name={'Forgot password?'}
          sx={{
            background: 'white',
            color: '#00ccbc',
            fontWeight: 'none',
            border: '#dadce0 0.5px solid',
            '&:hover': {
              backgroundColor: '#00b8a9',
            },
            '&:active, &:focus': {
              backgroundColor: 'white',
            },
          }}
          disabled={resetButtonState}
          onClick={resetPasswordState}
        />
      </>
    )}
  </>
);

export default LoginButtons;
