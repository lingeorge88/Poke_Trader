import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import { Button, Grid } from '@mui/material';
import Lottie from 'lottie-react';
import Diglett from '../assets/diglettloading.json';
import CardComponent from './CardComponent';

const SearchedCard = () => {
  const [cards, setCards] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const searchPokemon = (search) => {
    setSearchTerm(search);
    setPage(1); // Reset to page 1 for new searches
  }

  useEffect(() => {
    if (searchTerm) {
      setLoading(true);
      fetch(`https://api.pokemontcg.io/v2/cards?page=${page}&pageSize=25&q=name:${searchTerm}`)
        .then(response => response.json())
        .then(data => {
          setCards(data.data);
          setLoading(false);
        })
        .catch(error => {
          console.error(error);
          setLoading(false);
        });
    }
  }, [searchTerm, page]); 

  return (
    <div className="App">
      <h1>Pokemon App</h1>
      <SearchBar onSearch={searchPokemon} />
      {loading ? (
        <Lottie animationData={Diglett} />
      ) : (
        <>
          <Grid container spacing={2} style={{ marginTop: '30px' }}>
            {cards.map((card) => <CardComponent card={card} />)}
          </Grid>
          <div style={{ marginTop: '20px' }}>
            <Button 
              disabled={page === 1} 
              onClick={() => setPage(prevPage => prevPage - 1)}>
              Previous Page
            </Button>
            <Button 
              onClick={() => setPage(prevPage => prevPage + 1)}>
              Next Page
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export default SearchedCard;