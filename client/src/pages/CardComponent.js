import React, { useState } from 'react';
import { Grid, Card, CardContent, Typography, IconButton, Box } from '@mui/material';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import ZoomPopover from '../components/CardPopOver';

const CardComponent = ({ card }) => {
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
            <IconButton onClick={() => console.log('Icon clicked')}>
              <CatchingPokemonIcon fontSize="large" />
            </IconButton>
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