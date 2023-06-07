import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Grid } from '@mui/material';
import Lottie from 'lottie-react';
import Diglett from '../assets/diglettloading.json';
import CardComponent from './CardComponent';
import axios from 'axios';

const MyCollections = () => {
  const [loading, setLoading] = useState(true);
  const [savedCards, setSavedCards] = useState([]);

  useEffect(() => {
    loadSavedCards();
  }, []);

  const loadSavedCards = async () => {
    try {
      const response = await axios.get('/api/cards'); // Replace '/api/cards' with your backend API route that retrieves saved cards
      setSavedCards(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleCardDelete = async (cardId) => {
    try {
      await axios.delete(`/api/cards/${cardId}`); // Replace '/api/cards' with your backend API route for deleting a card
      setSavedCards(savedCards.filter((card) => card._id !== cardId));
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <Lottie animationData={Diglett} />;
  }

  return (
    <div className="App">
      <h1>My Collection</h1>
      <Grid container spacing={2} style={{ marginTop: '30px' }}>
        {savedCards.map((card) => (
          <CardComponent
            card={card}
            handleDelete={handleCardDelete}
            showDelete={true}
            key={card._id} // Assuming your card object has an '_id' field as its unique identifier
          />
        ))}
      </Grid>
      <div style={{ marginTop: '20px' }}>
        <Button component={Link} to="/home">
          Home
        </Button>
      </div>
    </div>
  );
};

export default MyCollections;
