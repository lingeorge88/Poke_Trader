import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import Pokemon from '../data/pokemon.json';
import CardComponent from './CardComponent';
import '../styles/homepage.css';
import authService from '../utils/auth';
import { useMutation } from '@apollo/client';
import { SAVE_CARD } from '../utils/mutations';
import { getSavedCardIds } from '../utils/localStorage';
const SquirtleAnimation = lazy(() => import('../components/Squirtle'));


function HomePage() {
  console.log("HomePage rendered");
  const [cards, setCards] = useState([]);
  const [saveCard] = useMutation(SAVE_CARD);
  const [savedCardIds, setSavedCardIds] = useState(getSavedCardIds());
  const [loading, setLoading] = useState(true);
  

  const handleLogout = () => {
    authService.logout();
  };

  const handleSaveCard = async (cardId) => {

    if (savedCardIds.includes(cardId)) {
      console.log('This card is already saved.');
      return;
    }

    const cardToSave = cards.find((card) => card.id === cardId);

    try {
      await saveCard({
        variables: {
          cardId: cardToSave.id,
          name: cardToSave.name,
          image: cardToSave.images.small,
          setName: cardToSave.set.name,
          seriesName: cardToSave.set.series,
          setImage: cardToSave.set.images.logo,
          rarity: cardToSave.rarity,
          releaseDate: cardToSave.set.releaseDate,
        }
      });

      setSavedCardIds([...savedCardIds, cardToSave.id]);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    
    // Randomly pick five unique Pokemon
    let pokemonNames = [];
    while (pokemonNames.length < 5) {
      let randomIndex = Math.floor(Math.random() * Pokemon.length);
      if (!pokemonNames.includes(Pokemon[randomIndex])) {
        pokemonNames.push(Pokemon[randomIndex]);
      }
    }

    setLoading(true);
    // Fetch data for each Pokemon
    Promise.all(
      pokemonNames.map((name) =>
        fetch(`https://api.pokemontcg.io/v2/cards?q=name:${name}`).then((response) => response.json())
      )
    )
      .then((results) => {
        // Flatten the results array and set the state
        setCards(results.flat().map((result) => result.data[0]));
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setLoading(false); // Set loading state to false after the data is fetched
      });
  }, []);

  return (
    <div className="container">
      <h1>Poké Trader Home</h1>
      <div className="button-group">
        <Button variant="contained" color="primary" component={Link} to="/search">
          Search Cards
        </Button>

        <Button variant="contained" color="primary" component={Link} to="/saved">
          My PokéBox
        </Button>

        <Button variant="contained" color="primary" component={Link} to="/trade">
          Trade
        </Button>

        <Button variant="contained" color="secondary" onClick={handleLogout} > 
          Logout
        </Button>
      </div>

      <div><h2>✨✨✨Featured Cards ✨✨✨</h2></div>
      
      <div className="card-grid">
      {loading ? ( // Render the Lottie animation when loading is true
          <Suspense fallback={<div>Loading...</div>}>
          <SquirtleAnimation />
        </Suspense>
        ) : (
          // Render the cards when loading is false
          cards.map((card) => (
            <CardComponent card={card} handleSave={handleSaveCard} savedCardIds={savedCardIds} key={card.id} />
          ))
        )}
      </div>
    </div>
  );
}

export default HomePage;