import { Button } from "@mui/material";

interface ButtonProps {
  name?: string;
  onClick?: () => void;
  disabled?: boolean;
}

const LoginPrimaryButton: React.FC<ButtonProps> = ({ onClick, name, disabled }) => {
  return (
    <Button
      onClick={onClick}
      sx={{
        background: "#00ccbc",
        color: "white",
        fontWeight: "bold",
        width: "100%",
        padding: "12px 24px",
        "&:hover": {
          backgroundColor: "#00b8a9",
        },
      }}
      disabled={disabled}
    >
      {name}
    </Button>
  );
};
export default LoginPrimaryButton;
