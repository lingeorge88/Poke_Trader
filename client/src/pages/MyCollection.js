import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Grid, Card, CardContent, Typography, IconButton, Box } from '@mui/material';
import Lottie from 'lottie-react';
import Diglett from '../assets/diglettloading.json';
import ZoomPopover from '../components/CardPopOver';
// import CardComponent from './CardComponent';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_CURRENT_USER } from '../utils/queries';
import { REMOVE_CARD } from '../utils/mutations';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const MyCollections = () => {
  const { loading, data } = useQuery(QUERY_CURRENT_USER);
  const savedCards = data?.currentUser?.savedCards  || [];
  const [removeCard] = useMutation(REMOVE_CARD);

  const [anchorEls, setAnchorEls] = useState(null);

  const handleOpen = (event, cardId) => {
    setAnchorEls(prev => ({ ...prev, [cardId]: event.currentTarget }));
  };

  const handleClose = (cardId) => {
    setAnchorEls(prev => ({ ...prev, [cardId]: null }));
  };
  async function handleCardDelete(cardId){
    try {
        await removeCard({
            variables: {cardId: cardId}
        })
    } catch (err) {
        console.error(err);
    }
  }

  if (loading) {
    return <Lottie animationData={Diglett} />;
  }

  return (
    <div className="App">
      <h1>My Collection</h1>
      
      <Grid container spacing={2}>
        {savedCards.map((card) => (
          <Grid item key={card.cardId} xs={12} sm={6} md={4} lg={3} xl={2}>
            <Card>
        <CardContent>
          <Typography variant="h5" style={{ marginBottom: '8px' }}>{card.name}</Typography>
          <img src={card.setImage} alt={card.seriesName} style={{ width: '65px', height: 'auto' }} />
          <img src={card.image} alt={card.name} />
          <Box display="flex" justifyContent="center" marginTop="8px">
              <IconButton aria-label="delete" onClick={() => handleCardDelete(card.cardId)}>
                <DeleteOutlineIcon />
              </IconButton>
            <ZoomPopover 
              anchorEl={anchorEls?.[card.cardId]} 
              handleOpen={(event) => handleOpen(event, card.cardId)} 
              handleClose={() => handleClose(card.cardId)} 
              cardSetName={card.setName}
              cardSetSeries={card.seriesName}
              releaseDate={card.releaseDate}
              logoImage={card.setImage}
              cardRarity={card.rarity}
            />
          </Box>
        </CardContent>
      </Card>
          </Grid>
        ))}
      </Grid>

      <div style={{ marginTop: '20px' }}>
        <Button 
          component={Link} to="/home">
          Home
        </Button>
      </div>
    </div>
  );
}

export default MyCollections;