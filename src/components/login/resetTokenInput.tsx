import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

interface ResetTokenInputProps {
  token?: string;
}

const ResetTokenInput: React.FC<ResetTokenInputProps> = ({ token }) => {
  const tokenFields = new Array(6).fill('');

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        gap: 1,
        marginBottom: 5,
      }}
    >
      {tokenFields.map((_, index) => (
        <TextField
          key={index}
          value={token ? token[index] || '' : ''}
          inputProps={{
            maxLength: 1,
            style: { textAlign: 'center' },
          }}
          variant="outlined"
          size="small"
          sx={{ width: '40px', height: '40px' }}
        />
      ))}
    </Box>
  );
};

export default ResetTokenInput;
