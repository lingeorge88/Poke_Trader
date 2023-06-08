import React from 'react';
import { Popover, Typography, Paper } from '@mui/material';

const MyPopover = ({ open, anchorEl, handleClosePopper }) => {
  console.log('MyPopover open:', open);
  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={handleClosePopper}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
    >
      <Paper>
        <Typography style={{ padding: '10px', fontSize: '18px' }}>🏝️ This Pokemon is already in your pokebox 🏠</Typography>
      </Paper>
    </Popover>
  );
};

export default MyPopover;