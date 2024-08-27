import React from "react";
import LoginPrimaryButton from "./loginPrimaryButton";

interface LoginButtonsProps {
  signUpUser: boolean;
  loginUserState: boolean;
  continueButtonState: boolean;
  handleClickShowPassword: () => void;
}

const LoginButtons: React.FC<LoginButtonsProps> = ({
  signUpUser,
  loginUserState,
  continueButtonState,
  handleClickShowPassword,
}) => (
  <>
    {signUpUser && (
      <>
        <LoginPrimaryButton name={"Sign Up"} type="submit" disabled={continueButtonState} />
      </>
    )}
    {!loginUserState && !signUpUser && (
      <LoginPrimaryButton type="submit" name={"Continue"} disabled={continueButtonState} />
    )}
    {loginUserState && (
      <>
        <LoginPrimaryButton type="submit" name={"Login"} disabled={continueButtonState} />
        <LoginPrimaryButton
          name={"Forgot password?"}
          sx={{
            background: "white",
            color: "#00ccbc",
            fontWeight: "none",
            border: "#dadce0 0.5px solid",
            "&:hover": {
              backgroundColor: "#00b8a9",
            },
            "&:active, &:focus": {
              backgroundColor: "white",
            },
          }}
          disabled={continueButtonState}
        />
      </>
    )}
  </>
);

export default LoginButtons;
