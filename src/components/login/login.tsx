import { Box, useMediaQuery } from "@mui/system";
import theme from "../../theme";
import { Divider, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import LoginPrimaryButton from "./loginPrimaryButton";

const LoginForm: React.FC = () => {
  const screenSizeUpSm = useMediaQuery(theme.breakpoints.up("sm"));
  const [signInWithEmailSelected, setSignInWithEmailSelected] = useState<boolean>(false);
  const [continueButtonState, setContinueButtonState] = useState<boolean>(true);
  const [email, setEmail] = useState<string>("");
  const handleSignInWithEmail = () => {
    setSignInWithEmailSelected(true);
  };

  const verifyEmailPattern = () => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (email.length > 0 && emailPattern.test(email)) {
      setContinueButtonState((prev) => false);
    } else {
      setContinueButtonState((prev) => true);
    }
  };

  const verifyEmail = () => {
    setContinueButtonState((prev) => true);
    console.log("validating");
  };
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  return (
    <Box
      sx={{
        paddingTop: screenSizeUpSm ? "73px" : "56px",
        display: "flex",
        flexDirection: "column",
        height: "600px",
        justifyContent: "center",
        maxWidth: "450px",
        margin: "0 auto",
      }}
    >
      <Box sx={{ padding: "24px" }}>
        <Typography sx={{ fontSize: "22px", fontWeight: "bold", paddingBottom: "20px" }}>Sign up or log in</Typography>
        {!signInWithEmailSelected ? (
          <Box>
            <Divider textAlign="center">
              <Typography variant="body2">or</Typography>
            </Divider>
            <LoginPrimaryButton onClick={handleSignInWithEmail} name={"Continue with email"} />
          </Box>
        ) : (
          <Box>
            <Typography variant="body1">Email Address</Typography>
            <TextField
              id="outlined-textarea"
              placeholder="e.g.name@example.com"
              fullWidth
              onChange={handleEmailChange}
              onBlur={verifyEmailPattern}
            />
            {/* {!continueButtonState ? <Box>hi</Box> : <Box>no</Box>} */}
            <LoginPrimaryButton onClick={verifyEmail} name={"Continue"} disabled={continueButtonState} />
          </Box>
        )}
      </Box>
    </Box>
  );
};
export default LoginForm;
