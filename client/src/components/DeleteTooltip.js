import React from 'react';
import Tooltip from '@mui/material/Tooltip';
import YardIcon from '@mui/icons-material/Yard';
import {IconButton} from '@mui/material';

function DeleteTooltip({title, onClick}) {
  return (
    <Tooltip title={title} placement="bottom" arrow sx={{ '& .MuiTooltip-tooltip': { fontSize: '2.5em' } }}>
      <IconButton onClick={onClick}>
        <YardIcon />
      </IconButton>
    </Tooltip>
  );
}
export default DeleteTooltip;