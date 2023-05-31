import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import { Button, Grid, Card, CardContent, Typography, IconButton, Box } from '@mui/material';
import Lottie from 'lottie-react';
import Diglett from '../assets/diglettloading.json';

import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import ZoomInIcon from '@mui/icons-material/ZoomIn';


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
  }, [searchTerm, page]); // Make sure "page" is included in the dependency array

  return (
    <div className="App">
      <h1>Pokemon App</h1>
      <SearchBar onSearch={searchPokemon} />
      {loading ? (
        <Lottie animationData={Diglett} />
      ) : (
        <>
          <Grid container spacing={2} style={{ marginTop: '30px' }}>
            {cards.map((card) => (
              <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={card.id}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" style={{ marginBottom: '8px' }}>{card.name}</Typography>
                    <img src={card.set.images.logo} alt={card.name} style={{ width: '50px', height: 'auto' }} />
                    <img src={card.images.small} alt={card.name} />
                    <Box display="flex" justifyContent="center" marginTop="8px">
                      <IconButton onClick={() => console.log('Icon clicked')}>
                        <CatchingPokemonIcon fontSize="large" />
                      </IconButton>
                      <IconButton onClick={() => console.log('Icon clicked')}>
                        <ZoomInIcon fontSize="large" />
                      </IconButton>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
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