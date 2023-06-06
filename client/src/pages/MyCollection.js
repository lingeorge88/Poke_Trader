import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Grid } from '@mui/material';
import Lottie from 'lottie-react';
import Diglett from '../assets/diglettloading.json';
import CardComponent from './CardComponent';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_CURRENT_USER } from '../utils/queries';
import { REMOVE_CARD } from '../utils/mutations';

const MyCollections = () => {
  const { loading, data } = useQuery(QUERY_CURRENT_USER);
  const savedCards = data?.currentUser?.savedCards  || [];
  const [removeCard] = useMutation(REMOVE_CARD);

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
      <Grid container spacing={2} style={{ marginTop: '30px' }}>
        {savedCards.map((card) => <CardComponent card={card} handleDelete={handleCardDelete} showDelete={true}/>)}
        
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
