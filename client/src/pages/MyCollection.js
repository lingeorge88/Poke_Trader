import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import { Button, Grid } from '@mui/material';
import Lottie from 'lottie-react';
import Diglett from '../assets/diglettloading.json';
import CardComponent from './CardComponent';
import { SAVE_CARD } from '../utils/mutations';
import { useMutation } from '@apollo/client';
import { saveCardIds, getSavedCardIds } from '../utils/localStorage';
import CardTrade from './CardTrade'; // Import the CardTrade component


const MyCollections = () => {
  const [loading, setLoading] = useState(true);
  const [savedCards, setSavedCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    loadSavedCards();
  }, []);

  const loadSavedCards = async () => {
    try {
      const response = await axios.get('/api/cards');
      setSavedCards(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleCardDelete = async (cardId) => {
    try {
      await axios.delete(`/api/cards/${cardId}`);
      setSavedCards(savedCards.filter((card) => card._id !== cardId));
    } catch (error) {
      console.error(error);
    }
  };

  const handleCardSelect = (card) => {
    setSelectedCard(card);
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
            key={card._id}
            onSelect={() => handleCardSelect(card)} // Add this line to handle card selection
          />
        ))}
      </Grid>
      <div style={{ marginTop: '20px' }}>
        <Button component={Link} to="/home">
          Home
        </Button>
      </div>
      {selectedCard && <Trading selectedCard={selectedCard} />} {/* Pass the selected card to the Trading component */}
    </div>
  );
};
