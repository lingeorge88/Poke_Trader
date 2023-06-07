import React, { useState } from 'react';
import { Grid, Card, CardContent, Typography, IconButton, Box } from '@mui/material';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ZoomPopover from '../components/CardPopOver';

const CardComponent = ({ card, handleDelete, showDelete, handleSave }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={card.id}>
      <Card>
        <CardContent>
          <Typography variant="h5" style={{ marginBottom: '8px' }}>{card.name}</Typography>
          <img src={card.set.images.logo} alt={card.name} style={{ width: '65px', height: 'auto' }} />
          <img src={card.images.small} alt={card.name} />
          <Box display="flex" justifyContent="center" marginTop="8px">
          <IconButton onClick={() => handleSave(card.id)}>
            <CatchingPokemonIcon fontSize="large" />
          </IconButton>
            {showDelete && (
              <IconButton aria-label="delete" onClick={() => handleDelete(card.id)}>
                <DeleteOutlineIcon />
              </IconButton>
            )}
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
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default CardComponent;