import { Button, SxProps } from '@mui/material';
import { ButtonProps as MuiButtonProps } from '@mui/material/Button';

interface ButtonProps {
  name?: string;
  onClick?: () => void;
  type?: 'submit' | 'button';
  disabled?: boolean;
  sx?: SxProps;
  variant?: MuiButtonProps['variant'];
}

const LoginPrimaryButton: React.FC<ButtonProps> = ({
  onClick,
  name,
  disabled,
  type,
  sx,
  variant,
}) => {
  return (
    <Button
      onClick={onClick}
      sx={{
        background: '#00ccbc',
        color: 'white',
        fontWeight: 'bold',
        width: '100%',

        marginTop: '10px',
        padding: '12px 24px',
        '&:hover': {
          backgroundColor: '#00b8a9',
        },
        '&:active, &:focus': {
          backgroundColor: '#00ccbc',
        },
        ...sx,
      }}
      variant={variant}
      type={type}
      disabled={disabled}
    >
      {name}
    </Button>
  );
};
export default LoginPrimaryButton;
