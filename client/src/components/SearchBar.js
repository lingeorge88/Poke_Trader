import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

const SearchBar = ({ onSearch }) => {
  const [search, setSearch] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(search);
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextField 
        label="Search Pokemon" 
        value={search} 
        onChange={(e) => setSearch(e.target.value)} 
        variant="outlined"
        style={{ marginRight: '1rem' }}
      />
      <Button variant="contained" color="primary" type="submit">
        I Choose You!
      </Button>
    </form>
  );
}

export default SearchBar;