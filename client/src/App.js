import './App.css';
import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import SearchedCard from './pages/SearchedCard';

import LandingPage from './pages/LandingPage';


function App() {
  const theme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  return (
    <ThemeProvider theme={theme}>

      <CssBaseline />
      <LandingPage />
      {/* <SearchedCard /> */}
    </ThemeProvider>
  );
}

export default App;
