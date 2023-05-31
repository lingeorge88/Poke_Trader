import React from 'react';
import { Popover, Typography, IconButton, Card, CardContent } from '@mui/material';
import ZoomInIcon from '@mui/icons-material/ZoomIn';

const ZoomPopover = ({ anchorEl, handleClose, handleOpen, cardSetName, cardSetSeries, releaseDate, logoImage, cardRarity }) => {
  const open = Boolean(anchorEl);

  return (
    <>
      <IconButton onClick={handleOpen}>
        <ZoomInIcon fontSize="large" />
      </IconButton>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Card>
          <CardContent>
          <img src={logoImage} alt="Set Logo" style={{ width: '100px', height: 'auto' }} />
            <Typography variant="h6">{cardSetName}</Typography>
            <Typography variant="body1">Series: {cardSetSeries}</Typography>
            <Typography variant="body1">Release Date: {releaseDate}</Typography>
            <Typography variant="body1">Rarity: {cardRarity}</Typography>
          </CardContent>
        </Card>
      </Popover>
    </>
  );
};

export default ZoomPopover;