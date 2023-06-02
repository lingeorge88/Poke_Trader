import React, { useState } from 'react';
import { TextField, Button, Autocomplete, Box } from '@mui/material';
import Pokemon from '../data/pokemon.json';

const SearchBar = ({ onSearch }) => {
  const [search, setSearch] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if(search) {
      onSearch(search);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        gap={2}
      >
        <Autocomplete
          options={Pokemon}
          style={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Search Pokemon" variant="outlined" />}
          value={search}
          onInputChange={(event, newValue) => {
            setSearch(newValue);
          }}
        />
        <Button variant="contained" color="primary" type="submit">
          I Choose You!
        </Button>
      </Box>
    </form>
  );
}

export default SearchBar;