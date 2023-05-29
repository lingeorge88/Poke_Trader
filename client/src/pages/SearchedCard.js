import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import { Button, Grid, Card, CardContent, Typography } from '@mui/material';

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
      {loading && <p>Loading...</p>}
      {!loading && (
        <Grid container spacing={2}>
          {cards.map(card => (
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={card.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{card.name}</Typography>
                  <img src={card.images.small} alt={card.name} />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      {!loading && (
        <div>
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
      )}
    </div>
  )
}

export default SearchedCard;