import React, {useState} from 'react';
import { Button, Grid, Card, CardContent, Typography, IconButton, Box } from '@mui/material';
import ZoomPopover from '../components/CardPopOver';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';
import SwapHorizontalCircleIcon from '@mui/icons-material/SwapHorizontalCircle';


const SingleUserPage = () => {
    const { userId } = useParams();
    const { loading, data } = useQuery(QUERY_USER, {
      variables: { userId: userId },
    });
    const [anchorEls, setAnchorEls] = useState(null);
    const [selectedCards, setSelectedCards] = useState([]);

    const handleOpen = (event, cardId) => {
      setAnchorEls(prev => ({ ...prev, [cardId]: event.currentTarget }));
    };
  
    const handleClose = (cardId) => {
      setAnchorEls(prev => ({ ...prev, [cardId]: null }));
    };

    const handleSelect = (cardId) => {
        setSelectedCards(prev => [...prev, cardId]);
        console.log(selectedCards);
      };

    if (loading) {
      return <div>Loading...</div>;
    }
  
    const user = data?.user; // Use optional chaining to safely access the user object
  
    if (!user) {
      return <div>User not found.</div>;
    }
    const { username, savedCards } = user;

    return (
        <div>
          <Box display="flex" justifyContent="center" alignItems="center" mt={5} mb={5}>
            <Typography variant="h4">{username}'s Card Collection</Typography>
          </Box>
          <Grid container spacing={2} justifyContent="center">
            {savedCards.map((card) => (
              <Grid item key={card.cardId} xs={12} sm={6} md={4} lg={3} xl={2}>
                <Card>
                  <CardContent>
                    <Typography variant="h5" style={{ marginBottom: '8px', textAlign: 'center' }}>
                      {card.name}
                    </Typography>
                    <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
                      <img src={card.setImage} alt={card.seriesName} style={{ width: '65px', height: 'auto' }} />
                    </Box>
                    <Box display="flex" justifyContent="center" alignItems="center" mb={2} height="100%">
                  <img src={card.image} alt={card.name}/>
                </Box>
                    <Box display="flex" justifyContent="center" marginTop="8px">
                    <IconButton color="primary" onClick={() => handleSelect(card.cardId)}>
                    <SwapHorizontalCircleIcon />
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
        </div>
      );
    };
    
    export default SingleUserPage;