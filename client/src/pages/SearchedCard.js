import React, { useState, useEffect} from 'react';
import SearchBar from '../components/SearchBar';


const SearchedCard = () => {
    const [cards, setCards] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const searchPokemon = (search) => {
    setSearchTerm(search);
  }

  useEffect(() => {
    if (searchTerm) {
      fetch(`https://api.pokemontcg.io/v2/cards?q=name:${searchTerm}`)
        .then(response => response.json())
        .then(data => setCards(data.data))
        .catch(error => console.error(error));
    }
  }, [searchTerm]);
  return (
    <div className="App">
      <h1>Pokemon App</h1>
      <SearchBar onSearch={searchPokemon} />
      {cards && cards.map(card => (
        <div key={card.id}>
          <h2>{card.name}</h2>
          <img src={card.images.small} alt={card.name} />
        </div>
      ))}
    </div>
  )
}

export default SearchedCard