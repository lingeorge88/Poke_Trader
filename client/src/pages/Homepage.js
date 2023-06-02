import React from 'react';
import { Button, Box, Container } from '@mui/material';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <Container>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        gap={2}
      >
        <Button variant="contained" color="primary" component={Link} to="/search">
          Search Cards
        </Button>

        <Button variant="contained" color="primary" component={Link} to="/mycollection">
          My collection
        </Button>

        <Button variant="contained" color="primary" component={Link} to="/trade">
          Trade
        </Button>
      </Box>
    </Container>
  );
}

export default HomePage;