import React from 'react';
import { Button } from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Box } from '@mui/system';

const BackButton: React.FC = () => {
  return (
    <Box>
      <Button
        sx={{
          padding: '0',
          color: '#00ccbc',
          paddingBottom: '16px',
          fontSize: '0.75rem',
          textTransform: 'none',
          marginLeft: '0',
          '&:hover': {
            backgroundColor: 'inherit',
          },
        }}
      >
        <KeyboardBackspaceIcon
          sx={{ fontSize: '24px', paddingRight: '10px' }}
        />
        <span style={{ fontSize: '16px' }}>Back</span>
      </Button>
    </Box>
  );
};

export default BackButton;
