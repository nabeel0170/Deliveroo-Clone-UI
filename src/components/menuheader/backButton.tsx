import React from 'react';
import { Button } from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

const BackButton: React.FC = () => {
  return (
    <Button
      sx={{
        paddingLeft: '0',
        color: '#00ccbc',
        gap: 2,
        fontSize: '0.75rem',
        textTransform: 'none',
        marginLeft: '0',
        '&:hover': {
          backgroundColor: 'inherit',
        },
      }}
    >
      <KeyboardBackspaceIcon sx={{ fontSize: '1.2rem' }} />
      Back
    </Button>
  );
};

export default BackButton;
