import React, { useState } from 'react';
import { Grid, Card, CardContent, Typography, IconButton, Box } from '@mui/material';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import ZoomPopover from '../components/CardPopOver';
import HomeIcon from '@mui/icons-material/Home';
import MyPopper from '../components/HomeIconPopper';

const CardComponent = ({ card, handleDelete, showDelete, handleSave, savedCardIds }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [popperAnchorEl, setPopperAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenPopper = (event) => {
    setPopperAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const handleClosePopper = () => {
    setPopperAnchorEl(null);
    setOpen(false);
  };

  return (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={card.id}>
      <Card>
        <CardContent>
          <Typography variant="h5" style={{ marginBottom: '8px', textAlign: 'center' }}>{card.name}</Typography>
          <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
          <img src={card.set.images.logo} alt={card.name} style={{ width: '65px', height: 'auto' }} />
          </Box>
          <Box display="flex" justifyContent="center" alignItems="center" mb={2} height="100%">
          <img src={card.images.small} alt={card.name} />
          </Box>
          <Box display="flex" justifyContent="center" marginTop="8px">
        
          {savedCardIds && savedCardIds.includes(card.id) ?
              <IconButton onClick={handleOpenPopper}>
                <HomeIcon fontSize="large" />
              </IconButton> 
              :
              <IconButton onClick={() => handleSave(card.id)}>
                <CatchingPokemonIcon fontSize="large" />
              </IconButton> 
            }
            <ZoomPopover 
              anchorEl={anchorEl} 
              handleOpen={handleOpen} 
              handleClose={handleClose} 
              cardSetName={card.set.name}
              cardSetSeries={card.set.series}
              releaseDate={card.set.releaseDate}
              logoImage={card.set.images.logo}
              cardRarity={card.rarity}
            />
            <MyPopper open={open} anchorEl={popperAnchorEl} handleClosePopper={handleClosePopper} />
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default CardComponent;