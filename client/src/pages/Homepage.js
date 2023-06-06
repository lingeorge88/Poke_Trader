import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import Pokemon from '../data/pokemon.json';
import CardComponent from './CardComponent';
import '../styles/homepage.css';

function HomePage() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    // Randomly pick five unique Pokemon
    let pokemonNames = [];
    while (pokemonNames.length < 5) {
      let randomIndex = Math.floor(Math.random() * Pokemon.length);
      if (!pokemonNames.includes(Pokemon[randomIndex])) {
        pokemonNames.push(Pokemon[randomIndex]);
      }
    }

    // Fetch data for each Pokemon
    Promise.all(pokemonNames.map(name =>
      fetch(`https://api.pokemontcg.io/v2/cards?q=name:${name}`)
        .then(response => response.json())
    ))
    .then(results => {
      // Flatten the results array and set the state
      setCards(results.flat().map(result => result.data[0])); // Take first card from each result
    })
    .catch(error => console.error(error));
  }, []);

  return (
    <div className="container">
      <h1>Poké Trader Home</h1>
      <div className="button-group">
        <Button variant="contained" color="primary" component={Link} to="/search">
          Search Cards
        </Button>

        <Button variant="contained" color="primary" component={Link} to="/saved">
          My collection
        </Button>

        <Button variant="contained" color="primary" component={Link} to="/trade">
          Trade
        </Button>
      </div>

      <div><h2>✨✨✨Featured Cards ✨✨✨</h2></div>
      
      <div className="card-grid">
        {cards.map(card => <CardComponent card={card} key={card.id} />)}
      </div>
    </div>
  );
}

export default HomePage;