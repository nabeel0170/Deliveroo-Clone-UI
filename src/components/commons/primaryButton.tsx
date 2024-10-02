import { Button } from '@mui/material';
import { SvgIconComponent } from '@mui/icons-material';

interface PrimaryCommonButtonProps {
  name?: string;
  Icon?: SvgIconComponent;
  onClick?: () => void;
}

const PrimaryCommonButton: React.FC<PrimaryCommonButtonProps> = ({
  name,
  Icon,
  onClick,
}) => {
  return (
    <Button
      variant="contained"
      sx={{
        backgroundColor: 'white',
        display: 'flex',
        color: '#2E3333',
        border: '1px solid #e8ebeb',
        boxShadow: 'none',
        minHeight: '35px',
        maxHeight: '40px',
        fontSize: '16px',
        textWrap: 'nowrap',
        textTransform: 'none',
        '&:hover': {
          borderColor: '#c5c9d1',
          backgroundColor: 'white',
          color: 'black',
          boxShadow: 'none',
        },
      }}
      onClick={onClick}
    >
      {Icon && (
        <Icon sx={{ fontSize: '18px', color: '#00ccbc', padding: '4px' }} />
      )}
      {name && name}
    </Button>
  );
};
export default PrimaryCommonButton;
