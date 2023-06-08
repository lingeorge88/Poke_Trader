import React, {useState} from 'react';
import {Grid, Card, CardContent, Typography, IconButton, Box } from '@mui/material';
import ZoomPopover from '../components/CardPopOver';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_USER, QUERY_CURRENT_USER } from '../utils/queries';
import EmailIcon from '@mui/icons-material/Email';


const SingleUserPage = () => {
    const { userId } = useParams();
    const { loading: userLoading, data: userData } = useQuery(QUERY_USER, {
        variables: { userId: userId },
      });
      const { loading: currentUserLoading, data: currentUserData } = useQuery(QUERY_CURRENT_USER);
    

    const [anchorEls, setAnchorEls] = useState(null);
    // const [selectedCards, setSelectedCards] = useState([]);

    const handleOpen = (event, cardId) => {
      setAnchorEls(prev => ({ ...prev, [cardId]: event.currentTarget }));
    };
  
    const handleClose = (cardId) => {
      setAnchorEls(prev => ({ ...prev, [cardId]: null }));
    };

    

    if (userLoading || currentUserLoading) {
        return <div>Loading...</div>;
      }
  
    const user = userData?.user; // Use optional chaining to safely access the user object
  
    if (!user) {
      return <div>User not found.</div>;
    }
    const { username, savedCards } = user;

    const sendEmail = (email, card) => {
        const currentUser = currentUserData?.currentUser ||[];
        const emailSubject = `Poké Trader - Interest in ${card.name}`;
        const emailBody = `Hello, I came upon your collection on Poké Trader's trading page and am interested in trading for your ${card.name} card from the ${card.setName} set, please checkout my collections at ${currentUser.username} on the Poké Trader's trading page and see if any card catches your interest, 
        
        

        Best,
        ${currentUser.username}
        `;
        window.open(`mailto:${email}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`);
      }
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
                    <IconButton color="primary" onClick={() => sendEmail(user.email, card)}>
                    <EmailIcon fontSize="large"/>
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