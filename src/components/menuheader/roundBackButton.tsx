import IconButton from '@mui/material/IconButton';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
const RoundBackButton: React.FC = () => {
  return (
    <IconButton
      sx={{
        padding: '0',
        color: '#00ccbc',
        background: 'white',
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        fontSize: '0.75rem',
        textTransform: 'none',
        marginLeft: '0',
        '&:hover': {
          backgroundColor: 'white',
        },
      }}
    >
      <KeyboardBackspaceIcon sx={{ fontSize: '1.2rem' }} />
    </IconButton>
  );
};
export default RoundBackButton;
