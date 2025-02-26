import React from 'react';
import { Box, Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

const RewardsBadge = ({ points }) => {
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        alignItems: 'center',
        backgroundColor: '#ff9800',
        color: 'white',
        padding: '8px 16px',
        borderRadius: '16px'
      }}
    >
      <StarIcon sx={{ mr: 1 }} />
      <Typography>{points} Points</Typography>
    </Box>
  );
};

export default RewardsBadge;