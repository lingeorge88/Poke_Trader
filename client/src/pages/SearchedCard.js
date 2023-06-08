import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import { Button, Grid } from '@mui/material';
import Lottie from 'lottie-react';
import Diglett from '../assets/diglettloading.json';
import CardComponent from './CardComponent';
import { SAVE_CARD } from '../utils/mutations';
import { useMutation} from '@apollo/client';
import { saveCardIds, getSavedCardIds } from '../utils/localStorage';


const SearchedCard = () => {
  const [cards, setCards] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [saveCard, { error }] = useMutation(SAVE_CARD);
  const [savedCardIds, setSavedCardIds] = useState(getSavedCardIds());
  const [filteredCards, setFilteredCards] = useState([]);
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
          const newCards = data.data.filter(card => !savedCardIds.includes(card.id));
          setCards(newCards);
          setLoading(false);
        })
        .catch(error => {
          console.error(error);
          setLoading(false);
        });
    }
  }, [searchTerm, page]); 

  useEffect(() => {
    // this will be called whenever savedCardIds or cards changes
    const newCards = cards.filter(card => !savedCardIds.includes(card.id));
    setFilteredCards(newCards);
  }, [cards, savedCardIds]);

  // console.log(cards);
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

  return (
    <div className="App">
      <h1>Poké Trader</h1>
      <SearchBar onSearch={searchPokemon} />
      {loading ? (
        <Lottie animationData={Diglett} />
      ) : (
        <>
          <Grid container spacing={2} style={{ marginTop: '30px' }}>
            {filteredCards.map((card) => <CardComponent card={card} handleSave={handleSaveCard} savedCardIds={savedCardIds} key={card.id}/>)}
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
            <Button 
              component={Link} to="/home">
              Home
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export default SearchedCard;